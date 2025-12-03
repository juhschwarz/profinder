
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { mockBookings } from '@/data/bookingData';
import { Booking } from '@/types/booking';
import { i18n } from '@/locales/translations';

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingBookings = mockBookings.filter(
    b => b.status === 'pending' || b.status === 'confirmed'
  );
  const pastBookings = mockBookings.filter(
    b => b.status === 'completed' || b.status === 'cancelled'
  );

  const renderBookingCard = (booking: Booking) => {
    const statusColors = {
      pending: colors.warning,
      confirmed: colors.success,
      completed: colors.textSecondary,
      cancelled: colors.error,
    };

    const statusIcons = {
      pending: 'schedule',
      confirmed: 'check-circle',
      completed: 'done-all',
      cancelled: 'cancel',
    };

    return (
      <TouchableOpacity
        key={booking.id}
        style={styles.bookingCard}
        onPress={() => console.log('Booking pressed:', booking.id)}
        activeOpacity={0.7}
      >
        <View style={styles.bookingHeader}>
          <View style={styles.bookingTitleRow}>
            <Text style={styles.bookingTitle} numberOfLines={1}>
              {booking.serviceTitle}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: `${statusColors[booking.status]}20` }]}>
              <IconSymbol
                ios_icon_name={statusIcons[booking.status] as any}
                android_material_icon_name={statusIcons[booking.status]}
                size={14}
                color={statusColors[booking.status]}
              />
              <Text style={[styles.statusText, { color: statusColors[booking.status] }]}>
                {i18n.t(`bookings.status.${booking.status}`)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <IconSymbol
              ios_icon_name="person.fill"
              android_material_icon_name="person"
              size={18}
              color={colors.primary}
            />
            <Text style={styles.detailText}>{booking.providerName}</Text>
          </View>

          <View style={styles.detailRow}>
            <IconSymbol
              ios_icon_name="calendar"
              android_material_icon_name="calendar-today"
              size={18}
              color={colors.primary}
            />
            <Text style={styles.detailText}>
              {new Date(booking.date).toLocaleDateString()} {i18n.t('bookings.at')} {booking.time}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <IconSymbol
              ios_icon_name="location.fill"
              android_material_icon_name="location-on"
              size={18}
              color={colors.primary}
            />
            <Text style={styles.detailText}>{booking.location}</Text>
          </View>

          {booking.notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesLabel}>{i18n.t('bookings.notes')}:</Text>
              <Text style={styles.notesText}>{booking.notes}</Text>
            </View>
          )}
        </View>

        <View style={styles.bookingFooter}>
          <Text style={styles.price}>
            {booking.price} {booking.currency}
          </Text>
          {booking.status === 'pending' && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => console.log('Cancel booking:', booking.id)}
              >
                <Text style={styles.cancelButtonText}>{i18n.t('bookings.cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.rescheduleButton]}
                onPress={() => console.log('Reschedule booking:', booking.id)}
              >
                <Text style={styles.rescheduleButtonText}>{i18n.t('bookings.reschedule')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{i18n.t('bookings.title')}</Text>
          
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
              onPress={() => setActiveTab('upcoming')}
            >
              <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
                {i18n.t('bookings.upcoming')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'past' && styles.activeTab]}
              onPress={() => setActiveTab('past')}
            >
              <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
                {i18n.t('bookings.past')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'upcoming' ? (
            upcomingBookings.length > 0 ? (
              upcomingBookings.map(booking => renderBookingCard(booking))
            ) : (
              <View style={styles.emptyState}>
                <IconSymbol
                  ios_icon_name="calendar"
                  android_material_icon_name="event-busy"
                  size={64}
                  color={colors.textSecondary}
                />
                <Text style={styles.emptyText}>{i18n.t('bookings.noUpcoming')}</Text>
                <Text style={styles.emptySubtext}>{i18n.t('bookings.noUpcomingSubtext')}</Text>
              </View>
            )
          ) : (
            pastBookings.length > 0 ? (
              pastBookings.map(booking => renderBookingCard(booking))
            ) : (
              <View style={styles.emptyState}>
                <IconSymbol
                  ios_icon_name="calendar"
                  android_material_icon_name="event-busy"
                  size={64}
                  color={colors.textSecondary}
                />
                <Text style={styles.emptyText}>{i18n.t('bookings.noPast')}</Text>
                <Text style={styles.emptySubtext}>{i18n.t('bookings.noPastSubtext')}</Text>
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
  bookingCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  bookingHeader: {
    marginBottom: 12,
  },
  bookingTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  bookingTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bookingDetails: {
    gap: 10,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.text,
  },
  notesContainer: {
    marginTop: 4,
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: `${colors.error}15`,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.error,
  },
  rescheduleButton: {
    backgroundColor: colors.primary,
  },
  rescheduleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
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
