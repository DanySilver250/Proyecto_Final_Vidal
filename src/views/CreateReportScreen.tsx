import { useState } from "react";
import { Image } from "react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as asyncStoragePreferences from "../services/asyncStoragePreferences";

export function CreateReportScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low" | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCreate = async () => {
    if (!title || !description) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    const email = await asyncStoragePreferences.getPreference("last_email");
    const existing = await asyncStoragePreferences.getPreference("reports");
    const reports = existing ? JSON.parse(existing) : [];

    const newReport = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      user: {
        name: email ?? "Test user",
      },
      createdAt: Date.now(),
    };

    reports.unshift(newReport);

    await asyncStoragePreferences.setPreference(
      "reports",
      JSON.stringify(reports)
    );

    Alert.alert("Success", "Report created successfully");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../assets/images/logo.jpg")}
        style={styles.logo}
      />

      <Text style={styles.header}>Create Report</Text>

      {/* Title */}
      <Text style={styles.label}>Title</Text>
      <TextInput
        placeholder="Enter title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      {/* Priority Dropdown */}
      <Text style={styles.label}>Priority</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text
          style={[
            styles.dropdownText,
            !priority && { color: "#9ca3af" } // gris cuando no hay selección
          ]}
        >
          {priority ? priority.toUpperCase() : "Select priority"}
        </Text>
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdownMenu}>
          {["high", "medium", "low"].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                setPriority(item as any);
                setShowDropdown(false);
              }}
            >
              <Text>{item.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Enter description"
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
          <Text style={styles.createText}>+ Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f1f5f9",
  },

  logo: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "#3b82f6",
  },

  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#374151",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  dropdown: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  dropdownText: {
    fontWeight: "600",
  },

  dropdownMenu: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  cancelBtn: {
    flex: 1,
    backgroundColor: "#e5e7eb",
    padding: 14,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },

  cancelText: {
    fontWeight: "600",
    color: "#374151",
  },

  createBtn: {
    flex: 1,
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  createText: {
    color: "#fff",
    fontWeight: "700",
  },
});