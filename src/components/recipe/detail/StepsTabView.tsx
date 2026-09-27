import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BrandColors, Radius, Spacing } from '@/constants/theme';
import { CookingStep } from '@/types/recipe';

interface StepsTabViewProps {
  steps: CookingStep[];
}

export function StepsTabView({ steps }: StepsTabViewProps) {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [activeTimers, setActiveTimers] = useState<Record<number, number>>({});
  const [runningTimers, setRunningTimers] = useState<Record<number, boolean>>({});

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  const startTimer = (stepNumber: number, seconds: number) => {
    if (!activeTimers[stepNumber]) {
      setActiveTimers((prev) => ({ ...prev, [stepNumber]: seconds }));
    }
    setRunningTimers((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  // Timer interval effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimers((prev) => {
        let changed = false;
        const next = { ...prev };
        Object.keys(next).forEach((key) => {
          const num = Number(key);
          if (runningTimers[num] && next[num] > 0) {
            next[num] -= 1;
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [runningTimers]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {steps.map((step) => {
        const isDone = completedSteps[step.nomor] ?? false;
        const currentSeconds = activeTimers[step.nomor] ?? (step.timer_detik || 0);
        const isRunning = runningTimers[step.nomor] ?? false;

        return (
          <View
            key={`step-${step.nomor}`}
            style={[styles.stepCard, isDone && styles.stepCardDone]}>
            {/* Step Header */}
            <View style={styles.stepHeader}>
              <View style={styles.stepHeaderLeft}>
                <View
                  style={[
                    styles.stepNumberBadge,
                    isDone && styles.stepNumberBadgeDone,
                  ]}>
                  <Text
                    style={[
                      styles.stepNumberText,
                      isDone && styles.stepNumberTextDone,
                    ]}>
                    {step.nomor}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.stepTitle,
                    isDone && styles.stepTitleDone,
                  ]}>
                  {step.judul_langkah}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleStep(step.nomor)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={[
                  styles.checkButton,
                  isDone && styles.checkButtonDone,
                ]}>
                <Ionicons
                  name={isDone ? 'checkmark' : 'checkmark-outline'}
                  size={15}
                  color={isDone ? '#FFFFFF' : '#94A3B8'}
                />
              </TouchableOpacity>
            </View>

            {/* Step Instructions */}
            <Text
              style={[
                styles.instructionText,
                isDone && styles.instructionTextDone,
              ]}>
              {step.instruksi}
            </Text>

            {/* Optional Countdown Timer */}
            {step.timer_detik && step.timer_detik > 0 && (
              <View style={styles.timerRow}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => startTimer(step.nomor, step.timer_detik!)}
                  style={[
                    styles.timerButton,
                    isRunning && styles.timerButtonRunning,
                  ]}>
                  <Ionicons
                    name={isRunning ? 'pause' : 'play'}
                    size={14}
                    color={isRunning ? '#FFFFFF' : BrandColors.primary}
                  />
                  <Text
                    style={[
                      styles.timerButtonText,
                      isRunning && styles.timerButtonTextRunning,
                    ]}>
                    {isRunning ? 'Jeda Timer ' : 'Mulai Timer '}
                    {formatTimer(currentSeconds)}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
    width: '100%',
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: Radius.lg + 2,
    padding: Spacing.four,
    gap: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  stepCardDone: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    opacity: 0.85,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  stepNumberBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: BrandColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberBadgeDone: {
    backgroundColor: '#16A34A',
  },
  stepNumberText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepNumberTextDone: {
    color: '#FFFFFF',
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
  },
  stepTitleDone: {
    color: '#64748B',
    textDecorationLine: 'line-through',
  },
  checkButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkButtonDone: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },
  instructionText: {
    fontSize: 13.5,
    color: '#334155',
    lineHeight: 21,
  },
  instructionTextDone: {
    color: '#94A3B8',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  timerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: BrandColors.primaryLight,
    borderWidth: 1,
    borderColor: BrandColors.primaryLightBorder,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Radius.full,
  },
  timerButtonRunning: {
    backgroundColor: BrandColors.primary,
    borderColor: BrandColors.primary,
  },
  timerButtonText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: BrandColors.primary,
  },
  timerButtonTextRunning: {
    color: '#FFFFFF',
  },
});
