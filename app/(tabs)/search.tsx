
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '@/components/SearchBar';
import { CategoryCard } from '@/components/CategoryCard';
import { ServiceCard } from '@/components/ServiceCard';
import { BookingModal } from '@/components/BookingModal';
import { colors } from '@/styles/commonStyles';
import { getServiceCategories, mockServices } from '@/data/mockData';
import { IconSymbol } from '@/components/IconSymbol';
import { i18n } from '@/locales/translations';
import { Service } from '@/types/service';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState(getServiceCategories());
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

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
    Alert.alert(
      i18n.t('booking.successTitle'),
      i18n.t('booking.successMessage')
    );
  };

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = searchQuery === '' ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (a.providerPremium && !b.providerPremium) return -1;
    if (!a.providerPremium && b.providerPremium) return 1;
    return b.rating - a.rating;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{i18n.t('search.title')}</Text>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={i18n.t('search.searchPlaceholder')}
          />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{i18n.t('search.allCategories')}</Text>
            <View style={styles.categoriesGrid}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryGridItem,
                    selectedCategory === category.name && styles.categoryGridItemActive,
                  ]}
                  onPress={() => {
                    setSelectedCategory(selectedCategory === category.name ? null : category.name);
                  }}
                  activeOpacity={0.7}
                >
                  <IconSymbol
                    ios_icon_name={category.icon}
                    android_material_icon_name={category.icon as any}
                    size={28}
                    color={selectedCategory === category.name ? colors.card : colors.primary}
                  />
                  <Text
                    style={[
                      styles.categoryGridName,
                      selectedCategory === category.name && styles.categoryGridNameActive,
                    ]}
                    numberOfLines={1}
                  >
                    {category.name}
                  </Text>
                  <Text
                    style={[
                      styles.categoryGridCount,
                      selectedCategory === category.name && styles.categoryGridCountActive,
                    ]}
                  >
                    {category.count}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.resultsHeader}>
              <Text style={styles.sectionTitle}>
                {selectedCategory || searchQuery ? i18n.t('search.results') : i18n.t('search.allServices')}
              </Text>
              <Text style={styles.resultsCount}>
                {sortedServices.length} {sortedServices.length === 1 ? i18n.t('search.service') : i18n.t('search.services')}
              </Text>
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
                <IconSymbol
                  ios_icon_name="magnifyingglass"
                  android_material_icon_name="search-off"
                  size={64}
                  color={colors.textSecondary}
                />
                <Text style={styles.emptyText}>{i18n.t('search.noResults')}</Text>
                <Text style={styles.emptySubtext}>
                  {i18n.t('search.noResultsSubtext')}
                </Text>
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
      </View>
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
  header: {
    paddingTop: Platform.OS === 'android' ? 48 : 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryGridItem: {
    width: '31%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  categoryGridItemActive: {
    backgroundColor: colors.primary,
  },
  categoryGridName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginTop: 8,
  },
  categoryGridNameActive: {
    color: colors.card,
  },
  categoryGridCount: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  categoryGridCountActive: {
    color: colors.card,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
