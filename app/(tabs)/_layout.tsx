
import React from 'react';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';
import { i18n } from '@/locales/translations';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'home',
      label: i18n.t('tabs.home'),
    },
    {
      name: 'search',
      route: '/(tabs)/search',
      icon: 'search',
      label: i18n.t('tabs.search'),
    },
    {
      name: 'bookings',
      route: '/(tabs)/bookings',
      icon: 'calendar-today',
      label: i18n.t('tabs.bookings'),
    },
    {
      name: 'requests',
      route: '/(tabs)/requests',
      icon: 'description',
      label: i18n.t('tabs.requests'),
    },
    {
      name: 'profile',
      route: '/(tabs)/profile',
      icon: 'person',
      label: i18n.t('tabs.profile'),
    },
  ];

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen key="home" name="(home)" />
        <Stack.Screen key="search" name="search" />
        <Stack.Screen key="bookings" name="bookings" />
        <Stack.Screen key="requests" name="requests" />
        <Stack.Screen key="add" name="add" />
        <Stack.Screen key="profile" name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} containerWidth={450} />
    </>
  );
}
