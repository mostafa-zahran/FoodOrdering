import { withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
const OrderListNavigator = () => {
    const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

    return (
        <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: 'white' }}>
            <TopTabs>
                <TopTabs.Screen name="index" options={{title: 'active'}} />
            </TopTabs>
        </SafeAreaView>
    );
}

export default OrderListNavigator;