import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { db } from "@/db/db";
import { refuels } from "@/db/schema";
import { sql } from "drizzle-orm";
import { desc, max } from "drizzle-orm/sql";

type TrendItem = {
  month: string;
  price: number;
};

export default function PriceTrendChart() {
  const [priceTrend, setPriceTrend] = useState<TrendItem[]>([]);
  const [empty, setEmpty] = useState(false);

  const fetchFuelPrices = useCallback(async () => {
    const result = await db
      .select({
        month: sql<string>`strftime('%Y-%m', ${refuels.date})`, // SQLite: рік-місяць
        maxPrice: max(refuels.price),
      })
      .from(refuels)
      .groupBy(sql`strftime('%Y-%m', ${refuels.date})`)
      .orderBy(desc(sql`strftime('%Y-%m', ${refuels.date})`))
      .limit(6);

    if (result.length === 0) {
      setEmpty(true);
      setPriceTrend([]);
      return;
    }

    const now = new Date();
    const months: TrendItem[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const found = result.find((r) => r.month === key);
      months.push({
        month: d.toLocaleDateString("uk-UA", { month: "short" }),
        price: found ? Number(found.maxPrice) : 0,
      });
    }

    setEmpty(false);
    setPriceTrend(months);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFuelPrices();
    }, [fetchFuelPrices])
  );

  if (empty) {
    return (
      <View
        style={{
          backgroundColor: "#1F2937",
          borderRadius: 16,
          padding: 20,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 14 }}>
          Додайте заправки, щоб побачити динаміку цін
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: "#1F2937",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontWeight: "600",
          color: "#9CA3AF",
          textTransform: "uppercase",
          letterSpacing: 0.6,
          marginBottom: 26,
        }}
      >
        Динаміка цін на паливо — 6 місяців
      </Text>
      {priceTrend.length > 0 && (
        <LineChart
          data={{
            labels: priceTrend.map((item) => item.month),
            datasets: [{ data: priceTrend.map((item) => item.price) }],
          }}
          width={Dimensions.get("window").width - 50}
          height={160}
          chartConfig={{
            backgroundColor: "#1F2937",
            backgroundGradientFrom: "#1F2937",
            backgroundGradientTo: "#1F2937",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
          }}
          bezier
          style={{ borderRadius: 12, paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
