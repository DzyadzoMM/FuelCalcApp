import { db } from "@/db/db";
import { refuels } from "@/db/schema";
import { desc } from "drizzle-orm/sql";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import InputField from "./InputField";
import OutputField from "./OutputField";
import { CloseIcon, SaveIcon } from "./SvgComponents";

type TripModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdded?: () => void;
};

export default function TripModal({ visible, onClose, onAdded }: TripModalProps) {
  const [liters, setLiters] = useState("");
  const [price, setPrice] = useState("");
  const [distance, setDistance] = useState("");
  const [consumption, setConsumption] = useState("");
  const [total_cost, setTotalCost] = useState("");
  const [lastDistance, setLastDistance] = useState<string>("");

  const fetchLastDistance = async () => {
    try {
      const result = await db
        .select()
        .from(refuels)
        .orderBy(desc(refuels.date))
        .limit(1);

      if (result.length > 0) {
        setLastDistance(result[0].distance.toString());
      }
    } catch (error) {
      console.error("Помилка при отриманні останнього запису:", error);
    }
  };

  useEffect(() => {
    fetchLastDistance();
  }, []);

  useEffect(() => {
    if (liters && total_cost) {
      const liter = parseFloat(liters);
      const totalCos = parseFloat(total_cost);
      if (!isNaN(liter) && liter > 0 && !isNaN(totalCos) && totalCos > 0) {
        const result = (totalCos / liter).toFixed(2);
        setPrice(result);
      } else {
        setPrice("");
      }
    } else {
      setPrice("");
    }
  }, [liters, total_cost]);

const addRefuels = async () => {
  if (!liters.trim() || !price.trim() || !distance.trim() || !total_cost.trim()) {
    Alert.alert("Помилка", "Ви не ввели дані для збереження");
    return;
  }
  try {
    const last = await db
      .select()
      .from(refuels)
      .orderBy(desc(refuels.date))
      .limit(1);

    const hasPrevious = last.length > 0;
    const lastOdometer = hasPrevious ? last[0].distance : null;
    const currentOdometer = parseFloat(distance);
    const literNum = parseFloat(liters);

    let tripDistance = 0;
    let consumptionValue: number | null = null; 

    if (lastOdometer !== null) {
      tripDistance = currentOdometer - lastOdometer;
      if (tripDistance > 0 && literNum > 0) {
        consumptionValue = parseFloat((literNum / (tripDistance / 100)).toFixed(2));
      }
    }

    await db.insert(refuels).values({
      liters: literNum,
      total_cost: parseFloat(total_cost),
      price: parseFloat((parseFloat(total_cost) / literNum).toFixed(2)),
      distance: currentOdometer,   // показ одометра
      trip_distance: tripDistance, // дистанція поїздки
      consumption: consumptionValue, // null для першого запису
      date: new Date().toISOString(),
    });

    onAdded?.();
    await fetchLastDistance();

    Alert.alert("Успішно", "Дані записано");
    setLiters("");
    setPrice("");
    setDistance("");
    setTotalCost("");
    setConsumption("");
    onClose();
  } catch (error) {
    console.error(error);
    Alert.alert("Помилка", "Не вдалося зберегти дані");
  }
};



  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.box}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <CloseIcon size={30} color={"#9CA3AF"} />
            </TouchableOpacity>

            <InputField label="Об'єм" value={liters} unit="л" onChange={setLiters} placeholder="50" />
            <InputField label="Вартість" value={total_cost} unit="₴" onChange={setTotalCost} placeholder="4000" />
            <OutputField label="Ціна за л" value={price} unit="₴" />
            <InputField
              label="Покази одометра"
              value={distance}
              unit="км"
              onChange={setDistance}
              placeholder={lastDistance || "150000"}
            />

            <TouchableOpacity style={styles.saveButton} activeOpacity={0.7} onPress={addRefuels}>
              <SaveIcon />
              <Text style={styles.saveText}>Зберегти</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "100%",
    backgroundColor: "#111827",
    borderRadius: 12,
  },
  closeButton: {
    alignItems: "flex-end",
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  saveButton: {
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
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 7,
  },
});
