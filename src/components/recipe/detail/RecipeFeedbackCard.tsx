import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Radius, Spacing } from '@/constants/theme';

export function RecipeFeedbackCard() {
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

  const handlePress = (type: string, message: string) => {
    setSelectedFeedback(type);
    Alert.alert('Terima Kasih!', message);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Bagaimana hasil resep ini?</Text>
      <Text style={styles.subtitle}>
        Bantu kami menyesuaikan takaran rasa berikutnya
      </Text>

      <View style={styles.buttonsRow}>
        {/* Button 1: Enak & Pas */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            handlePress('enak', 'Senang resep ini cocok dengan seleramu! 🎉')
          }
          style={[
            styles.feedbackButton,
            selectedFeedback === 'enak' && styles.feedbackButtonActive,
          ]}>
          <Text style={styles.emoji}>👍</Text>
          <Text style={styles.buttonText}>Enak &amp; Pas</Text>
        </TouchableOpacity>

        {/* Button 2: Kurang Sesuai */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            handlePress(
              'kurang',
              'Terima kasih atas masukannya, kami akan tingkatkan takarannya!'
            )
          }
          style={[
            styles.feedbackButton,
            selectedFeedback === 'kurang' && styles.feedbackButtonActive,
          ]}>
          <Text style={styles.emoji}>👎</Text>
          <Text style={styles.buttonText}>Kurang Sesuai</Text>
        </TouchableOpacity>

        {/* Button 3: Beri Masukan */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            handlePress('masukan', 'Kritik & saran kamu sangat berharga!')
          }
          style={[
            styles.feedbackButton,
            selectedFeedback === 'masukan' && styles.feedbackButtonActive,
          ]}>
          <Text style={styles.emoji}>💬</Text>
          <Text style={styles.buttonText}>Beri Masukan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: Radius.lg + 2,
    padding: Spacing.four,
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    width: '100%',
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12.5,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  feedbackButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: Radius.lg,
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  feedbackButtonActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#93C5FD',
  },
  emoji: {
    fontSize: 18,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    textAlign: 'center',
  },
});
