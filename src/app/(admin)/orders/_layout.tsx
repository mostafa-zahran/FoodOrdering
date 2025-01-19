import { Stack } from "expo-router";

const OrderStack = () => {
    return (
        <Stack >
            <Stack.Screen name="index" options={{ title: "orders" }}/>
        </Stack>
    );
}

export default OrderStack;