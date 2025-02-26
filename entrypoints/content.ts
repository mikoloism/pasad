import HardwareMocker from "../packages/hardware/mod";
import TimeZoneMocker from "../packages/timezone/mod";
import UserAgentMocker from "../packages/user-agent/mod";

export default defineContentScript({
  matches: ["*://*/*"],
  async main() {
    const hardware = HardwareMocker.mockRandom();
    const timeZone = TimeZoneMocker.mockRandom();
    const userAgent = UserAgentMocker.mockRandom();
    console.log({ hardware, timeZone, userAgent });
  },
});
