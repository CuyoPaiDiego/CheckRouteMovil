import { DrawerContentScrollView, DrawerItemList, DrawerNavigationProp, DrawerScreenProps, createDrawerNavigator } from '@react-navigation/drawer';
import { HomeChecador } from '../screens/HomeChecador';
import { colors, globalStyles } from '../theme/styles';
import { StyleSheet, Text, View } from 'react-native';
import { adaptViewConfig } from 'react-native-reanimated/lib/typescript/ConfigHelper';
import { Button } from '../componentes/Button';
import { InsertarSalidas } from '../screens/checador/InsertarSalidas';
import { StackScreenProps } from '@react-navigation/stack';
import { RootLoginStackParams } from './StackNavigator';
import { ContenidoDrawer } from '../componentes/ContenidoDrawerChecador';
import { ActualizarSalidas } from '../screens/checador/ActualizarSalidas';
import { EliminarSalidas } from '../screens/checador/EliminarSalidas';
import { InsertarLlegadas } from '../screens/checador/InsertarLlegadas';
import { VerLlegadasSalidas } from '../screens/checador/VerLlegadasSalidas';
import { InsertarMulta } from '../screens/checador/InsertarMulta';
import { ActualizarMulta } from '../screens/checador/ActualizarMulta';
import { EliminarMulta } from '../screens/checador/EliminarMulta';

export type RootDrawerChecadorNav = {
    Inicio: undefined;
    InsertarSalidas: undefined;
    ActualizarSalidas: undefined;
    EliminarSalidas: undefined;
    InsertarLlegadas: undefined;
    VerLlegadasSalidas: {numero:number};
    InsertarMulta:undefined;
    ActualizarMulta: undefined;
    EliminarMulta: undefined;
}

interface Props extends DrawerScreenProps<RootDrawerChecadorNav, any> {
}

const Drawer = createDrawerNavigator();
export function DrawerChecador() {
    return (
        <Drawer.Navigator
            backBehavior='initialRoute'
            drawerContent={(props) => <ContenidoDrawer drawerProps={props} />}
            screenOptions={{
                title: '',
                headerStyle: { backgroundColor: colors.primary, borderRadius: 8, borderWidth: 2, borderColor: "white" },

            }
            }
        >
            <Drawer.Screen name="Inicio" component={HomeChecador} />
            <Drawer.Screen options={{drawerActiveBackgroundColor:"white"}} name='InsertarSalidas' component={InsertarSalidas} />
            <Drawer.Screen options={{drawerActiveBackgroundColor:"white"}} name='ActualizarSalidas' component={ActualizarSalidas} />
            <Drawer.Screen options={{drawerActiveBackgroundColor:"white"}} name='EliminarSalidas' component={EliminarSalidas} />
            <Drawer.Screen options={{drawerActiveBackgroundColor:"white"}} name='InsertarLlegadas' component={InsertarLlegadas} />
            <Drawer.Screen options={{drawerActiveBackgroundColor:"white", unmountOnBlur:true}} name='VerLlegadasSalidas' component={VerLlegadasSalidas} />
            <Drawer.Screen options={{drawerActiveBackgroundColor:"white"}} name='InsertarMulta' component={InsertarMulta} />
            <Drawer.Screen options={{drawerActiveBackgroundColor:"white"}} name='EliminarMulta' component={EliminarMulta} />           
            <Drawer.Screen options={{drawerActiveBackgroundColor:"white", unmountOnBlur:true}} name='ActualizarMulta' component={ActualizarMulta} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    drawer: {
        backgroundColor: '#24B960',
        width: 240,
    },
    drawerHeader: {
        backgroundColor: '#24B960',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    drawerHeaderText: {
        fontSize: 24,
        color: "white",
        borderBottomWidth: 3,
        paddingRight: 50,
        paddingLeft: 50,
        borderColor: "white",
        fontWeight: 'bold',
    },
    drawerBody: {

    },
    drawerBoton: {

    },

});