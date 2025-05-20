import { Chrome as Home, Calculator, Clock, Info } from 'lucide-react-native';

export function HomeIcon({ size, color }: { size: number, color: string }) {
  return <Home size={size} color={color} />;
}

export function CalculatorIcon({ size, color }: { size: number, color: string }) {
  return <Calculator size={size} color={color} />;
}

export function HistoryIcon({ size, color }: { size: number, color: string }) {
  return <Clock size={size} color={color} />;
}

export function InfoIcon({ size, color }: { size: number, color: string }) {
  return <Info size={size} color={color} />;
}