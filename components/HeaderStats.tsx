import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function HeaderStats() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Аналітика</Text>
      <Text style={styles.subtitle}>& Налаштування</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
    flexDirection: 'column',
    justifyContent:'flex-start',
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
})