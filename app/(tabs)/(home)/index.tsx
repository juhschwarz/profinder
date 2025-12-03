
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@/components/Logo';
import { SearchBar } from '@/components/SearchBar';
import { CategoryCard } from '@/components/CategoryCard';
import { ServiceCard } from '@/components/ServiceCard';
import { BookingModal } from '@/components/BookingModal';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { getServiceCategories, mockServices } from '@/data/mockData';
import { useRouter } from 'expo-router';
import { i18n } from '@/locales/translations';
import { Service } from '@/types/service';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(getServiceCategories());
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const router = useRouter();

  // Update categories when language changes
  useEffect(() => {
    setCategories(getServiceCategories());
  }, []);

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setBookingModalVisible(true);
  };

  const handleConfirmBooking = (bookingData: { date: Date; time: Date; notes: string }) => {
    console.log('Booking confirmed:', { service: selectedService, ...bookingData });
  };

  const filteredServices = mockServices.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort services to show premium first
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (a.providerPremium && !b.providerPremium) return -1;
    if (!a.providerPremium && b.providerPremium) return 1;
    return b.rating - a.rating;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Logo size="medium" showText={true} />
          <Text style={styles.tagline}>{i18n.t('home.tagline')}</Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={i18n.t('home.searchPlaceholder')}
          onFilterPress={() => console.log('Filter pressed')}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('home.categories')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <CategoryCard
                  category={category}
                  onPress={() => {
                    console.log('Category pressed:', category.name);
                    setSearchQuery(category.name);
                  }}
                />
              </React.Fragment>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {searchQuery ? i18n.t('home.searchResults') : i18n.t('home.featuredServices')}
            </Text>
            {!searchQuery && sortedServices.length > 0 && (
              <TouchableOpacity>
                <Text style={styles.seeAll}>{i18n.t('home.seeAll')}</Text>
              </TouchableOpacity>
            )}
          </View>

          {sortedServices.length > 0 ? (
            sortedServices.map((service, index) => (
              <React.Fragment key={index}>
                <ServiceCard
                  service={service}
                  onPress={() => console.log('Service pressed:', service.title)}
                  onBook={() => handleBookService(service)}
                />
              </React.Fragment>
            ))
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <IconSymbol
                  ios_icon_name="magnifyingglass"
                  android_material_icon_name="search"
                  size={64}
                  color={colors.textSecondary}
                />
              </View>
              <Text style={styles.emptyTitle}>
                {searchQuery ? i18n.t('home.noResults', { query: searchQuery }) : i18n.t('home.noServicesYet')}
              </Text>
              <Text style={styles.emptyDescription}>
                {searchQuery 
                  ? i18n.t('home.tryDifferentSearch')
                  : i18n.t('home.beFirstToOffer')
                }
              </Text>
              {!searchQuery && (
                <TouchableOpacity 
                  style={styles.addServiceButton}
                  onPress={() => router.push('/(tabs)/add')}
                  activeOpacity={0.7}
                >
                  <IconSymbol
                    ios_icon_name="plus.circle.fill"
                    android_material_icon_name="add-circle"
                    size={20}
                    color={colors.card}
                  />
                  <Text style={styles.addServiceButtonText}>
                    {i18n.t('home.addService')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      <BookingModal
        visible={bookingModalVisible}
        service={selectedService}
        onClose={() => setBookingModalVisible(false)}
        onConfirm={handleConfirmBooking}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: Platform.OS === 'android' ? 48 : 20,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  tagline: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconContainer: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  addServiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  addServiceButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.card,
  },
});
