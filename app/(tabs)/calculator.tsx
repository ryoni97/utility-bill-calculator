import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, useColorScheme, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { calculateElectricityBill, calculateWaterBill } from '@/utils/calculationUtils';
import { saveBillToHistory } from '@/utils/storageUtils';

export default function CalculatorScreen() {
  const { type = 'electricity' } = useLocalSearchParams<{ type: 'electricity' | 'water' }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [usage, setUsage] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [location, setLocation] = useState('central');
  const [isElectricity, setIsElectricity] = useState(true);
  
  useEffect(() => {
    setIsElectricity(type === 'electricity');
    setUsage('');
    setResult(null);
  }, [type]);

  const handleCalculate = async () => {
    if (!usage || isNaN(Number(usage)) || Number(usage) < 0) {
      alert('Please enter a valid usage amount');
      return;
    }

    const usageValue = parseFloat(usage);
    let calculatedResult = 0;
    
    if (isElectricity) {
      calculatedResult = calculateElectricityBill(usageValue);
    } else {
      calculatedResult = calculateWaterBill(usageValue, location);
    }
    
    setResult(calculatedResult);
    
    // Save to history
    const billData = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      type: isElectricity ? 'electricity' : 'water',
      usage: usageValue,
      amount: calculatedResult,
      location: isElectricity ? 'all' : location
    };
    
    await saveBillToHistory(billData);
  };

  const renderLocationSelector = () => {
    if (isElectricity) return null;
    
    return (
      <View style={styles.selectorContainer}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}>
          Select Your State
        </Text>
        <ScrollView style={styles.locationOptionsContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.locationOptions}>
            <TouchableOpacity 
              style={[
                styles.locationOption, 
                location === 'central' && styles.selectedLocation,
                { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
              ]}
              onPress={() => setLocation('central')}
            >
              <Text style={[
                styles.locationText, 
                location === 'central' && styles.selectedLocationText,
                { color: isDark ? '#F9FAFB' : '#111827' }
              ]}>
                Central (Selangor, KL)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.locationOption, 
                location === 'northern' && styles.selectedLocation,
                { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
              ]}
              onPress={() => setLocation('northern')}
            >
              <Text style={[
                styles.locationText, 
                location === 'northern' && styles.selectedLocationText,
                { color: isDark ? '#F9FAFB' : '#111827' }
              ]}>
                Northern (Penang, Perak)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.locationOption, 
                location === 'southern' && styles.selectedLocation,
                { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
              ]}
              onPress={() => setLocation('southern')}
            >
              <Text style={[
                styles.locationText, 
                location === 'southern' && styles.selectedLocationText,
                { color: isDark ? '#F9FAFB' : '#111827' }
              ]}>
                Southern (Johor)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.locationOption, 
                location === 'eastern' && styles.selectedLocation,
                { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
              ]}
              onPress={() => setLocation('eastern')}
            >
              <Text style={[
                styles.locationText, 
                location === 'eastern' && styles.selectedLocationText,
                { color: isDark ? '#F9FAFB' : '#111827' }
              ]}>
                Eastern (Pahang, Terengganu)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.locationOption, 
                location === 'sabah' && styles.selectedLocation,
                { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
              ]}
              onPress={() => setLocation('sabah')}
            >
              <Text style={[
                styles.locationText, 
                location === 'sabah' && styles.selectedLocationText,
                { color: isDark ? '#F9FAFB' : '#111827' }
              ]}>
                Sabah
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.locationOption, 
                location === 'sarawak' && styles.selectedLocation,
                { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
              ]}
              onPress={() => setLocation('sarawak')}
            >
              <Text style={[
                styles.locationText, 
                location === 'sarawak' && styles.selectedLocationText,
                { color: isDark ? '#F9FAFB' : '#111827' }
              ]}>
                Sarawak
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#111827' : '#F9FAFB' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#F9FAFB' : '#111827' }]}>
            {isElectricity ? 'Electricity Bill Calculator' : 'Water Bill Calculator'}
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#D1D5DB' : '#4B5563' }]}>
            {isElectricity 
              ? 'Enter your kWh usage to calculate your electricity bill'
              : 'Enter your water usage in liters to calculate your bill'}
          </Text>
        </View>

        <View style={styles.calculatorContainer}>
          <View style={styles.tabSelector}>
            <TouchableOpacity 
              style={[
                styles.tab, 
                isElectricity && styles.activeTab,
                { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
              ]}
              onPress={() => {
                setIsElectricity(true);
                setResult(null);
                setUsage('');
              }}
            >
              <Text style={[
                styles.tabText, 
                isElectricity && styles.activeTabText,
                { color: isDark ? '#F9FAFB' : '#111827' }
              ]}>
                Electricity
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.tab, 
                !isElectricity && styles.activeTab,
                { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
              ]}
              onPress={() => {
                setIsElectricity(false);
                setResult(null);
                setUsage('');
              }}
            >
              <Text style={[
                styles.tabText, 
                !isElectricity && styles.activeTabText,
                { color: isDark ? '#F9FAFB' : '#111827' }
              ]}>
                Water
              </Text>
            </TouchableOpacity>
          </View>

          {renderLocationSelector()}
          
          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: isDark ? '#F9FAFB' : '#111827' }]}>
              {isElectricity ? 'Enter kWh Usage' : 'Enter Water Usage (liters)'}
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDark ? '#374151' : '#FFFFFF',
                  color: isDark ? '#F9FAFB' : '#111827',
                  borderColor: isDark ? '#4B5563' : '#E5E7EB'
                }
              ]}
              value={usage}
              onChangeText={setUsage}
              placeholder={isElectricity ? 'e.g., 500' : 'e.g., 20000'}
              placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
              keyboardType="numeric"
            />
          </View>
          
          <TouchableOpacity 
            style={[
              styles.calculateButton,
              { backgroundColor: isElectricity ? '#3B82F6' : '#0891B2' }
            ]}
            onPress={handleCalculate}
          >
            <Text style={styles.calculateButtonText}>Calculate</Text>
          </TouchableOpacity>
          
          {result !== null && (
            <View style={[
              styles.resultContainer,
              { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
            ]}>
              <Text style={[styles.resultTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                Your Estimated Bill
              </Text>
              <Text style={styles.resultAmount}>
                RM {result.toFixed(2)}
              </Text>
              <Text style={[styles.resultDescription, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
                Based on {usage} {isElectricity ? 'kWh' : 'liters'} of usage
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  calculatorContainer: {
    marginBottom: 24,
  },
  tabSelector: {
    flexDirection: 'row',
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#3B82F6',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  selectorContainer: {
    marginBottom: 24,
    maxHeight: Platform.OS === 'web' ? 300 : 200,
  },
  locationOptionsContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  locationOptions: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
    gap: 12,
  },
  locationOption: {
    width: Platform.OS === 'web' ? '48%' : '100%',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedLocation: {
    backgroundColor: '#0891B2',
  },
  locationText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedLocationText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  calculateButton: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  resultAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 8,
  },
  resultDescription: {
    fontSize: 14,
  },
});