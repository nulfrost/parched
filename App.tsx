import { StatusBar } from "expo-status-bar";
import { TamaguiProvider, View, H1, Button, Text } from "tamagui";
import { useFonts } from "expo-font";
import config from "./tamagui.config";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";
import { blackA } from "@tamagui/colors";
import { GlassWater, Settings } from "@tamagui/lucide-icons";
import {
  ToastProvider,
  Toast,
  ToastViewport,
  useToastState,
  useToastController,
} from "@tamagui/toast";

export default function App() {
  const [remainingGlasses, setRemainingGlasses] = useState(8);
  const currentToast = useToastState();
  const toast = useToastController();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <TamaguiProvider config={config}>
      <ToastProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.safeAreaView}>
            <View style={styles.top}>
              <H1 style={styles.welcomeMessage} fontSize="$8">
                Today
              </H1>
              <Pressable>
                <Settings size={24} color="$blue10" />
              </Pressable>
            </View>
            <Text color={blackA.blackA9} fontSize="$5" mb="$4">
              {remainingGlasses} remaining glasses
            </Text>
            <View style={styles.water}>
              {Array.from({ length: 8 }).map((_, index) => (
                <GlassWater key={index} size={48} color="$blue10" />
              ))}
            </View>
            <Button
              backgroundColor="$blue9Dark"
              mt="auto"
              onPress={() => console.log(toast.show)}
            >
              I've drank a glass
            </Button>
          </View>
          <StatusBar style="auto" />
        </SafeAreaView>
        {!currentToast || currentToast.isHandledNatively ? null : (
          <Toast
            key={currentToast.id}
            duration={currentToast.duration}
            enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
            exitStyle={{ opacity: 0, scale: 1, y: -20 }}
            y={0}
            opacity={1}
            scale={1}
            animation="100ms"
            viewportName={currentToast.viewportName}
          >
            <Toast.Title>{currentToast.title}</Toast.Title>
            <Toast.Close />
          </Toast>
        )}
        <ToastViewport />
      </ToastProvider>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    padding: 16,
    justifyContent: "center",
    marginBottom: "auto",
    flex: 1,
  },
  welcomeMessage: {
    color: blackA.blackA12,
  },
  water: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
