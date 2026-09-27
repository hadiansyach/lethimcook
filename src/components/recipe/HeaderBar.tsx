import { BrandColors, Radius, Spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderBarProps {
  quotaRemaining?: number;
  quotaTotal?: number;
  onPressHistory?: () => void;
  onPressProfile?: () => void;
}

export function HeaderBar({
  quotaRemaining = 0,
  quotaTotal = 5,
  onPressHistory,
  onPressProfile,
}: HeaderBarProps) {
  return (
    <View style={styles.container}>
      {/* Brand Logo */}
      <View style={styles.brandContainer}>
        <Text style={styles.brandTitle}>LetHimCook 🍳</Text>
      </View>

      {/* Quota Badge */}
      {/* <Badge
        variant="subtle-orange"
        dotColor={BrandColors.accentOrange}
        style={styles.quotaBadge}
      >
        Sisa {quotaRemaining}/{quotaTotal} coba gratis
      </Badge> */}

      {/* Action Icons */}
      <View style={styles.actionsContainer}>
        {/* <TouchableOpacity
          onPress={onPressHistory}
          activeOpacity={0.7}
          style={styles.iconButton}>
          <Ionicons name="time-outline" size={22} color="#475569" />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={onPressProfile}
          activeOpacity={0.7}
          style={styles.avatarButton}
        >
          <Ionicons name="person" size={15} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.two * 1.5,
    width: "100%",
    gap: 8,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  brandDot: {
    color: BrandColors.dotRed,
  },
  quotaBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  avatarButton: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: BrandColors.avatarBg,
    alignItems: "center",
    justifyContent: "center",
  },
});
