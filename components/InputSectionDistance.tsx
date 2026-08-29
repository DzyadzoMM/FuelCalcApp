import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputField from './InputField';
import { DropletIcon, SaveIcon, ShareIcon } from './SvgComponents';

interface Props {
  liters?: string;
  setLiters: (val: string | undefined) => void;
  cost?: string;
  setCost: (val: string | undefined) => void;
  perKm?: string;
  setPerKm: (val: string | undefined) => void;
  distance: string;
  setDistanc: (val: string) => void;
  vitrat: string;
  setVitrat: (val: string) => void;
  price: string;
  setPrice: (val: string) => void;
}

type Trip = {
  liters?: string;
  cost?: string;
  perKm?: string;
  distance: string;
  vitrat?: string;
  price?: string;
};

const shareTrip = async (trip: Trip) => {
  try {
    const message = `Поїздка:
- Дистанція: ${trip.distance} км
- Витрата: ${trip.liters} л
- Вартість: ${trip.cost} $
- Ціна за км: ${trip.perKm} $`;

    await Share.share({ message });
  } catch (error) {
    console.error("Помилка при поширенні", error);
  }
};

export default function InputSectionDistance({
  distance, setDistanc,
  vitrat, setVitrat,
  price, setPrice,
  liters, cost, perKm,
  setCost, setLiters, setPerKm
}: Props) {

  const [history, setHistory] = useState<Trip[]>([]);

  // завантажуємо останній запис і підставляємо у поля
  useEffect(() => {
    const loadLastTrip = async () => {
      try {
        const stored = await AsyncStorage.getItem('trips');
        if (stored) {
          const trips: Trip[] = JSON.parse(stored);
          setHistory(trips);
          const last = trips[trips.length - 1];
          if (last) {
            setDistanc(last.distance);
            if (last.vitrat) setVitrat(last.vitrat);
            if (last.price) setPrice(last.price);
            if (last.liters) setLiters(last.liters);
            if (last.cost) setCost(last.cost);
            if (last.perKm) setPerKm(last.perKm);
          }
        }
      } catch (e) {
        console.error("Помилка завантаження", e);
      }
    };
    loadLastTrip();
  }, []);

  const saveTrip = async (trip: Trip) => {
    try {
      const stored = await AsyncStorage.getItem('trips');
      const trips = stored ? JSON.parse(stored) : [];
      trips.push(trip);
      await AsyncStorage.setItem('trips', JSON.stringify(trips));
      setHistory(trips);
      console.log("Збережено!");
    } catch (e) {
      console.error("Помилка збереження", e);
    }
  };

  useEffect(() => {
    if (distance && vitrat && price) {
      const distanceNum = parseFloat(distance);
      const vitratNum = parseFloat(vitrat);
      const priceNum = parseFloat(price);

      if (!isNaN(distanceNum) && distanceNum > 0 &&
          !isNaN(priceNum) && priceNum > 0 &&
          !isNaN(vitratNum) && vitratNum > 0) {
        const litersNum = (distanceNum / 100) * vitratNum;
        const costNum = litersNum * priceNum;
        const perKmNum = costNum / distanceNum;

        setLiters(litersNum.toFixed(2));
        setCost(costNum.toFixed(2));
        setPerKm(perKmNum.toFixed(2));
      } else {
        setCost(undefined);
        setLiters(undefined);
        setPerKm(undefined);
      }
    } else {
      setCost(undefined);
      setLiters(undefined);
      setPerKm(undefined);
    }
  }, [distance, vitrat, price]);

  return (
    <ScrollView style={styles.container}>
      <InputField label="Дистанція" value={distance} unit="км" onChange={setDistanc} placeholder="350" />
      <InputField label="Витрата" value={vitrat} unit="л/100км" onChange={setVitrat} placeholder="7.5" />
      <InputField label="Ціна пального" value={price} unit="$" onChange={setPrice} placeholder="90.00" />

      <LinearGradient colors={["#1F2937", "#111827"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.resultContainer}>
        <Text style={styles.sectionLabel}>Результат поїздки</Text>
        {liters && cost && perKm ? (
          <>
            <View style={styles.row}>
              <View>
                <Text style={styles.subLabel}>Потрібно палива</Text>
                <Text style={styles.liters}>
                  {liters}<Text style={styles.litersUnit}> L</Text>
                </Text>
              </View>
              <DropletIcon />
            </View>

            <View style={styles.costBox}>
              <Text style={styles.costLabel}>Загальна вартість поїздки</Text>
              <Text style={styles.costValue}>
                {cost}<Text style={styles.costUnit}> $</Text>
              </Text>
            </View>

            <View style={styles.rowGap}>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>Вартість / км</Text>
                <Text style={styles.infoValue}>{perKm} $</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>Дистанція</Text>
                <Text style={styles.infoValue}>{distance} km</Text>
              </View>
            </View>
          </>
        ) : (
          <Text style={styles.empty}>Заповніть поля вище, щоб побачити результат</Text>
        )}
      </LinearGradient>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.7}
          onPress={() => saveTrip({ liters, cost, perKm, distance, vitrat, price })}
        >
          <SaveIcon />
          <Text style={styles.saveText}>Зберегти до історії</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton} activeOpacity={0.7} onPress={() => shareTrip({ liters, cost, perKm, distance, vitrat, price })}>
          <ShareIcon />
          <Text style={styles.shareText}>Поділитись</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
   container: {
    flexDirection: "column",
    gap:10,
    marginBottom: 20,
  },
  resultContainer: {
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#374151",
    marginBottom: 16,
    position: "relative",
    overflow: "hidden",
  },
glow: {
  position: "absolute",
  top: -20,
  right: -20,
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: "rgba(245,158,11,0.3)",
  shadowColor: "#F59E0B",
  shadowOpacity: 0.9,
  shadowRadius: 200, // чим більше, тим сильніше розмиття
  shadowOffset: { width: 0, height: 0 },
},

  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.06 * 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  subLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 4,
  },
  liters: {
    fontSize: 36,
    fontWeight: "800",
    color: "#F9FAFB",
    lineHeight: 40,
  },
  litersUnit: {
    fontSize: 16,
    fontWeight: "500",
    color: "#9CA3AF",
    marginLeft: 6,
  },
  costBox: {
    backgroundColor: "rgba(245,158,11,0.12)",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(245,158,11,0.2)",
    marginBottom: 12,
  },
  costLabel: {
    fontSize: 11,
    color: "#F59E0B",
    marginBottom: 4,
  },
  costValue: {
    fontSize: 30,
    fontWeight: "800",
    color: "#F59E0B",
  },
  costUnit: {
    fontSize: 14,
    marginLeft: 4,
  },
  rowGap: {
    flexDirection: "row",
    gap: 8,
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#374151",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  infoLabel: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#F9FAFB",
  },
  empty: {
    textAlign: "center",
    paddingVertical: 20,
    color: "#6B7280",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  saveButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#F59E0B",
  },
  saveText: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "700",
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#374151",
    backgroundColor: "#1F2937",
  },
  shareText: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "600",
  },
});
