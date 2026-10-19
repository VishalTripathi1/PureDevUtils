import { afterEach, expect, it, vi } from "vitest";
import { copyText, downloadText } from "./browser-files";
afterEach(() => vi.unstubAllGlobals());
it("writes only to the clipboard and explains denied or missing access", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal("navigator",{clipboard:{writeText}});
  await copyText("local-only-marker");
  expect(writeText).toHaveBeenCalledWith("local-only-marker");
  writeText.mockRejectedValue(new Error("private raw error"));
  await expect(copyText("value")).rejects.toThrow("denied");
  vi.stubGlobal("navigator",{});
  await expect(copyText("value")).rejects.toThrow("manually");
});
it("downloads a local blob and cleans up its URL", () => {
  vi.useFakeTimers();
  const click=vi.fn(),remove=vi.fn(),appendChild=vi.fn();
  const link={href:"",download:"",click,remove};
  const createObjectURL=vi.fn().mockReturnValue("blob:local"),revokeObjectURL=vi.fn();
  vi.stubGlobal("URL",{createObjectURL,revokeObjectURL});
  vi.stubGlobal("document",{createElement:() => link,body:{appendChild}});
  try {
    downloadText("uuid\r\nvalue\r\n","uuids.csv","text/csv");
    expect(createObjectURL.mock.calls[0][0]).toBeInstanceOf(Blob);
    expect(link.download).toBe("uuids.csv"); expect(link.href).toBe("blob:local");
    expect(click).toHaveBeenCalledOnce(); expect(remove).toHaveBeenCalledOnce();
    vi.runAllTimers(); expect(revokeObjectURL).toHaveBeenCalledWith("blob:local");
  } finally { vi.useRealTimers(); }
});
