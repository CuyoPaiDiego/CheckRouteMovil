import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/LoginScreen";
import { DrawerChecador } from "./DrawerNavigator";


export type RootLoginStackParams = {
    LoginScreen: undefined;
    DrawerCh: undefined;
}

const Stack = createStackNavigator<RootLoginStackParams>();
export const StackNavigator = () => {

    return (
        <Stack.Navigator
        screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="DrawerCh" component={DrawerChecador}/>
        </Stack.Navigator>
    );
}