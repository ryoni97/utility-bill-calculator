import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getBillHistory, clearBillHistory, BillData } from '@/utils/storageUtils';

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [history, setHistory] = useState<BillData[]>([]);
  const [filter, setFilter] = useState<'all' | 'electricity' | 'water'>('all');
  
  // Load history when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );
  
  const loadHistory = async () => {
    const data = await getBillHistory();
    setHistory(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };
  
  const handleClearHistory = async () => {
    await clearBillHistory();
    setHistory([]);
  };
  
  const filteredHistory = history.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-MY', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const getMonthlyTotal = (type: 'electricity' | 'water' | 'all') => {
    if (history.length === 0) return 0;
    
    const filtered = type === 'all' 
      ? history 
      : history.filter(item => item.type === type);
      
    // Group by month
    const monthlyData: Record<string, number> = {};
    
    filtered.forEach(item => {
      const date = new Date(item.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = 0;
      }
      
      monthlyData[monthKey] += item.amount;
    });
    
    // Get latest month
    const sortedKeys = Object.keys(monthlyData).sort().reverse();
    return sortedKeys.length > 0 ? monthlyData[sortedKeys[0]] : 0;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#111827' : '#F9FAFB' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#F9FAFB' : '#111827' }]}>
          Bill History
        </Text>
        <TouchableOpacity onPress={handleClearHistory}>
          <Text style={styles.clearButton}>Clear History</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.summaryContainer}>
        <View style={[
          styles.summaryCard, 
          { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
        ]}>
          <Text style={[styles.summaryTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}>
            This Month
          </Text>
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                Electricity
              </Text>
              <Text style={[styles.summaryValue, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                RM {getMonthlyTotal('electricity').toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                Water
              </Text>
              <Text style={[styles.summaryValue, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                RM {getMonthlyTotal('water').toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                Total
              </Text>
              <Text style={[
                styles.summaryTotal, 
                { color: isDark ? '#60A5FA' : '#3B82F6' }
              ]}>
                RM {getMonthlyTotal('all').toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            filter === 'all' && styles.activeFilter
          ]}
          onPress={() => setFilter('all')}
        >
          <Text style={[
            styles.filterText, 
            filter === 'all' && styles.activeFilterText
          ]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            filter === 'electricity' && styles.activeFilter
          ]}
          onPress={() => setFilter('electricity')}
        >
          <Text style={[
            styles.filterText, 
            filter === 'electricity' && styles.activeFilterText
          ]}>
            Electricity
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            filter === 'water' && styles.activeFilter
          ]}
          onPress={() => setFilter('water')}
        >
          <Text style={[
            styles.filterText, 
            filter === 'water' && styles.activeFilterText
          ]}>
            Water
          </Text>
        </TouchableOpacity>
      </View>
      
      {filteredHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
            No bill history found. Calculate some bills to see your history.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[
              styles.historyItem,
              { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
            ]}>
              <View style={styles.historyItemHeader}>
                <View style={[
                  styles.historyItemBadge,
                  { 
                    backgroundColor: item.type === 'electricity' 
                      ? '#DBEAFE' 
                      : '#CFFAFE'
                  }
                ]}>
                  <Text style={[
                    styles.historyItemBadgeText,
                    {
                      color: item.type === 'electricity'
                        ? '#1E40AF'
                        : '#0E7490'
                    }
                  ]}>
                    {item.type === 'electricity' ? 'Electricity' : 'Water'}
                  </Text>
                </View>
                <Text style={[styles.historyItemDate, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                  {formatDate(item.date)}
                </Text>
              </View>
              <View style={styles.historyItemContent}>
                <Text style={[styles.historyItemUsage, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                  {item.usage} {item.type === 'electricity' ? 'kWh' : 'liters'}
                </Text>
                <Text style={[styles.historyItemAmount, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                  RM {item.amount.toFixed(2)}
                </Text>
              </View>
              {item.type === 'water' && item.location !== 'all' && (
                <Text style={[styles.historyItemLocation, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                  Region: {item.location.charAt(0).toUpperCase() + item.location.slice(1)}
                </Text>
              )}
            </View>
          )}
          contentContainerStyle={styles.historyList}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  clearButton: {
    fontSize: 16,
    color: '#EF4444',
  },
  summaryContainer: {
    marginBottom: 24,
  },
  summaryCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryContent: {
    gap: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  summaryTotal: {
    fontSize: 20,
    fontWeight: '700',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#E5E7EB',
  },
  activeFilter: {
    backgroundColor: '#3B82F6',
  },
  filterText: {
    color: '#4B5563',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  historyList: {
    paddingBottom: 16,
  },
  historyItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyItemBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  historyItemBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  historyItemDate: {
    fontSize: 14,
  },
  historyItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyItemUsage: {
    fontSize: 16,
  },
  historyItemAmount: {
    fontSize: 18,
    fontWeight: '600',
  },
  historyItemLocation: {
    fontSize: 14,
  },
});