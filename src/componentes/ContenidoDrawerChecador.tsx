import { DrawerContentComponentProps, DrawerContentScrollView, DrawerScreenProps } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import { RootDrawerChecadorNav } from "../navigators/DrawerNavigator";
import { Button } from "./Button";

interface Props {
    drawerProps: DrawerContentComponentProps;

}


export const ContenidoDrawer = ({ drawerProps }: Props) => {
    const { navigation } = drawerProps;
    return (
        <DrawerContentScrollView style={{ backgroundColor: "#24B960" }}>
            <View style={{ flex: 1 }}>
                <View style={styles.drawerHeader}>
                    <Text style={styles.drawerHeaderText}>Salidas</Text>
                </View>
                <View >
                    <Button altura={45} style={{ marginHorizontal: 8, padding: 3, marginBottom:10 }} colorBackground="white" styleText={{ fontSize: 20 }} fontColor="green" onPress={() => navigation.navigate("InsertarSalidas")} text="Insertar salida" />
                    <Button altura={45} style={{ marginHorizontal: 8, padding: 3, marginBottom:10 }} colorBackground="white" styleText={{ fontSize: 20 }} fontColor="green" onPress={() => navigation.navigate("ActualizarSalidas")} text="Actualizar salida" />
                    <Button altura={45} style={{ marginHorizontal: 8, padding: 3, marginBottom:10 }} colorBackground="white" styleText={{ fontSize: 20 }} fontColor="green" onPress={() => navigation.navigate("EliminarSalidas")} text="Eliminar salida" />
                    
                </View>
                <View style={styles.drawerHeader}>
                    <Text style={styles.drawerHeaderText}>Llegadas</Text>
                </View>
                <View >
                    <Button altura={45} style={{ marginHorizontal: 8, padding: 3, marginBottom:10 }} colorBackground="white" styleText={{ fontSize: 20 }} fontColor="green" onPress={() => navigation.navigate("InsertarSalidas")} text="Insertar llegada" />
                    <Button altura={45} style={{ marginHorizontal: 8, padding: 3, marginBottom:10 }} colorBackground="white" styleText={{ fontSize: 20 }} fontColor="green" onPress={() => navigation.navigate("ActualizarSalidas")} text="Actualizar llegada" />
                    <Button altura={45} style={{ marginHorizontal: 8, padding: 3, marginBottom:10 }} colorBackground="white" styleText={{ fontSize: 20 }} fontColor="green" onPress={() => navigation.navigate("EliminarSalidas")} text="Ver salidas/llegadas" />
                    
                </View>
                <View style={styles.drawerHeader}>
                    <Text style={styles.drawerHeaderText}>Multas</Text>
                </View>
                <View >
                    <Button altura={45} style={{ marginHorizontal: 8, padding: 3, marginBottom:10 }} colorBackground="white" styleText={{ fontSize: 20 }} fontColor="green" onPress={() => navigation.navigate("InsertarSalidas")} text="Insertar multa" />
                    <Button altura={45} style={{ marginHorizontal: 8, padding: 3, marginBottom:10 }} colorBackground="white" styleText={{ fontSize: 20 }} fontColor="green" onPress={() => navigation.navigate("ActualizarSalidas")} text="Actualizar multa" />
                    <Button altura={45} style={{ marginHorizontal: 8, padding: 3, marginBottom:10 }} colorBackground="white" styleText={{ fontSize: 20 }} fontColor="green" onPress={() => navigation.navigate("EliminarSalidas")} text="Eliminar multa" />
                    
                </View>
                <View style={styles.drawerHeader}>
                    <Text style={styles.drawerHeaderText}>Cerrar sesión</Text>
                </View>
                <View >
                    <Button altura={45} style={{ marginHorizontal: 8, padding: 3, marginBottom:10 }} colorBackground="red" styleText={{ fontSize: 20 }} fontColor="white" onPress={() => navigation.navigate("InsertarSalidas")} text="Salir" />
                           
                </View>
                

            </View>
        </DrawerContentScrollView>
    );
};


const styles = StyleSheet.create({
    drawer: {
        backgroundColor: '#24B960',
        width: 240,
    },
    drawerHeader: {
        backgroundColor: '#24B960',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    drawerHeaderText: {
        fontSize: 30,
        color: "white",
        borderBottomWidth: 3,
        paddingRight: 50,
        paddingLeft: 7,
        width: 280,
        borderColor: "white",
        fontWeight: 'bold',
        textAlign: "left"
    },
    drawerBody: {
        fontSize: 50,
    },
    drawerBoton: {

    },

});