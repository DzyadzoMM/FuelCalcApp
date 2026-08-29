import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TripModal from "./ModalLog";
import { PlusIcon } from "./SvgComponents";

type HeaderLogProps = {
  onAdded: () => void;
};



export default function HeaderLog({ onAdded }: HeaderLogProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Журнал заправок</Text>
        <Text style={styles.subtitle}>
          Відстежуйте свої заправки
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <PlusIcon />
        <Text style={styles.addText}>Додати заправку</Text>
      </TouchableOpacity>

      <TripModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdded={onAdded}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#F9FAFB",
    flexWrap: "wrap",
    maxWidth: 200,
    textAlign: "left",
  },
  subtitle: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F59E0B",
    padding: 8,
    borderRadius: 10,
    height: 48,
  },
  addText: { color: "#111827", fontSize: 13, fontWeight: "700" },
});
