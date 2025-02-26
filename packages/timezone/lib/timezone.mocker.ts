import TIME_ZONE_SET from "./timezone.constant";

export interface TimeZoneMockReturn {
  offset: number;
  name: string;
}

class TimeZoneMocker {
  public static originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;
  public static originalResolvedOptions =
    Intl.DateTimeFormat.prototype.resolvedOptions;
  public static originalGetHours = Date.prototype.getHours;
  public static originalGetMinutes = Date.prototype.getMinutes;
  public static originalGetSeconds = Date.prototype.getSeconds;
  public static originalGetFullYear = Date.prototype.getFullYear;
  public static originalToTimeString = Date.prototype.toTimeString;

  public static timezones = Array.from(TIME_ZONE_SET);

  public static mock(offset: number, name: string): TimeZoneMockReturn {
    Date.prototype.getTimezoneOffset = function () {
      return offset;
    };
    Intl.DateTimeFormat.prototype.resolvedOptions = function () {
      const originalOptions = TimeZoneMocker.originalResolvedOptions.call(this);
      return { ...originalOptions, timeZone: name };
    };
    Date.prototype.getFullYear = function () {
      const mockedToLocaleString = this.toLocaleString("en-US", {
        timeZone: name,
      });
      const parts = mockedToLocaleString.match(/(\d{4})/);
      return parseInt(String(parts?.[1] ?? 1979), 10);
    };
    Date.prototype.getHours = function () {
      const utcHours = Date.prototype.getUTCHours.call(this);
      return (utcHours + offset / 60 + 24) % 24;
    };
    Date.prototype.getMinutes = function () {
      const utcMinutes = TimeZoneMocker.originalGetMinutes.call(this);
      return utcMinutes;
    };
    Date.prototype.getSeconds = function () {
      const utcSeconds = TimeZoneMocker.originalGetSeconds.call(this);
      return utcSeconds;
    };
    Date.prototype.toTimeString = function (): string {
      return TimeZoneMocker.originalToTimeString
        .call(this)
        .replace(/\(.*?\)/, `(${name})`)
        .replace(/\+\d+/, offset === 0 ? "+0000" : String(offset));
    };
    return { name, offset };
  }

  public static mockRandom() {
    const randomIndex = Math.floor(Math.random() * this.timezones.length);
    const { name, offset } = this.timezones[randomIndex];
    return this.mock(offset, name);
  }

  public static restore() {
    Date.prototype.getTimezoneOffset = this.originalGetTimezoneOffset;
    Intl.DateTimeFormat.prototype.resolvedOptions =
      this.originalResolvedOptions;
    Date.prototype.getHours = this.originalGetHours;
    Date.prototype.getMinutes = this.originalGetMinutes;
    Date.prototype.getSeconds = this.originalGetSeconds;
    Date.prototype.getFullYear = this.originalGetFullYear;
    Date.prototype.toTimeString = this.originalToTimeString;
  }
}

export default TimeZoneMocker;
export { TimeZoneMocker };
