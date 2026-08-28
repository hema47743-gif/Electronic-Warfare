export const spectrumData = [
  { frequency: 100, power: 18 },
  { frequency: 150, power: 24 },
  { frequency: 200, power: 21 },
  { frequency: 250, power: 37 },
  { frequency: 300, power: 28 },
  { frequency: 350, power: 48 },
  { frequency: 400, power: 32 },
  { frequency: 450, power: 62 },
  { frequency: 500, power: 39 },
  { frequency: 550, power: 72 },
  { frequency: 600, power: 43 },
  { frequency: 650, power: 57 },
  { frequency: 700, power: 35 },
  { frequency: 750, power: 69 },
  { frequency: 800, power: 45 },
  { frequency: 850, power: 31 },
  { frequency: 900, power: 51 },
  { frequency: 950, power: 39 },
  { frequency: 1000, power: 65 },
];

export const activityData = [
  { time: "08:00", signals: 42, alerts: 4 },
  { time: "09:00", signals: 51, alerts: 6 },
  { time: "10:00", signals: 47, alerts: 5 },
  { time: "11:00", signals: 68, alerts: 10 },
  { time: "12:00", signals: 61, alerts: 8 },
  { time: "13:00", signals: 77, alerts: 12 },
  { time: "14:00", signals: 71, alerts: 9 },
  { time: "15:00", signals: 86, alerts: 15 },
];

export const signals = [
  {
    id: "SIG-1042",
    frequency: "428 MHz",
    sensor: "EW-014",
    strength: "-61 dBm",
    status: "MONITORED",
    confidence: "94%",
  },
  {
    id: "SIG-1078",
    frequency: "516 MHz",
    sensor: "EW-022",
    strength: "-48 dBm",
    status: "REVIEW",
    confidence: "88%",
  },
  {
    id: "SIG-1091",
    frequency: "742 MHz",
    sensor: "EW-031",
    strength: "-67 dBm",
    status: "MONITORED",
    confidence: "91%",
  },
  {
    id: "SIG-1116",
    frequency: "861 MHz",
    sensor: "EW-007",
    strength: "-54 dBm",
    status: "REVIEW",
    confidence: "79%",
  },
  {
    id: "SIG-1134",
    frequency: "932 MHz",
    sensor: "EW-018",
    strength: "-72 dBm",
    status: "MONITORED",
    confidence: "96%",
  },
];

export const sensors = [
  {
    id: "EW-001",
    location: "Sector Alpha",
    status: "ONLINE",
    activity: 82,
    quality: 96,
  },
  {
    id: "EW-007",
    location: "Sector Bravo",
    status: "ONLINE",
    activity: 67,
    quality: 91,
  },
  {
    id: "EW-014",
    location: "Sector Charlie",
    status: "WARNING",
    activity: 91,
    quality: 73,
  },
  {
    id: "EW-018",
    location: "Sector Delta",
    status: "ONLINE",
    activity: 54,
    quality: 98,
  },
  {
    id: "EW-022",
    location: "Sector Echo",
    status: "ONLINE",
    activity: 72,
    quality: 94,
  },
  {
    id: "EW-031",
    location: "Sector Foxtrot",
    status: "OFFLINE",
    activity: 0,
    quality: 0,
  },
];

export const alerts = [
  {
    level: "HIGH",
    title: "Unclassified signal activity detected",
    location: "Sector Alpha",
    time: "2 min ago",
  },
  {
    level: "MEDIUM",
    title: "Sensor telemetry anomaly",
    location: "Node EW-014",
    time: "7 min ago",
  },
  {
    level: "HIGH",
    title: "Spectrum activity spike",
    location: "Sector Delta",
    time: "11 min ago",
  },
  {
    level: "LOW",
    title: "Sensor connection restored",
    location: "Node EW-007",
    time: "18 min ago",
  },
];

export const incidents = [
  {
    time: "10:21:08",
    type: "DETECTION",
    title: "Signal activity detected",
    location: "Sector Alpha",
    status: "OPEN",
  },
  {
    time: "10:24:36",
    type: "CORRELATION",
    title: "Multiple sensor observations correlated",
    location: "EW-001 / EW-014",
    status: "PROCESSING",
  },
  {
    time: "10:27:12",
    type: "ANALYSIS",
    title: "Signal classification under review",
    location: "Sector Alpha",
    status: "REVIEW",
  },
  {
    time: "10:31:45",
    type: "ALERT",
    title: "Monitoring alert generated",
    location: "EW Command",
    status: "OPEN",
  },
  {
    time: "10:36:20",
    type: "UPDATE",
    title: "Sensor telemetry updated",
    location: "EW-018",
    status: "NORMAL",
  },
];

export const systemHealth = [
  {
    name: "Sensor Connectivity",
    value: 98.7,
    status: "NORMAL",
  },
  {
    name: "Spectrum Feed",
    value: 99.2,
    status: "NORMAL",
  },
  {
    name: "Telemetry Integrity",
    value: 97.9,
    status: "NORMAL",
  },
  {
    name: "Data Processing",
    value: 96.4,
    status: "NORMAL",
  },
  {
    name: "Alert Processing",
    value: 94.8,
    status: "NORMAL",
  },
];

export const reportData = [
  {
    report: "Daily EW Operations",
    date: "27 Aug 2026",
    status: "READY",
  },
  {
    report: "Spectrum Monitoring Summary",
    date: "27 Aug 2026",
    status: "READY",
  },
  {
    report: "Signal Detection Summary",
    date: "27 Aug 2026",
    status: "PROCESSING",
  },
  {
    report: "Sensor Network Health",
    date: "27 Aug 2026",
    status: "READY",
  },
];