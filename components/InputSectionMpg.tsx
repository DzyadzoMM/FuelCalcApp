import InputField from "@/components/InputField";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  mpgValue: string;
  setMpgValue: (val: string) => void;
  mpgResult?: string;
  setMpgResult: (val: string | undefined) => void;
}

export default function InputSectionMpg({ mpgValue, setMpgValue, mpgResult, setMpgResult }: Props) {
  useEffect(() => {
    if (mpgValue) {
      const mpgNum = parseFloat(mpgValue);
      if (!isNaN(mpgNum) && mpgNum > 0) {
        const result = (235.215 / mpgNum).toFixed(2);
        setMpgResult(result);
      } else {
        setMpgResult(undefined);
      }
    } else {
      setMpgResult(undefined);
    }
  }, [mpgValue]);

  return (
    <View style={styles.container}>
      <InputField
        label="Розхід у MPG"
        value={mpgValue}
        unit="MPG"
        onChange={setMpgValue}
        placeholder="38"
      />

      <View style={styles.resultBox}>
        <Text style={styles.resultLabel}>Еквівалент у л/100км</Text>
        <Text style={styles.resultValue}>
          {mpgResult ? `${mpgResult} л/100км` : "—"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginBottom: 20,
  },
  resultBox: {
    backgroundColor: "#1F2937",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  resultLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.06 * 16,
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "#F59E0B",
    fontFamily: "JetBrainsMono-Regular",
  },
});
