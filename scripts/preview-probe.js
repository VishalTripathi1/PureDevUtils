/* Local-preview-only QA panel. Never included in out/ or deployed assets.
 * Records timing and request counts, not request bodies, URLs, or tool data.
 */
(() => {
  const measurements = { lcp: 0, cls: 0, longTasks: 0, fetchCalls: 0, xhrCalls: 0, beaconCalls: 0, externalResources: 0 };
  const panel = document.createElement('details');
  panel.id = 'preview-qa';
  panel.style.cssText = 'margin:24px;padding:16px;border:1px solid gray;font:14px monospace';
  panel.innerHTML = '<summary>Local preview QA (not deployed)</summary><pre aria-label="Preview measurements"></pre>';
  document.body.appendChild(panel);
  const display = panel.querySelector('pre');
  function render() {
    const nav = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    display.textContent = JSON.stringify({ ...measurements, fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? null, domContentLoaded: nav?.domContentLoadedEventEnd ?? null, resourceCount: resources.length, transferredBytes: resources.reduce((sum,r) => sum + r.transferSize,0), width: innerWidth, pageWidth: document.documentElement.scrollWidth },null,2);
  }
  const observe = (type, handler) => { try { new PerformanceObserver(list => { handler(list.getEntries()); render(); }).observe({type,buffered:true}); } catch {} };
  observe('largest-contentful-paint',entries => { measurements.lcp = entries.at(-1).startTime; });
  observe('layout-shift',entries => { measurements.cls += entries.filter(e => !e.hadRecentInput).reduce((sum,e) => sum+e.value,0); });
  observe('longtask',entries => { measurements.longTasks += entries.length; });
  observe('resource',entries => { measurements.externalResources += entries.filter(e => new URL(e.name).origin !== location.origin).length; });
  const originalFetch = window.fetch;
  window.fetch = function(...args) { measurements.fetchCalls++; render(); return originalFetch.apply(this,args); };
  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function(...args) { measurements.xhrCalls++; render(); return originalSend.apply(this,args); };
  if (navigator.sendBeacon) {
    const originalBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = (...args) => { measurements.beaconCalls++; render(); return originalBeacon(...args); };
  }
  document.addEventListener('click',() => setTimeout(render,100));
  window.addEventListener('load',render);
  render();
})();
