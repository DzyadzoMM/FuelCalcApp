import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CarIcon } from "./SvgComponents";


export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.container_svg}>
        <CarIcon size={30} />
      </View>
      <View>
        <Text style={styles.title}>FuelCalc</Text>
        <Text style={styles.subtitle}>Калькулятор вартості поїздки</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", 
    alignItems: "center",   
    marginBottom: 24,
  },
  container_svg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#1F2937",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,      
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#F9FAFB",
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
  },
});
