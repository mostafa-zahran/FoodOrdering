import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/src/providers/authProvider";

const AuthStack = () => {
    const { session } = useAuth();
    if (session) { 
        return <Redirect href="/" />;
    }
    return (
    <Stack screenOptions={{ headerShown: false }}>
    </Stack>
    );
}

export default AuthStack;