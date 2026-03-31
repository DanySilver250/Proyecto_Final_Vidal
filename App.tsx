import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

import type { RootStackParamList } from "./src/models/navigation";  
import { HomeScreen } from "./src/views/HomeScreen";
//import { ReportsScreen } from "./src/views/ReportsScreen";
import { CreateReportScreen } from "./src/views/CreateReportScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Inicio" }} />
        {/* <Stack.Screen name="Reports" component={ReportsScreen} options={{ title: "Reportes" }} /> */}
        <Stack.Screen name="CreateReport" component={CreateReportScreen} options={{ title: "Crear Reporte" }} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});