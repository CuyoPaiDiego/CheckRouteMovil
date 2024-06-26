import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerChecadorNav } from "../../navigators/DrawerNavigator";
import { Image, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { HeaderApp } from "../../componentes/HeaderApp";
import { ScrollView } from "react-native-gesture-handler";
import { colors, globalStyles } from "../../theme/styles";
import { Button } from "../../componentes/Button";
import { InputIcon } from "../../componentes/InputIcon";
import { useState } from "react";
import { VentanaModal } from "../../componentes/Alerta";
import { Icon } from "../../componentes/Icon";


interface Props extends DrawerScreenProps<RootDrawerChecadorNav, any> {
}

export const EliminarSalidas = () => {
    const [numeroEliminarSalidaUnidad, setNumeroEliminarSalidaUnidad] = useState("");
    const [alertaYes, setAlertYes] = useState(false);
    const [alertaNo, setAlertNo] = useState(false);
    const [error, setError] = useState("")
    const ruta = "https://8681-159-54-132-73.ngrok-free.app";

    //#######  BOTON#########

    const botonEliminarSalidas = async () => {
        const { mensaje } = await eliminarSalida(numeroEliminarSalidaUnidad).then(mens => {
            console.log(mens);
            return mens;
        })
        setNumeroEliminarSalidaUnidad
        if (mensaje == "Registro eliminado correctamente") {
            setAlertYes(true);
        } else {
            const mensajeMostrado = "No se pudo ingresar la salida de la unidad. " + mensaje;
            setError(mensajeMostrado)
            setAlertNo(true)
        }
        setNumeroEliminarSalidaUnidad("")
    }

    //########  FUNCION  #######3

    async function eliminarSalida(idUnidad: string) {
        const mensaje = await fetch("https://702b-159-54-132-73.ngrok-free.app/api/registros/eliminarRegistro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "idUnidad": idUnidad
            })
        }).then(res => {

            return res.json();


        }).then(resolve => {
            console.log("error de funcion: " + resolve);
            return resolve;
        }).catch(e => {
            console.log("error del catch " + e);

        })
        return mensaje;
    }

    return (
        <View style={{ flex: 1 }} >
            <View style={globalStyles.container} >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >
                        <HeaderApp logo height={160} />



                        <View style={{ marginTop: 10, flexDirection: 'row', gap: 50, justifyContent: "center" }} >

                            <Text style={[styles.textStyleBienvenido, { fontSize: 40 }]}>
                                ¡Eliminar Salida!
                            </Text>
                        </View>

                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: "center" }} >

                            <Text style={[styles.textStyle2]}>
                                "Por favor complete los campos para Eliminar una salida"
                            </Text>
                        </View>

                        <View style={{ marginTop: 50, flexDirection: 'column', justifyContent: "center" }}>
                            <Text style={[styles.textStyle]}>
                                Inserta el número de la unidad para eliminar su salida:
                            </Text>

                            <InputIcon iconName="car-sharp"
                                style={{ alignSelf: "center", backgroundColor: 'white', marginTop: 20 }}
                                value={numeroEliminarSalidaUnidad}
                                onChangeText={setNumeroEliminarSalidaUnidad}
                                placeholder="Número de unidad" />

                            <Button
                                style={{ width: 240, alignSelf: "center", marginTop: 30 }}
                                text="Eliminar Salida"
                                colorBackground={colors.primary}
                                fontColor="white"
                                altura={60}
                                onPress={botonEliminarSalidas}
                                styleText={{fontSize:20}}
                                />
    
                                <Icon
                                    nameIcon='volume-high-outline'
                                    colorBackground='black'
                                    size={60}
                                    style={{ marginTop: 10, alignSelf: "center" }}
                                    width={80}
                                />
                            <VentanaModal
                                colorIcon={colors.primary}
                                colorBoton={colors.primary}
                                nameIcon="checkmark-circle"
                                visible={alertaYes}
                                setVisible={setAlertYes}
                                text="Salida eliminada correctamente"

                            />

                            <VentanaModal
                                colorIcon="red"
                                colorBoton="red"
                                nameIcon="alert-circle"
                                visible={alertaNo}
                                setVisible={setAlertNo}
                                text={"Ocurrio un error: " + error}

                            />
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 160,
        height: 160,
        borderRadius: 30,
        alignSelf: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: 'blue',
        width: 100,
        height: 70
    },
    buttonInclusivo: {
        backgroundColor: 'red',
        width: 180,
        height: 120
    },
    textStyleBienvenido: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: 4,
        borderColor: "black",
        borderRadius: 12,
        backgroundColor: "white",
        padding: 5
    },
    textStyle: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        fontStyle: "italic"
    },
    textStyle2: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'justify',
        fontSize: 20,
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        fontStyle: "italic"
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})