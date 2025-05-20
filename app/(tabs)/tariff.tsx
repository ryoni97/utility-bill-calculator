import { StyleSheet, Text, View, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { electricityTariffs, waterTariffs } from '@/utils/tariffData';

export default function TariffScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [activeTab, setActiveTab] = useState<'electricity' | 'water'>('electricity');
  const [provider, setProvider] = useState('tnb');
  const [region, setRegion] = useState('central');
  
  const renderElectricityTariffs = () => {
    const tariffs = electricityTariffs[provider];
    
    return (
      <View style={styles.tariffSection}>
        <View style={styles.providerSelector}>
          <TouchableOpacity 
            style={[
              styles.providerOption,
              provider === 'tnb' && styles.activeProvider
            ]}
            onPress={() => setProvider('tnb')}
          >
            <Text style={[
              styles.providerText,
              provider === 'tnb' && styles.activeProviderText
            ]}>
              TNB
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.providerOption,
              provider === 'sesb' && styles.activeProvider
            ]}
            onPress={() => setProvider('sesb')}
          >
            <Text style={[
              styles.providerText,
              provider === 'sesb' && styles.activeProviderText
            ]}>
              SESB
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.providerOption,
              provider === 'sesco' && styles.activeProvider
            ]}
            onPress={() => setProvider('sesco')}
          >
            <Text style={[
              styles.providerText,
              provider === 'sesco' && styles.activeProviderText
            ]}>
              SESCO
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={[
          styles.tariffCard,
          { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
        ]}>
          <Text style={[styles.tariffCardTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}>
            Domestic Tariff Rates ({provider.toUpperCase()})
          </Text>
          
          {tariffs.domestic.map((tier, index) => (
            <View key={index} style={styles.tariffRow}>
              <Text style={[styles.tariffRange, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                {tier.range}
              </Text>
              <Text style={[styles.tariffRate, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                RM {tier.rate} / kWh
              </Text>
            </View>
          ))}
        </View>
        
        <View style={[
          styles.tariffCard,
          { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
        ]}>
          <Text style={[styles.tariffCardTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}>
            Commercial Tariff Rates ({provider.toUpperCase()})
          </Text>
          
          {tariffs.commercial.map((tier, index) => (
            <View key={index} style={styles.tariffRow}>
              <Text style={[styles.tariffRange, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                {tier.range}
              </Text>
              <Text style={[styles.tariffRate, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                RM {tier.rate} / kWh
              </Text>
            </View>
          ))}
        </View>
        
        <View style={[
          styles.infoCard,
          { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
        ]}>
          <Text style={[styles.infoTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}>
            Note
          </Text>
          <Text style={[styles.infoText, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
            Rates are subject to change by the provider. Additional surcharges may apply depending on your usage pattern and contract type.
          </Text>
        </View>
      </View>
    );
  };
  
  const renderWaterTariffs = () => {
    const tariffs = waterTariffs[region];
    
    return (
      <View style={styles.tariffSection}>
        <View style={styles.regionSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity 
              style={[
                styles.regionOption,
                region === 'central' && styles.activeRegion
              ]}
              onPress={() => setRegion('central')}
            >
              <Text style={[
                styles.regionText,
                region === 'central' && styles.activeRegionText
              ]}>
                Central
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.regionOption,
                region === 'northern' && styles.activeRegion
              ]}
              onPress={() => setRegion('northern')}
            >
              <Text style={[
                styles.regionText,
                region === 'northern' && styles.activeRegionText
              ]}>
                Northern
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.regionOption,
                region === 'southern' && styles.activeRegion
              ]}
              onPress={() => setRegion('southern')}
            >
              <Text style={[
                styles.regionText,
                region === 'southern' && styles.activeRegionText
              ]}>
                Southern
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.regionOption,
                region === 'eastern' && styles.activeRegion
              ]}
              onPress={() => setRegion('eastern')}
            >
              <Text style={[
                styles.regionText,
                region === 'eastern' && styles.activeRegionText
              ]}>
                Eastern
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.regionOption,
                region === 'sabah' && styles.activeRegion
              ]}
              onPress={() => setRegion('sabah')}
            >
              <Text style={[
                styles.regionText,
                region === 'sabah' && styles.activeRegionText
              ]}>
                Sabah
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.regionOption,
                region === 'sarawak' && styles.activeRegion
              ]}
              onPress={() => setRegion('sarawak')}
            >
              <Text style={[
                styles.regionText,
                region === 'sarawak' && styles.activeRegionText
              ]}>
                Sarawak
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        <View style={[
          styles.tariffCard,
          { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
        ]}>
          <Text style={[styles.tariffCardTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}>
            {tariffs.provider} - Domestic Rates
          </Text>
          
          {tariffs.domestic.map((tier, index) => (
            <View key={index} style={styles.tariffRow}>
              <Text style={[styles.tariffRange, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                {tier.range}
              </Text>
              <Text style={[styles.tariffRate, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                RM {tier.rate} / m³
              </Text>
            </View>
          ))}
        </View>
        
        <View style={[
          styles.tariffCard,
          { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
        ]}>
          <Text style={[styles.tariffCardTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}>
            {tariffs.provider} - Commercial Rates
          </Text>
          
          {tariffs.commercial.map((tier, index) => (
            <View key={index} style={styles.tariffRow}>
              <Text style={[styles.tariffRange, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                {tier.range}
              </Text>
              <Text style={[styles.tariffRate, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                RM {tier.rate} / m³
              </Text>
            </View>
          ))}
        </View>
        
        <View style={[
          styles.infoCard,
          { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
        ]}>
          <Text style={[styles.infoTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}>
            Note
          </Text>
          <Text style={[styles.infoText, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
            1 cubic meter (m³) = 1,000 liters of water. Additional fixed charges may apply depending on your provider and connection type.
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#111827' : '#F9FAFB' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#F9FAFB' : '#111827' }]}>
          Tariff Information
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>
          Check the latest utility tariff rates across Malaysia
        </Text>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'electricity' && styles.activeTab
          ]}
          onPress={() => setActiveTab('electricity')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'electricity' && styles.activeTabText
          ]}>
            Electricity
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab,
            activeTab === 'water' && styles.activeTab
          ]}
          onPress={() => setActiveTab('water')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'water' && styles.activeTabText
          ]}>
            Water
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.contentContainer}>
        {activeTab === 'electricity' ? renderElectricityTariffs() : renderWaterTariffs()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
  },
  activeTab: {
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  contentContainer: {
    flex: 1,
  },
  tariffSection: {
    padding: 16,
  },
  providerSelector: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  providerOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    marginRight: 8,
    borderRadius: 8,
  },
  activeProvider: {
    backgroundColor: '#3B82F6',
  },
  providerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  activeProviderText: {
    color: '#FFFFFF',
  },
  regionSelector: {
    marginBottom: 16,
  },
  regionOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
  },
  activeRegion: {
    backgroundColor: '#0891B2',
  },
  regionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  activeRegionText: {
    color: '#FFFFFF',
  },
  tariffCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tariffCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  tariffRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tariffRange: {
    fontSize: 14,
    flex: 2,
  },
  tariffRate: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});