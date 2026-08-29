import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  unit: string;
  onChange: (v: string) => void;
  placeholder: string;
}

export default function InputField({
  label,
  value,
  unit,
  onChange,
  placeholder,
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        <TextInput
          keyboardType="numeric"
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          style={styles.input}
        />
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
  input: {
    flex: 1,
    fontSize: 22,
    fontWeight: "700",
    color: "#F9FAFB",
    backgroundColor: "transparent",
  },
  unit: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
    marginLeft: 8,
  },
});
