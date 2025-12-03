
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { mockServiceRequests } from '@/data/bookingData';
import { ServiceRequest } from '@/types/booking';
import { i18n } from '@/locales/translations';
import { useRouter } from 'expo-router';

export default function RequestsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'my-requests' | 'browse'>('my-requests');

  const myRequests = mockServiceRequests.filter(r => r.clientId === 'client1');
  const browseRequests = mockServiceRequests.filter(r => r.status === 'open');

  const renderRequestCard = (request: ServiceRequest, showBidButton: boolean = false) => {
    const statusColors = {
      open: colors.success,
      in_progress: colors.warning,
      closed: colors.textSecondary,
    };

    return (
      <TouchableOpacity
        key={request.id}
        style={styles.requestCard}
        onPress={() => console.log('Request pressed:', request.id)}
        activeOpacity={0.7}
      >
        <View style={styles.requestHeader}>
          <View style={styles.requestTitleRow}>
            <Text style={styles.requestTitle} numberOfLines={2}>
              {request.title}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: `${statusColors[request.status]}20` }]}>
              <Text style={[styles.statusText, { color: statusColors[request.status] }]}>
                {i18n.t(`requests.status.${request.status}`)}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={3}>
          {request.description}
        </Text>

        <View style={styles.requestDetails}>
          <View style={styles.detailRow}>
            <IconSymbol
              ios_icon_name="tag.fill"
              android_material_icon_name="label"
              size={16}
              color={colors.primary}
            />
            <Text style={styles.detailText}>{request.category}</Text>
          </View>

          <View style={styles.detailRow}>
            <IconSymbol
              ios_icon_name="location.fill"
              android_material_icon_name="location-on"
              size={16}
              color={colors.primary}
            />
            <Text style={styles.detailText}>{request.location}</Text>
          </View>

          {request.preferredDate && (
            <View style={styles.detailRow}>
              <IconSymbol
                ios_icon_name="calendar"
                android_material_icon_name="calendar-today"
                size={16}
                color={colors.primary}
              />
              <Text style={styles.detailText}>
                {new Date(request.preferredDate).toLocaleDateString()}
                {request.preferredTime && ` ${i18n.t('requests.at')} ${request.preferredTime}`}
              </Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <IconSymbol
              ios_icon_name="person.fill"
              android_material_icon_name="person"
              size={16}
              color={colors.primary}
            />
            <Text style={styles.detailText}>{request.clientName}</Text>
          </View>
        </View>

        <View style={styles.requestFooter}>
          <View style={styles.budgetContainer}>
            <Text style={styles.budgetLabel}>{i18n.t('requests.budget')}:</Text>
            <Text style={styles.budget}>
              {request.budget} {request.currency}
            </Text>
          </View>

          {showBidButton ? (
            <TouchableOpacity
              style={styles.bidButton}
              onPress={() => console.log('Place bid:', request.id)}
            >
              <Text style={styles.bidButtonText}>{i18n.t('requests.placeBid')}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.bidsInfo}>
              <IconSymbol
                ios_icon_name="person.2.fill"
                android_material_icon_name="people"
                size={16}
                color={colors.textSecondary}
              />
              <Text style={styles.bidsText}>
                {request.bids.length} {request.bids.length === 1 ? i18n.t('requests.bid') : i18n.t('requests.bids')}
              </Text>
            </View>
          )}
        </View>

        {!showBidButton && request.bids.length > 0 && (
          <View style={styles.bidsPreview}>
            <Text style={styles.bidsPreviewTitle}>{i18n.t('requests.latestBid')}:</Text>
            <View style={styles.bidCard}>
              <View style={styles.bidHeader}>
                <Text style={styles.bidProviderName}>{request.bids[0].providerName}</Text>
                <View style={styles.bidBadges}>
                  {request.bids[0].providerVerified && (
                    <IconSymbol
                      ios_icon_name="checkmark.seal.fill"
                      android_material_icon_name="verified"
                      size={16}
                      color={colors.success}
                    />
                  )}
                  {request.bids[0].providerPremium && (
                    <IconSymbol
                      ios_icon_name="star.fill"
                      android_material_icon_name="star"
                      size={16}
                      color={colors.highlight}
                    />
                  )}
                </View>
              </View>
              <Text style={styles.bidMessage} numberOfLines={2}>
                {request.bids[0].message}
              </Text>
              <View style={styles.bidFooter}>
                <Text style={styles.bidPrice}>
                  {request.bids[0].price} {request.bids[0].currency}
                </Text>
                <Text style={styles.bidDuration}>{request.bids[0].estimatedDuration}</Text>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{i18n.t('requests.title')}</Text>
          
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'my-requests' && styles.activeTab]}
              onPress={() => setActiveTab('my-requests')}
            >
              <Text style={[styles.tabText, activeTab === 'my-requests' && styles.activeTabText]}>
                {i18n.t('requests.myRequests')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'browse' && styles.activeTab]}
              onPress={() => setActiveTab('browse')}
            >
              <Text style={[styles.tabText, activeTab === 'browse' && styles.activeTabText]}>
                {i18n.t('requests.browse')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'my-requests' ? (
            <>
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => router.push('/create-request')}
                activeOpacity={0.7}
              >
                <IconSymbol
                  ios_icon_name="plus.circle.fill"
                  android_material_icon_name="add-circle"
                  size={24}
                  color={colors.card}
                />
                <Text style={styles.createButtonText}>{i18n.t('requests.createRequest')}</Text>
              </TouchableOpacity>

              {myRequests.length > 0 ? (
                myRequests.map(request => renderRequestCard(request, false))
              ) : (
                <View style={styles.emptyState}>
                  <IconSymbol
                    ios_icon_name="doc.text"
                    android_material_icon_name="description"
                    size={64}
                    color={colors.textSecondary}
                  />
                  <Text style={styles.emptyText}>{i18n.t('requests.noRequests')}</Text>
                  <Text style={styles.emptySubtext}>{i18n.t('requests.noRequestsSubtext')}</Text>
                </View>
              )}
            </>
          ) : (
            browseRequests.length > 0 ? (
              browseRequests.map(request => renderRequestCard(request, true))
            ) : (
              <View style={styles.emptyState}>
                <IconSymbol
                  ios_icon_name="doc.text"
                  android_material_icon_name="description"
                  size={64}
                  color={colors.textSecondary}
                />
                <Text style={styles.emptyText}>{i18n.t('requests.noBrowse')}</Text>
                <Text style={styles.emptySubtext}>{i18n.t('requests.noBrowseSubtext')}</Text>
              </View>
            )
          )}
        </ScrollView>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.card,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
  requestCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  requestHeader: {
    marginBottom: 12,
  },
  requestTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  requestTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  requestDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: colors.text,
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  budgetLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  budget: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  bidButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  bidButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
  },
  bidsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bidsText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  bidsPreview: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bidsPreviewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  bidCard: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
  },
  bidHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bidProviderName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  bidBadges: {
    flexDirection: 'row',
    gap: 4,
  },
  bidMessage: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 8,
  },
  bidFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bidPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  bidDuration: {
    fontSize: 12,
    color: colors.textSecondary,
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
