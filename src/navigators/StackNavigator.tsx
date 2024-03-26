import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/LoginScreen";
import { DrawerChecador } from "./DrawerNavigator";
import { HorariosCh } from "../screens/chofer/Horarios";


export type RootLoginStackParams = {
    LoginScreen: undefined;
    DrawerCh: undefined;
    DrawerChofer: {usuario:string};
}

const Stack = createStackNavigator<RootLoginStackParams>();
export const StackNavigator = () => {

    return (
        <Stack.Navigator
        
        screenOptions={{headerShown: false}}>
            <Stack.Screen options={{ gestureEnabled: false }} name="LoginScreen" component={LoginScreen} />
            <Stack.Screen options={{ gestureEnabled: false }} name="DrawerCh" component={DrawerChecador}/>
            <Stack.Screen options={{ gestureEnabled: false }} name="DrawerChofer" component={HorariosCh}/>
        </Stack.Navigator>
    );
}