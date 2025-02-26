import CPU_CORE_SET from "./cpu.constant";
import RAM_CONSTANT_SET from "./ram.constant";

export interface HardwareMockReturn {
  cpuCores: number;
  deviceMemory: number;
}

class HardwareMocker {
  public static originalHardwareConcurrency = navigator.hardwareConcurrency;
  // @ts-expect-error available on DOM runtime
  public static originalDeviceMemory = navigator["deviceMemory"];

  public static cpuCoresOptions = CPU_CORE_SET;
  public static deviceMemoryOptions = RAM_CONSTANT_SET;

  public static mock(
    cpuCores: number,
    deviceMemory: number
  ): HardwareMockReturn {
    Object.defineProperty(window.navigator, "hardwareConcurrency", {
      value: cpuCores,
      writable: false,
      // IMPORTANT: to restore need to be "configurable: true"
      configurable: true,
    });
    Object.defineProperty(window.navigator, "deviceMemory", {
      value: deviceMemory,
      writable: false,
      configurable: true,
    });
    return { cpuCores, deviceMemory };
  }

  public static mockRandom() {
    const randomCpuCores = this.getRandomElement(this.cpuCoresOptions);
    const randomDeviceMemory = this.getRandomElement(this.deviceMemoryOptions);
    return this.mock(randomCpuCores, randomDeviceMemory);
  }

  public static restore() {
    this.mock(this.originalHardwareConcurrency, this.originalDeviceMemory);
  }

  public static getRandomElement(arr: Array<number>) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

export default HardwareMocker;
export { HardwareMocker };
