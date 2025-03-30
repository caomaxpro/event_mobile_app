import React from 'react';
import {StyleSheet, View, Modal, TouchableOpacity} from 'react-native';
import {ScreenComponent} from '@src/components/native_components/ScreenComponent';
import CustomText from '@src/components/native_components/CustomText';
import SnapVerticalCalender from '@src/components/vertical_calendar/SnapVerticalCalender';
import ArrowButton from '@src/components/button/ArrowButton';

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm?: (dates: {startDate: Date; endDate: Date}) => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <CustomText customStyle={styles.title}>Select Dates</CustomText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <CustomText>✕</CustomText>
            </TouchableOpacity>
          </View>

          <View style={styles.calendarContainer}>
            <SnapVerticalCalender />
          </View>

          <View style={styles.footer}>
            <ArrowButton
              label="CONFIRM"
              onPress={() => {
                if (onConfirm) {
                  // TODO: Get selected dates from calendar
                  onConfirm({
                    startDate: new Date(),
                    endDate: new Date(),
                  });
                }
                onClose();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  calendarContainer: {
    flex: 1,
  },
  footer: {
    marginTop: 20,
    paddingBottom: 20,
  },
});

export default CalendarModal;
