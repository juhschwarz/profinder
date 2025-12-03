
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@/components/Logo';
import { SearchBar } from '@/components/SearchBar';
import { CategoryCard } from '@/components/CategoryCard';
import { ServiceCard } from '@/components/ServiceCard';
import { colors } from '@/styles/commonStyles';
import { getServiceCategories, mockServices } from '@/data/mockData';
import { useRouter } from 'expo-router';
import { i18n } from '@/locales/translations';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(getServiceCategories());
  const router = useRouter();

  // Update categories when language changes
  useEffect(() => {
    setCategories(getServiceCategories());
  }, []);

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
            {!searchQuery && (
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
                />
              </React.Fragment>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                {i18n.t('home.noResults', { query: searchQuery })}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
