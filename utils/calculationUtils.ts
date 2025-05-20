// Electricity bill calculation for Malaysian tariff
export function calculateElectricityBill(kWh: number): number {
  // TNB domestic tariff rates in Peninsular Malaysia
  let totalBill = 0;
  
  if (kWh <= 200) {
    // First 200 kWh
    totalBill = kWh * 0.218;
  } else if (kWh <= 300) {
    // First 200 kWh at RM0.218
    totalBill = 200 * 0.218;
    // Next kWh at RM0.334
    totalBill += (kWh - 200) * 0.334;
  } else if (kWh <= 600) {
    // First 200 kWh at RM0.218
    totalBill = 200 * 0.218;
    // Next 100 kWh at RM0.334
    totalBill += 100 * 0.334;
    // Remaining kWh at RM0.516
    totalBill += (kWh - 300) * 0.516;
  } else if (kWh <= 900) {
    // First 200 kWh at RM0.218
    totalBill = 200 * 0.218;
    // Next 100 kWh at RM0.334
    totalBill += 100 * 0.334;
    // Next 300 kWh at RM0.516
    totalBill += 300 * 0.516;
    // Remaining kWh at RM0.546
    totalBill += (kWh - 600) * 0.546;
  } else {
    // First 200 kWh at RM0.218
    totalBill = 200 * 0.218;
    // Next 100 kWh at RM0.334
    totalBill += 100 * 0.334;
    // Next 300 kWh at RM0.516
    totalBill += 300 * 0.516;
    // Next 300 kWh at RM0.546
    totalBill += 300 * 0.546;
    // Remaining kWh at RM0.571
    totalBill += (kWh - 900) * 0.571;
  }
  
  // Add service tax (6%)
  totalBill *= 1.06;
  
  // Add KWTBB (Renewable Energy Fund) of 1.6%
  totalBill *= 1.016;
  
  return totalBill;
}

// Water bill calculation for Malaysian tariff
export function calculateWaterBill(liters: number, region: string = 'central'): number {
  // Convert liters to cubic meters (m³)
  const cubicMeters = liters / 1000;
  let totalBill = 0;
  
  // Different tariff structures for different regions
  switch (region) {
    case 'central': // Selangor, KL
      if (cubicMeters <= 20) {
        totalBill = cubicMeters * 0.57;
      } else if (cubicMeters <= 35) {
        totalBill = 20 * 0.57;
        totalBill += (cubicMeters - 20) * 1.03;
      } else {
        totalBill = 20 * 0.57;
        totalBill += 15 * 1.03;
        totalBill += (cubicMeters - 35) * 2.00;
      }
      break;
      
    case 'northern': // Penang, Perak
      if (cubicMeters <= 20) {
        totalBill = cubicMeters * 0.59;
      } else if (cubicMeters <= 40) {
        totalBill = 20 * 0.59;
        totalBill += (cubicMeters - 20) * 0.89;
      } else {
        totalBill = 20 * 0.59;
        totalBill += 20 * 0.89;
        totalBill += (cubicMeters - 40) * 1.60;
      }
      break;
      
    case 'southern': // Johor
      if (cubicMeters <= 20) {
        totalBill = cubicMeters * 0.60;
      } else if (cubicMeters <= 35) {
        totalBill = 20 * 0.60;
        totalBill += (cubicMeters - 20) * 1.10;
      } else {
        totalBill = 20 * 0.60;
        totalBill += 15 * 1.10;
        totalBill += (cubicMeters - 35) * 1.90;
      }
      break;
      
    case 'eastern': // Pahang, Terengganu
      if (cubicMeters <= 20) {
        totalBill = cubicMeters * 0.55;
      } else if (cubicMeters <= 40) {
        totalBill = 20 * 0.55;
        totalBill += (cubicMeters - 20) * 0.90;
      } else {
        totalBill = 20 * 0.55;
        totalBill += 20 * 0.90;
        totalBill += (cubicMeters - 40) * 1.45;
      }
      break;
      
    case 'sabah':
      if (cubicMeters <= 15) {
        totalBill = cubicMeters * 0.44;
      } else if (cubicMeters <= 30) {
        totalBill = 15 * 0.44;
        totalBill += (cubicMeters - 15) * 0.85;
      } else {
        totalBill = 15 * 0.44;
        totalBill += 15 * 0.85;
        totalBill += (cubicMeters - 30) * 1.35;
      }
      break;
      
    case 'sarawak':
      if (cubicMeters <= 15) {
        totalBill = cubicMeters * 0.42;
      } else if (cubicMeters <= 30) {
        totalBill = 15 * 0.42;
        totalBill += (cubicMeters - 15) * 0.75;
      } else {
        totalBill = 15 * 0.42;
        totalBill += 15 * 0.75;
        totalBill += (cubicMeters - 30) * 1.25;
      }
      break;
      
    default:
      return 0;
  }
  
  // Add a basic charge (varies by region)
  switch (region) {
    case 'central':
      totalBill += 2.50;
      break;
    case 'northern':
      totalBill += 2.50;
      break;
    case 'southern':
      totalBill += 3.00;
      break;
    case 'eastern':
      totalBill += 2.00;
      break;
    case 'sabah':
      totalBill += 1.50;
      break;
    case 'sarawak':
      totalBill += 1.50;
      break;
  }
  
  return totalBill;
}