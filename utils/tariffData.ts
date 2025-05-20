type TariffTier = {
  range: string;
  rate: number;
};

type ElectricityProvider = {
  domestic: TariffTier[];
  commercial: TariffTier[];
};

type WaterProvider = {
  provider: string;
  domestic: TariffTier[];
  commercial: TariffTier[];
};

export const electricityTariffs: Record<string, ElectricityProvider> = {
  tnb: {
    domestic: [
      { range: '0 - 200 kWh', rate: 0.218 },
      { range: '201 - 300 kWh', rate: 0.334 },
      { range: '301 - 600 kWh', rate: 0.516 },
      { range: '601 - 900 kWh', rate: 0.546 },
      { range: '> 900 kWh', rate: 0.571 }
    ],
    commercial: [
      { range: '0 - 200 kWh', rate: 0.435 },
      { range: '> 200 kWh', rate: 0.509 }
    ]
  },
  sesb: {
    domestic: [
      { range: '0 - 100 kWh', rate: 0.175 },
      { range: '101 - 200 kWh', rate: 0.224 },
      { range: '201 - 300 kWh', rate: 0.335 },
      { range: '301 - 500 kWh', rate: 0.450 },
      { range: '> 500 kWh', rate: 0.470 }
    ],
    commercial: [
      { range: '0 - 200 kWh', rate: 0.416 },
      { range: '> 200 kWh', rate: 0.490 }
    ]
  },
  sesco: {
    domestic: [
      { range: '0 - 100 kWh', rate: 0.170 },
      { range: '101 - 200 kWh', rate: 0.230 },
      { range: '201 - 400 kWh', rate: 0.340 },
      { range: '401 - 600 kWh', rate: 0.430 },
      { range: '> 600 kWh', rate: 0.460 }
    ],
    commercial: [
      { range: '0 - 200 kWh', rate: 0.420 },
      { range: '> 200 kWh', rate: 0.480 }
    ]
  }
};

export const waterTariffs: Record<string, WaterProvider> = {
  central: {
    provider: 'Air Selangor',
    domestic: [
      { range: '0 - 20 m³', rate: 0.57 },
      { range: '21 - 35 m³', rate: 1.03 },
      { range: '> 35 m³', rate: 2.00 }
    ],
    commercial: [
      { range: 'All usage', rate: 3.20 }
    ]
  },
  northern: {
    provider: 'PBA / LAP',
    domestic: [
      { range: '0 - 20 m³', rate: 0.59 },
      { range: '21 - 40 m³', rate: 0.89 },
      { range: '> 40 m³', rate: 1.60 }
    ],
    commercial: [
      { range: 'All usage', rate: 3.00 }
    ]
  },
  southern: {
    provider: 'SAJ Holdings',
    domestic: [
      { range: '0 - 20 m³', rate: 0.60 },
      { range: '21 - 35 m³', rate: 1.10 },
      { range: '> 35 m³', rate: 1.90 }
    ],
    commercial: [
      { range: 'All usage', rate: 3.30 }
    ]
  },
  eastern: {
    provider: 'PAIP',
    domestic: [
      { range: '0 - 20 m³', rate: 0.55 },
      { range: '21 - 40 m³', rate: 0.90 },
      { range: '> 40 m³', rate: 1.45 }
    ],
    commercial: [
      { range: 'All usage', rate: 2.90 }
    ]
  },
  sabah: {
    provider: 'JANS',
    domestic: [
      { range: '0 - 15 m³', rate: 0.44 },
      { range: '16 - 30 m³', rate: 0.85 },
      { range: '> 30 m³', rate: 1.35 }
    ],
    commercial: [
      { range: 'All usage', rate: 2.75 }
    ]
  },
  sarawak: {
    provider: 'LAKU / KWB',
    domestic: [
      { range: '0 - 15 m³', rate: 0.42 },
      { range: '16 - 30 m³', rate: 0.75 },
      { range: '> 30 m³', rate: 1.25 }
    ],
    commercial: [
      { range: 'All usage', rate: 2.50 }
    ]
  }
};