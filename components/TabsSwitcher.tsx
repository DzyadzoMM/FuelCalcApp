import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CalcMode = "distance" | "totalcost" | "mpg";

const tabs: { id: CalcMode; label: string }[] = [
  { id: "distance", label: "За дистанцією" },
  { id: "totalcost", label: "За вартістю" },
  { id: "mpg", label: "MPG" },
];

// Описуємо типи пропсів
interface TabsSwitcherProps {
  mode: CalcMode;
  setMode: (mode: CalcMode) => void;
}

export default function TabsSwitcher({ mode, setMode }: TabsSwitcherProps) {
  return (
    <View style={styles.container}>
      {tabs.map((t, index) => (
        <TouchableOpacity
          key={t.id}
          onPress={() => setMode(t.id)}
          style={[
            styles.tab,
            mode === t.id && styles.activeTab,
            index < tabs.length - 1 && { marginRight: 3 },
          ]}
        >
          <Text
            style={[
              styles.tabText,
              mode === t.id ? styles.activeText : styles.inactiveText,
            ]}
          >
            {t.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1F2937",
    borderRadius: 10,
    padding: 3,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#F59E0B",
  },
  tabText: {
    fontSize: 11,
    fontWeight: "600",
  },
  activeText: {
    color: "#111827",
  },
  inactiveText: {
    color: "#9CA3AF",
  },
});
