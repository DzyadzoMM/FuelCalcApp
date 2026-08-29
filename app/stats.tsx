import HeaderStats from "@/components/HeaderStats";
import PriceTrendChart from "@/components/PriceTrendChart";
import StatsGrid from "@/components/StatsGrid";
import { db } from "@/db/db";
import { refuels } from "@/db/schema";
import { useFocusEffect } from "@react-navigation/native";
import { avg, sum } from "drizzle-orm/sql";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function StatsScreen() {
  const [averagePrice, setAveragePrice] = useState<number | null>(null);
  const [averageConsumption, setAverageConsumption] = useState<number | null>(null);
  const [sumTotalCost, setSumTotalCost] = useState<number | null>(null);

  const fetchStats = useCallback(async () => {
    const avgPriceRes = await db
      .select({ average: avg(refuels.price) })
      .from(refuels);
    setAveragePrice(Number(avgPriceRes[0].average ?? 0));

    const avgConsumptionRes = await db
      .select({ average: avg(refuels.consumption) })
      .from(refuels);
    setAverageConsumption(Number(avgConsumptionRes[0].average ?? 0));

    const sumRes = await db
      .select({ total: sum(refuels.total_cost) })
      .from(refuels);
    setSumTotalCost(Number(sumRes[0].total ?? 0));
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchStats();
    }, [fetchStats])
  );

  return (
    <View style={styles.container}>
      <HeaderStats />
      <StatsGrid
        stats={[
          { label: "Сер. ціна/л", value: averagePrice?.toFixed(2) ?? "—", unit: "₴" },
          { label: "Сер. витрата", value: averageConsumption?.toFixed(2) ?? "—", unit: "л/100" },
          { label: "Всього витрат", value: sumTotalCost?.toFixed(2) ?? "—", unit: "₴" },
        ]}
      />
      <PriceTrendChart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 80,
    backgroundColor: "#111827",
  },
});
