import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputField from './InputField';


interface Props {
  value: string;
  setValue: (val: string) => void;
  priceValue: string;
  setPriceValue: (val: string) => void;
  totalcostResult?: string;
  setTotalcostResult: (val: string | undefined) => void;
}

export default function InputSectionTotalCost({value,setValue, priceValue, setPriceValue, totalcostResult, setTotalcostResult}:Props) {
  useEffect(() => {
    if (value && priceValue) {
      const valueNum = parseFloat(value);
      const priceNum = parseFloat(priceValue);

      if (!isNaN(valueNum) && valueNum > 0 && !isNaN(priceNum) && priceNum > 0) {
        const result = (valueNum / priceNum).toFixed(2); 
        setTotalcostResult(result);
      } else {
        setTotalcostResult(undefined);
      }
    } else {
      setTotalcostResult(undefined);
    }
  }, [value, priceValue]);
  return (
    <View style={styles.container}>
      <InputField
          label="Загальна вартість"
          value={value}
          unit="$"
          onChange={setValue}
          placeholder="7.5"
        />
        <InputField
          label="Ціна пального"
          value={priceValue}
          unit="$/л"
          onChange={setPriceValue}
          placeholder="90.00"
        />
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Витрата</Text>
          <Text style={styles.resultValue}>
            {totalcostResult ? `${totalcostResult} л` : "—"}
          </Text>
        </View>
    </View>
  )
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
})