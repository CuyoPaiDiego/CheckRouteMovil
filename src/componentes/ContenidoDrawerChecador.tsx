import { DrawerContentComponentProps, DrawerContentScrollView, DrawerScreenProps } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import { RootDrawerChecadorNav } from "../navigators/DrawerNavigator";
import { Button } from "./Button";

interface Props {
    drawerProps: DrawerContentComponentProps;
    
}


export const ContenidoDrawer = ({ drawerProps }: Props) => {
    const { navigation, state } = drawerProps;
    const { index } = state
    return (
        <DrawerContentScrollView style={{ backgroundColor: "#24B960" }}>
            <View style={{ flex: 1 }}>
                <View style={styles.drawerHeader}>
                    <Text style={styles.drawerHeaderText}>Salidas</Text>
                </View>
                <View >
                    <Button
                        altura={45}
                        style={styles.contenedorBoton}
                        colorBackground="white"
                        styleText={styles.tamañoTextoBoton}
                        fontColor="green"
                        onPress={() => navigation.navigate("InsertarSalidas")}
                        text="Insertar salida"
                    />
                    <Button 
                        altura={45} 
                        style={styles.contenedorBoton}
                        colorBackground="white" 
                        styleText={styles.tamañoTextoBoton} 
                        fontColor="green" 
                        onPress={() => navigation.navigate("ActualizarSalidas")} 
                        text="Actualizar salida" 
                    />
                    <Button 
                        altura={45} 
                        style={styles.contenedorBoton} 
                        colorBackground="white" 
                        styleText={styles.tamañoTextoBoton} 
                        fontColor="green" 
                        onPress={() => navigation.navigate("EliminarSalidas")} 
                        text="Eliminar salida" 
                    />

                </View>
                <View style={styles.drawerHeader}>
                    <Text style={styles.drawerHeaderText}>Llegadas</Text>
                </View>
                <View >
                    <Button 
                        altura={45} 
                        style={styles.contenedorBoton} 
                        colorBackground="white" 
                        styleText={styles.tamañoTextoBoton} 
                        fontColor="green" 
                        onPress={() => navigation.navigate("InsertarLlegadas")} 
                        text="Insertar llegada" 
                    />
                    {/* <Button 
                        altura={45} 
                        style={styles.contenedorBoton} 
                        colorBackground="white" 
                        styleText={styles.tamañoTextoBoton} 
                        fontColor="green" 
                        onPress={() => navigation.navigate("ActualizarLlegadas")} 
                        text="Eliminar llegada" 
                    /> */}
                    <Button 
                        altura={45} 
                        style={styles.contenedorBoton} 
                        colorBackground="white" 
                        styleText={styles.tamañoTextoBoton} 
                        fontColor="green" 
                        onPress={() => navigation.navigate("VerLlegadasSalidas")} 
                        text="Ver salidas/llegadas" 
                    />

                </View>
                <View style={styles.drawerHeader}>
                    <Text style={styles.drawerHeaderText}>Multas</Text>
                </View>
                <View >
                    <Button 
                        altura={45} 
                        style={styles.contenedorBoton} 
                        colorBackground="white" 
                        styleText={styles.tamañoTextoBoton} 
                        fontColor="green" 
                        onPress={() => navigation.navigate("InsertarMulta")} 
                        text="Insertar multa" 
                    />
                    <Button 
                        altura={45} 
                        style={styles.contenedorBoton} 
                        colorBackground="white" 
                        styleText={styles.tamañoTextoBoton} 
                        fontColor="green" 
                        onPress={() => navigation.navigate("ActualizarMulta")} 
                        text="Actualizar multa" 
                    />
                    <Button 
                        altura={45} 
                        style={styles.contenedorBoton} 
                        colorBackground="white" 
                        styleText={styles.tamañoTextoBoton} 
                        fontColor="green" 
                        onPress={() => navigation.navigate("EliminarMulta")} 
                        text="Eliminar multa" 
                    />

                </View>
                <View style={styles.drawerHeader}>
                    <Text style={styles.drawerHeaderText}>Cerrar sesión</Text>
                </View>
                <View >
                    <Button 
                        altura={45} 
                        style={styles.contenedorBoton} 
                        colorBackground="red" 
                        styleText={styles.tamañoTextoBoton} 
                        fontColor="white" 
                        onPress={() => navigation.navigate("LoginScreen")} 
                        text="Salir" 
                    />
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
    contenedorBoton: {
        marginHorizontal: 8,
        padding: 3,
        marginBottom: 10
    },
    tamañoTextoBoton: {
        fontSize: 20
    }

});