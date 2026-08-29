import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface OutputFieldProps {
  label: string;
  value: string | number;
  unit: string;
}

export default function OutputField({ label, value, unit }: OutputFieldProps) {
  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#374151",
    marginBottom: 10,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.06 * 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  value: {
    flex: 1,
    fontSize: 22,
    fontWeight: "700",
    color: "#F9FAFB",
    paddingVertical: 14,
  },
  unit: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
    marginLeft: 8,
  },
});
