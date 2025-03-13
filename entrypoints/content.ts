import HardwareMocker from "../packages/hardware/mod";
import TimeZoneMocker from "../packages/timezone/mod";
import UserAgentMocker from "../packages/user-agent/mod";

export default defineContentScript({
  matches: ["*://*/*", "<all_urls>"],
  runAt: "document_start",
  main() {
    const customScript = document.createElement("script");
    customScript.textContent = 'console.log("Hello");';
    document.head.prepend(customScript);
    console.log("[PASAD] :: Start on(document_start)");
    const hardware = HardwareMocker.mockRandom();
    const timeZone = TimeZoneMocker.mockRandom();
    const userAgent = UserAgentMocker.mockRandom();
    Object.defineProperty(window, "pasad", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: true,
    });
    console.log({ hardware, timeZone, userAgent });
    console.log("[PASAD] :: Finish on(document_start)");
  },
});
