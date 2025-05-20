import AsyncStorage from '@react-native-async-storage/async-storage';

export type BillData = {
  id: string;
  date: string;
  type: 'electricity' | 'water';
  usage: number;
  amount: number;
  location: string;
};

const BILL_HISTORY_KEY = 'utility_bill_history';

// Save bill to history
export const saveBillToHistory = async (billData: BillData): Promise<void> => {
  try {
    const existingHistory = await getBillHistory();
    const updatedHistory = [...existingHistory, billData];
    
    await AsyncStorage.setItem(BILL_HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error saving bill to history:', error);
  }
};

// Get bill history
export const getBillHistory = async (): Promise<BillData[]> => {
  try {
    const historyString = await AsyncStorage.getItem(BILL_HISTORY_KEY);
    
    if (!historyString) {
      return [];
    }
    
    return JSON.parse(historyString) as BillData[];
  } catch (error) {
    console.error('Error getting bill history:', error);
    return [];
  }
};

// Clear bill history
export const clearBillHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(BILL_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing bill history:', error);
  }
};

// Get monthly bill summary
export const getMonthlyBillSummary = async (): Promise<Record<string, number>> => {
  try {
    const history = await getBillHistory();
    
    // Group by month and bill type
    const monthlySummary: Record<string, number> = {};
    
    history.forEach(bill => {
      const date = new Date(bill.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const type = bill.type;
      const key = `${monthKey}-${type}`;
      
      if (!monthlySummary[key]) {
        monthlySummary[key] = 0;
      }
      
      monthlySummary[key] += bill.amount;
    });
    
    return monthlySummary;
  } catch (error) {
    console.error('Error getting monthly summary:', error);
    return {};
  }
};