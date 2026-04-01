import { Button, Text, TextInput, View } from "react-native";
import { useRegister } from "../hooks/useRegister";

export default function SignUpScreen() {
    const { name, setName, lastname, setLastname, email, setEmail, password, setPassword, role, setRole, handleRegisterBtn } = useRegister();

    return (
        <View style={{ marginTop: 50, padding: 50 }}>
            <Text>Sign Up Screen</Text>
            <TextInput placeholder="Name" onChangeText={setName} value={name} style={{ borderRadius: 8, borderWidth: 2, borderColor: "black" }} />
            <TextInput placeholder="Last Name" onChangeText={setLastname} value={lastname} style={{ borderRadius: 8, borderWidth: 2, borderColor: "black" }} />
            <TextInput placeholder="Email" onChangeText={setEmail} value={email} style={{ borderRadius: 8, borderWidth: 2, borderColor: "black" }} />
            <TextInput placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry style={{ borderRadius: 8, borderWidth: 2, borderColor: "black" }} />
            <TextInput placeholder="Role" onChangeText={setRole} value={role} style={{ borderRadius: 8, borderWidth: 2, borderColor: "black" }} />
            <Button title="Registro" onPress={handleRegisterBtn} />
        </View>
    );
}