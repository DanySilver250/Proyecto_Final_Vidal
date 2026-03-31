import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import type { RootStackParamList } from "../models/navigation";
import { PrimaryButton } from "../components/PrimaryButton";
import * as asyncStoragePreferences from "../services/asyncStoragePreferences";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  //const viewModel = useMemo(() => new LoginViewModel(), []);
  const [email, setEmail] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const savedEmail = await asyncStoragePreferences.getPreference("last_email");
    setEmail(savedEmail);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SafeWork</Text>

      <Text style={styles.subtitle}>
        Bienvenida {email ?? "Usuario"}
      </Text>

      <PrimaryButton
        label="Reportar incidencia"
        onPress={() => navigation.navigate("CreateReport")}
      />

      <View style={styles.gap} />

      <PrimaryButton
        label="Ver incidencias"
        onPress={() => navigation.navigate("Reports")}
      />

      <View style={styles.gap} />

      <PrimaryButton
        label="Cerrar sesión"
        onPress={async () => {
          //await viewModel.clearSession();
          navigation.replace("Login"); // 👈 mejor que navigate
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  gap: {
    height: 12,
  },
});
