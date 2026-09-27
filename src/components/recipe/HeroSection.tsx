import { Spacing } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

export function HeroSection() {
  return (
    <View style={styles.container}>
      {/* Main Title */}
      <Text style={styles.title}>Punya bahan apa di hari ini?</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Masukkan bahan masak, auto jadi ide masakan
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two * 1.2,
    width: "100%",
    paddingVertical: Spacing.two,
  },
  categoryBadge: {
    backgroundColor: "#F1F5F9",
    borderColor: "#E2E8F0",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 21,
  },
});
