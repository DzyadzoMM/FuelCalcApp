import { ChartIcon, GaugeIcon, ListIcon } from "@/components/SvgComponents";
import { initDb } from "@/db/initDb";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { SplashScreen, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [db, setDb] = useState<any>(null);

  useEffect(() => {
    async function prepare() {
      try {
        const sqlite = initDb();
        const drizzleDb = drizzle(sqlite);

        setDb(drizzleDb);
        setReady(true);

        await SplashScreen.hideAsync();
      } catch (err) {
        console.error("DB init error:", err);
      }
    }

    prepare();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#111827",
        }}
      >
        <StatusBar
          style="light"
          backgroundColor="#111827"
        />

        <Tabs
          screenOptions={{
            headerShown: false,

            tabBarStyle: {
              backgroundColor: "#1F2937",
              borderTopColor: "#374151",
              height: 58,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            },

            tabBarActiveTintColor: "#F59E0B",
            tabBarInactiveTintColor: "#6B7280",
            tabBarHideOnKeyboard: true,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Калькулятор",
              tabBarIcon: ({ focused }) => (
                <GaugeIcon active={focused} />
              ),
            }}
          />

          <Tabs.Screen
            name="log"
            options={{
              title: "Заправки",
              tabBarIcon: ({ focused }) => (
                <ListIcon active={focused} />
              ),
            }}
          />

          <Tabs.Screen
            name="stats"
            options={{
              title: "Статистика",
              tabBarIcon: ({ focused }) => (
                <ChartIcon active={focused} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}