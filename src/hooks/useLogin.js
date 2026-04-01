import { useState } from "react";
import validate from "../helpers/regex";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginBtn = async () => {
        const data = {
            email: email,
            password: password
        }
        if (email.trim() === "" || password.trim() === "") {
            alert("LLena el campo indicado"); 
            return false;
        }


        if (!validate("email", email)) {
            alert("Correo inválido");
            return false;
        }

        if (!validate("password", password)) {
            alert("La contraseña debe tener mayúscula, minúscula, número y mínimo 8 caracteres");
            return false;
        }
                const response = await api.post('/login', data);
        
        return true;
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleLoginBtn
    }
}