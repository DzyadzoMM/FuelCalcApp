import EntryList from "@/components/EntryList";
import HeaderLog from "@/components/HeaderLog";
import SummaryBaner from "@/components/SummaryBaner";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function FuelLogScreen() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <HeaderLog onAdded={handleAdded} />

      <SummaryBaner
        currency=" "
        refreshKey={refreshKey}
      />

      <EntryList
        refreshKey={refreshKey}
        onChanged={handleAdded}
      />
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