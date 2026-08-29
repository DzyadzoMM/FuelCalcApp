import Header from "@/components/Header";
import InputSectionDistance from "@/components/InputSectionDistance";
import InputSectionMpg from "@/components/InputSectionMpg";
import InputSectionTotalCost from "@/components/InputSectionTotalCost";
import TabsSwitcher from "@/components/TabsSwitcher";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Index() {
  const [mode, setMode] = useState<"distance" | "totalcost" | "mpg">("distance");
  const [mpgValue, setMpgValue] = useState("");
  const [mpgResult, setMpgResult] = useState<string | undefined>(undefined);
  const [distance, setDistance] = useState("");
  const [vitrat, setVitrat] = useState("");
  const [price, setPrice] = useState("");
  const [liters, setLiters] = useState<string | undefined>(undefined);
  const [cost, setCost] = useState<string | undefined>(undefined);
  const [perKm, setPerKm] = useState<string | undefined>(undefined);
  const [value, setValue] = useState('');
  const [priceValue, setPriceValue] = useState("");
  const [totalcostResult, setTotalcostResult] = useState<string | undefined>(undefined);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#111827" }}
      contentContainerStyle={{ flexGrow: 1, paddingTop: 20, paddingHorizontal: 16, paddingBottom: 80 }}
      extraScrollHeight={40}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      keyboardOpeningTime={0}
      keyboardShouldPersistTaps="handled"
    >
      <Header />
      <TabsSwitcher mode={mode} setMode={setMode} />
      {mode === "distance" && (
        <InputSectionDistance
          distance={distance}
          setDistanc={setDistance}
          vitrat={vitrat}
          setVitrat={setVitrat}
          price={price}
          setPrice={setPrice}
          liters={liters}
          setLiters={setLiters}
          cost={cost}
          setCost={setCost}
          perKm={perKm}
          setPerKm={setPerKm}
        />
      )}
      {mode === "totalcost" && (
        <InputSectionTotalCost
          value={value}
          setValue={setValue}
          priceValue={priceValue}
          setPriceValue={setPriceValue}
          totalcostResult={totalcostResult}
          setTotalcostResult={setTotalcostResult}
        />
      )}
      {mode === "mpg" && (
        <InputSectionMpg
          mpgValue={mpgValue}
          setMpgValue={setMpgValue}
          mpgResult={mpgResult}
          setMpgResult={setMpgResult}
        />
      )}
    </KeyboardAwareScrollView>
  );
}
