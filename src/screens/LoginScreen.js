import { Button, Text, TextInput, View } from 'react-native';
import { useLogin } from "../hooks/useLogin";
import { login } from "../services/login";

export default function LoginScreen() {
    const { email, setEmail, password, setPassword, handleLoginBtn } = useLogin();
    

    const probarLogin = async () => {
        if (!handleLoginBtn()) return;
        const respuesta = await login(email, password);
        if (respuesta.token) {
            alert("Entraste 👍");
        } else {
            alert("Error 👎");
        }
    };

    return (
        <View style={{ marginTop: 50 }}>
            <Text>Login Screen</Text>
            <TextInput
                style={{ borderRadius:8, borderWidth:2, borderColor:"black" }}
                onChangeText={setEmail}
                placeholder="Email"
                value={email || ""}
            />
            <TextInput
                style={{ borderRadius:8, borderWidth:2, borderColor:"black" }}
                placeholder="Password"
                onChangeText={setPassword}
                value={password || ""}
                secureTextEntry={true}
            />
            <Button title="Probar login" onPress={probarLogin} />
        </View>
    );
}