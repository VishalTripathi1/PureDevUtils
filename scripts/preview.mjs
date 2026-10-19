// Preview the exported site, including its security headers and extensionless routes.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('out');
const headers = Object.fromEntries((await readFile(resolve(root,'_headers'),'utf8')).split('\n').filter(line => line.startsWith('  ')).map(line => { const split = line.indexOf(':'); return [line.slice(0,split).trim(),line.slice(split+1).trim()]; }));
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.txt':'text/plain','.xml':'application/xml','.svg':'image/svg+xml','.ico':'image/x-icon','.png':'image/png','.woff2':'font/woff2','.woff':'font/woff'};
createServer(async (request,response) => {
  try {
    const path = decodeURIComponent(new URL(request.url,'http://localhost').pathname);
    const target = resolve(root,'.'+path);
    if (target !== root && !target.startsWith(root+sep)) { response.writeHead(403).end(); return; }
    const candidates = path === '/' ? [resolve(root,'index.html')] : [target,target+'.html'];
    let file;
    for (const candidate of candidates) { try { if ((await stat(candidate)).isFile()) { file=candidate; break; } } catch {} }
    if (path === '/__preview-probe.js') { response.writeHead(200,{'Content-Type':'text/javascript'}); response.end(await readFile('scripts/preview-probe.js')); return; }
    const status = file ? 200 : 404;
    file ??= resolve(root,'404.html');
    response.writeHead(status,{...headers,'Content-Type':types[extname(file)] ?? 'application/octet-stream'});
    let content = await readFile(file);
    if (process.env.PDU_QA === '1' && extname(file) === '.html') content = Buffer.from(content.toString().replace('</body>','<script src="/__preview-probe.js"></script></body>'));
    response.end(content);
  } catch { response.writeHead(400).end('Bad request'); }
}).listen(3000,'127.0.0.1',() => console.log('Static preview: http://localhost:3000'));
