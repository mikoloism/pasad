import HardwareMocker from "../packages/hardware/mod";
import TimeZoneMocker from "../packages/timezone/mod";
import UserAgentMocker from "../packages/user-agent/mod";

export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });
  const hardware = HardwareMocker.mockRandom();
  const timeZone = TimeZoneMocker.mockRandom();
  const userAgent = UserAgentMocker.mockRandom();
  console.log({ hardware, timeZone, userAgent });
});
