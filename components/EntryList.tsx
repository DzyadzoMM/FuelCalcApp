import { TrashIcon } from "@/components/SvgComponents";
import { db } from "@/db/db";
import { refuels } from "@/db/schema";
import { eq } from "drizzle-orm";
import { desc } from "drizzle-orm/sql";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type EntryListProps = {
  refreshKey: number;
  onChanged: () => void;
};

export default function EntryList({ refreshKey,  onChanged }: EntryListProps) {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        setLoading(true);

        const result = await db
          .select()
          .from(refuels)
          .orderBy(desc(refuels.date));

        setEntries(result);
      } catch (err) {
        console.error("DB error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, [refreshKey]);

 const deleteEntry = async (id: number) => {
  try {
    await db.delete(refuels).where(eq(refuels.id, id));

    setEntries((prev) =>
      prev.filter((entry) => entry.id !== id)
    );

    onChanged();
  } catch (error) {
    console.error("Delete error:", error);
  }
};

  if (loading) {
    return <ActivityIndicator />;
  }

 const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

 return (
  <FlatList
    data={entries}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={styles.list}
    renderItem={({ item: entry }) => (
      <View style={styles.entryCard}>
        <View style={styles.entryHeader}>
          <View>
            <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>


            <Text style={styles.entryOdometer}>
              {entry.distance.toLocaleString()} км
            </Text>
          </View>

          {entry.consumption && (
            <View style={styles.consumptionBox}>
              <Text style={styles.consumptionText}>
                {entry.consumption} л/100км
              </Text>
            </View>
          )}
        </View>

        <View style={styles.entryBody}>
          <View style={styles.entryInfo}>
            <Text style={styles.infoLabel}>Об'єм</Text>
            <Text style={styles.infoValue}>{entry.liters} л</Text>
          </View>

          <View style={styles.entryInfo}>
            <Text style={styles.infoLabel}>Ціна</Text>
            <Text style={styles.infoValue}>{entry.price} ₴</Text>
          </View>

          <View style={styles.entryInfo}>
            <Text style={styles.infoLabel}>Сума</Text>
            <Text style={styles.sumValue}>{entry.total_cost} ₴</Text>
          </View>

          <View style={styles.actions}>
            {/* <TouchableOpacity style={styles.iconButton}>
              <EditIcon />
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => deleteEntry(entry.id)}
            >
              <TrashIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )}
  />
);

}

const styles = StyleSheet.create({
  entryCard: {
    backgroundColor: "#1F2937",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  list: {
  gap: 10,
  paddingBottom: 30,
},

  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  entryDate: {
    fontSize: 13,
    fontWeight: "700",
    color: "#F9FAFB",
  },
  entryOdometer: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 2,
  },
  consumptionBox: {
    backgroundColor: "rgba(245,158,11,0.12)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  consumptionText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#F59E0B",
  },
  entryBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  entryInfo: {
    flexDirection: "column",
  },
  infoLabel: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F9FAFB",
  },
  sumValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F59E0B",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    padding: 4,
  },
});
