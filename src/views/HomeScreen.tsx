import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

import type { RootStackParamList } from "../models/navigation";
import type { Report } from "../models/report";
import { MOCK_REPORTS } from "../models/report.mockData";
import * as asyncStoragePreferences from "../services/asyncStoragePreferences";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const [reports, setReports] = useState<Report[]>([]);

  const loadReports = useCallback(async () => {
    const data = await asyncStoragePreferences.getPreference("reports");

    if (data) {
      const parsed = JSON.parse(data);

      const normalized = parsed.map((r: any) => ({
        ...r,
        user: r.user ?? { name: r.createdBy ?? "Unknown" },
        createdAt: r.createdAt ?? Date.now(),
      }));

      setReports(normalized);
    } else {
      setReports(MOCK_REPORTS);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadReports();
    }, [loadReports])
  );

  const totalReports = reports.length;
  const highPriority = reports.filter(r => r.priority === "high").length;

  const lastUpdate = reports.length
    ? Math.floor((Date.now() - reports[0].createdAt) / 60000)
    : 0;

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../assets/images/logo.jpg")}
        style={styles.logo}
      />

      <Text style={styles.header}>All reports</Text>

      {/* Summary */}
      <View style={styles.summaryBox}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryTitle}>High</Text>
          <Text style={styles.summaryValue}>{highPriority}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryTitle}>Total</Text>
          <Text style={styles.summaryValue}>{totalReports}</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryTitle}>Last (min)</Text>
          <Text style={styles.summaryValue}>{lastUpdate}</Text>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.priority}>{item.priority.toUpperCase()}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.user}>By: {item.user.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No reports yet</Text>}
      />

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("CreateReport")}
      >
        <Text style={styles.buttonText}>+ Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#e6eef5", // fondo suave
  },

  logo: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 55, // 👈 lo hace circular
    borderWidth: 2,
    borderColor: "#3b82f6",
  },

  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
  },

  summaryBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },

  summaryItem: {
    alignItems: "center",
  },

  summaryTitle: {
    fontSize: 12,
    color: "#555",
  },

  summaryValue: {
    fontSize: 18,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },

  priority: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2563eb",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  user: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },

  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    elevation: 3,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});