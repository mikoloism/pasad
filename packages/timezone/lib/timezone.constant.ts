type Name = string;
type Offset = number;
type TimeZoneRecord = { name: Name; offset: Offset };
type TimeZoneSet = Set<TimeZoneRecord>;

const TIME_ZONE_SET: TimeZoneSet = new Set();

TIME_ZONE_SET.add({ name: "UTC", offset: 0 });
TIME_ZONE_SET.add({ name: "Europe/Berlin", offset: -60 });
TIME_ZONE_SET.add({ name: "America/New_York", offset: -300 });

export default TIME_ZONE_SET;
export { TIME_ZONE_SET };
