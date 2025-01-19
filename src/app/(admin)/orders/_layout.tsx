import { Stack } from "expo-router";

const OrderStack = () => {
    return (
        <Stack >
            <Stack.Screen name="list" options={{ headerShown: false }}/>
        </Stack>
    );
}

export default OrderStack;