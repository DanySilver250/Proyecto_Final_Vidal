import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";

export function CreateReportScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!title || !description) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    Alert.alert("Éxito", "Reporte creado correctamente");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva incidencia</Text>

      <TextInput
        placeholder="Título"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Descripción"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <PrimaryButton label="Guardar" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});