import React from "react";
import { StyleSheet, Text, View } from "react-native";

type StatItem = {
  label: string;
  value: string | number;
  unit: string;
};

type StatsGridProps = {
  stats: StatItem[];
};

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <View style={styles.container}>
      {stats.map((stat) => (
        <View key={stat.label} style={styles.card}>
          <Text style={styles.label}>{stat.label}</Text>
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.unit}>{stat.unit}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#1F2937",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#374151",
    alignItems: "center",
  },
  label: {
    fontSize: 9,
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
    lineHeight: 13,
  },
  value: {
    fontSize: 18,
    fontWeight: "800",
    color: "#F59E0B",
    lineHeight: 20,
  },
  unit: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 3,
  },
});
