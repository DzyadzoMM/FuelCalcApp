import { db } from "@/db/db";
import { refuels } from "@/db/schema";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  currency: string;
  refreshKey?: number;
}

export default function SummaryBaner({
  currency,
  refreshKey = 0,
}: Props) {
  const [totalSpentMonth, setTotalSpentMonth] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);

  useEffect(() => {
    loadMonthlyStats();
  }, [refreshKey]);

  const loadMonthlyStats = async () => {
    try {
      const entries = await db.select().from(refuels);

      const now = new Date();

      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const monthEntries = entries.filter((entry) => {
        const date = new Date(entry.date);

        return (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        );
      });

      const spent = monthEntries.reduce(
        (sum, entry) => sum + Number(entry.total_cost),
        0
      );

      setTotalSpentMonth(spent);

      const sortedEntries = [...monthEntries].sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      );

      if (sortedEntries.length >= 2) {
        const firstDistance = Number(sortedEntries[0].distance);
        const lastDistance = Number(
          sortedEntries[sortedEntries.length - 1].distance
        );

        setTotalDistance(lastDistance - firstDistance);
      } else {
        setTotalDistance(0);
      }
    } catch (error) {
      console.error("Summary DB error:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#1F2937", "#111827"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.resultContainer}
    >
      <View style={styles.bannerLeft}>
        <Text style={styles.bannerLabel}>
          Цього місяця
        </Text>

        <Text style={styles.bannerValue}>
          {totalSpentMonth.toLocaleString("uk-UA", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}{" "}
          {currency}
        </Text>

        <Text style={styles.bannerSub}>
          Загальні витрати
        </Text>
      </View>

      <View style={styles.bannerRight}>
        <Text style={styles.bannerLabel}>
          Дистанція
        </Text>

        <Text style={styles.bannerValue}>
          {totalDistance.toLocaleString("uk-UA")}{" "}
          <Text style={styles.bannerUnit}>км</Text>
        </Text>

        <Text style={styles.bannerSub}>
          Відстежено
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    flexDirection: "row",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#374151",
    marginBottom: 16,
    position: "relative",
    overflow: "hidden",
  },

  bannerLeft: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: "#374151",
    paddingRight: 20,
  },

  bannerRight: {
    flex: 1,
    paddingLeft: 20,
  },

  bannerLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#9CA3AF",
    marginBottom: 6,
  },

  bannerValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#F59E0B",
  },

  bannerUnit: {
    fontSize: 13,
    color: "#9CA3AF",
  },

  bannerSub: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 3,
  },
});
