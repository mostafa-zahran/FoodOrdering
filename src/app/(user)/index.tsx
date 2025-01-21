import { Redirect } from "expo-router";
import { useAuth } from "@/src/providers/authProvider";

const TabIndex = () => {
    const { session, loading } = useAuth();
    if(!session) {
        return <Redirect href="/(auth)" />;
    }
    
    return <Redirect href="/(user)/menu/" />;
}
export default TabIndex;