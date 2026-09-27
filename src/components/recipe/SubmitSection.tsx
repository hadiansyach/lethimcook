import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface SubmitSectionProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  estimateText?: string;
}

export function SubmitSection({
  onPress,
  loading = false,
  disabled = false,
  estimateText = "",
}: SubmitSectionProps) {
  return (
    <View style={styles.container}>
      <PrimaryButton
        title="Cari Ide Menu"
        icon={<Ionicons name="search" size={18} color="#FFFFFF" />}
        onPress={onPress}
        loading={loading}
        disabled={disabled}
      />
      {estimateText ? (
        <View style={styles.estimateContainer}>
          <Ionicons name="stopwatch-outline" size={14} color="#64748B" />
          <Text style={styles.estimateText}>{estimateText}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: Spacing.two,
  },
  estimateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  estimateText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
});
