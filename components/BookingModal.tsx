
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ScrollView, Platform, Alert } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';
import { Service } from '@/types/service';
import { i18n } from '@/locales/translations';
import DateTimePicker from '@react-native-community/datetimepicker';

interface BookingModalProps {
  visible: boolean;
  service: Service | null;
  onClose: () => void;
  onConfirm: (bookingData: {
    date: Date;
    time: Date;
    notes: string;
  }) => void;
}

export function BookingModal({ visible, service, onClose, onConfirm }: BookingModalProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  if (!service) return null;

  const handleConfirm = () => {
    if (!date || !time) {
      Alert.alert(i18n.t('booking.errorTitle'), i18n.t('booking.errorMessage'));
      return;
    }

    onConfirm({ date, time, notes });
    setNotes('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{i18n.t('booking.title')}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <IconSymbol
                ios_icon_name="xmark"
                android_material_icon_name="close"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.providerName}>{service.providerName}</Text>
              <Text style={styles.price}>
                {service.price} {service.currency}
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{i18n.t('booking.selectDate')} *</Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.pickerText}>
                  {date.toLocaleDateString()}
                </Text>
                <IconSymbol
                  ios_icon_name="calendar"
                  android_material_icon_name="calendar-today"
                  size={24}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{i18n.t('booking.selectTime')} *</Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.pickerText}>
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <IconSymbol
                  ios_icon_name="clock"
                  android_material_icon_name="access-time"
                  size={24}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{i18n.t('booking.notes')}</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={notes}
                onChangeText={setNotes}
                placeholder={i18n.t('booking.notesPlaceholder')}
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(Platform.OS === 'ios');
                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                }}
              />
            )}

            {showTimePicker && (
              <DateTimePicker
                value={time}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(Platform.OS === 'ios');
                  if (selectedTime) {
                    setTime(selectedTime);
                  }
                }}
              />
            )}

            <View style={styles.infoBox}>
              <IconSymbol
                ios_icon_name="info.circle.fill"
                android_material_icon_name="info"
                size={24}
                color={colors.primary}
              />
              <Text style={styles.infoText}>{i18n.t('booking.infoText')}</Text>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>{i18n.t('booking.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>{i18n.t('booking.confirm')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  serviceInfo: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  providerName: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  pickerButton: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  pickerText: {
    fontSize: 16,
    color: colors.text,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    minHeight: 100,
  },
  infoBox: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: `${colors.primary}15`,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
});
