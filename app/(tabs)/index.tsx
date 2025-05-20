import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, useColorScheme, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const navigateToCalculator = (type: 'electricity' | 'water') => {
    router.push({
      pathname: '/calculator',
      params: { type }
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#111827' : '#F9FAFB' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: isDark ? '#F9FAFB' : '#111827' }]}>
            {greeting}
          </Text>
          <Text style={[styles.title, { color: isDark ? '#F9FAFB' : '#111827' }]}>
            Malaysian Utility Bill Calculator
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#D1D5DB' : '#4B5563' }]}>
            Calculate your electricity and water bills easily
          </Text>
        </View>

        <View style={styles.cards}>
          <TouchableOpacity 
            style={[styles.card, styles.shadowProp]} 
            onPress={() => navigateToCalculator('electricity')}
          >
            <LinearGradient
              colors={['#3B82F6', '#60A5FA']}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=1600' }} 
                style={styles.cardBackgroundImage} 
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Electricity Bill</Text>
                <Text style={styles.cardDescription}>Calculate your electricity bill based on kWh usage</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, styles.shadowProp]} 
            onPress={() => navigateToCalculator('water')}
          >
            <LinearGradient
              colors={['#0891B2', '#06B6D4']}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/40784/drops-of-water-water-nature-liquid-40784.jpeg?auto=compress&cs=tinysrgb&w=1600' }} 
                style={styles.cardBackgroundImage} 
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>Water Bill</Text>
                <Text style={styles.cardDescription}>Calculate your water bill based on liter usage</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.quickAccess}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}>
            Quick Access
          </Text>
          <View style={styles.quickLinks}>
            <TouchableOpacity 
              style={[styles.quickLink, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}
              onPress={() => router.push('/history')}
            >
              <Text style={[styles.quickLinkText, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                View History
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.quickLink, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}
              onPress={() => router.push('/tariff')}
            >
              <Text style={[styles.quickLinkText, { color: isDark ? '#F9FAFB' : '#111827' }]}>
                Check Tariff Rates
              </Text>
            </TouchableOpacity>
          </View>
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
  greeting: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
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
  cards: {
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    height: 180,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardGradient: {
    flex: 1,
    position: 'relative',
  },
  cardBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  cardContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-end',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  quickAccess: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  quickLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickLink: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickLinkText: {
    fontSize: 16,
    fontWeight: '500',
  },
});