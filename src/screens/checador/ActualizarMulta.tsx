import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerChecadorNav } from "../../navigators/DrawerNavigator";
import { ActivityIndicator, Image, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { HeaderApp } from "../../componentes/HeaderApp";
import { ScrollView } from "react-native-gesture-handler";
import { colors, globalStyles } from "../../theme/styles";
import { Button } from "../../componentes/Button";
import { InputIcon } from "../../componentes/InputIcon";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { useEffect, useState } from "react";
import { MultasResponse } from "../../interfaces/MultasResponse";
import { ItemType } from "react-native-dropdown-picker";
import { DropBox } from "../../componentes/Drop";
import { VentanaModal } from "../../componentes/Alerta";
import { Icon } from "../../componentes/Icon";

interface Props extends DrawerScreenProps<RootDrawerChecadorNav, any> {
}

interface Multas {
    unidad: number;
    fecha: string;
    estadoMulta: string;
}

export const ActualizarMulta = () => {
    const [numeroUnidadInsertarMulta, setNumeroUnidadInsertarMulta] = useState("");
    const [estadoMulta, setEstadoMulta] = useState("");
    const [alertaYes, setAlertYes] = useState(false);
    const [alertaNo, setAlertNo] = useState(false);
    const [error2, setError2] = useState("")
    const [multas, setMultas] = useState<Multas[][]>();
    const dataHead = ["ID de multa", "Unidad", "Fecha"];
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    let [intento, setIntento] = useState(0);
    const [estado, setEstados] = useState<ItemType<string>>({ label: '', value: '' });
    const [selectedValue, setSelectedValue] = useState("");
    const estados = [
        { label: 'Pagada', value: 'Pagada' },
        { label: 'Cancelada', value: 'Cancelada' }
    ];




    //Cargar Multas
    const obtenerMultas = async () => {
        try {
            const response = await multa();
            console.log("soy el response huhu", response);

            const data = (await response) as MultasResponse[];
            const matriz = data.map(multa => {
                const aux = multa as any;
                return [aux.idmultas, aux.unidad, aux.fecha]
            })
            setMultas(matriz);
            console.log(matriz);
        } catch (error) {
            console.error("Error al obtener multas:", error);

        }
    };

    //#######  BOTON  #########

    const botonActualizarMulta = async () => {
        intento = intento + 1;
        const { mensaje } = await updateMulta(numeroUnidadInsertarMulta, selectedValue).then(mens => {
            console.log("Este es el id de unidad: ", numeroUnidadInsertarMulta);
            console.log("Este es el estado de la unidad: ", selectedValue);


            return mens;
        })
        setNumeroUnidadInsertarMulta("");
        if (mensaje == "Multa actualizada correctamente") {

            setAlertYes(true);

        } else {
            const mensajeMostrado = "No se pudo ingresar la multa. " + mensaje;
            setError2(mensajeMostrado)
            setAlertNo(true)
        }
        console.log("soy el con: ", intento);

        setIntento(intento);
    }

    useEffect(() => {
        obtenerMultas()
            .catch(() => {
                setError(true);
                console.log(intento);
                setIntento(intento + 1);
            }).finally(() => {
                setCargando(false);
            })
    }, [intento])

    return (
        <View style={{ flex: 1 }} >
            <View style={globalStyles.container} >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >
                        <HeaderApp logo height={160} />



                        <View style={{ marginTop: 5, flexDirection: 'row', gap: 50, justifyContent: "center" }} >

                            <Text style={[styles.textStyleBienvenido, { fontSize: 40 }]}>
                                ¡Actualizar Multa!
                            </Text>
                        </View>

                        <View style={{ marginTop: 0, flexDirection: 'row', justifyContent: "center" }} >

                            <Text style={[styles.textStyle2]}>
                                "Multas pendientes"
                            </Text>
                        </View>

                        <View style={{ marginTop: 0, flexDirection: 'row', justifyContent: "center" }} >
                            {(!cargando) ? (
                                (!error) ? (
                                    <Table style={styles.customTable}>
                                        <Row style={styles.tableHeader}
                                            data={dataHead}
                                            textStyle={styles.textoColumn}
                                        />
                                        <Rows style={styles.tableCell}
                                            data={multas}
                                            textStyle={styles.textoRow}
                                        />

                                    </Table>
                                ) : (
                                    <View>
                                        <ActivityIndicator
                                            color={colors.primary}
                                            size={80} />
                                        <Text style={styles.textStyle}>No hay internet</Text>
                                    </View>
                                )

                            ) : (
                                <View>
                                    <ActivityIndicator
                                        color={colors.primary}
                                        size={80} />
                                </View>
                            )}

                        </View>



                        <View style={{ marginTop: 10, flexDirection: 'column', justifyContent: "center" }}>
                            <Text style={[styles.textStyle]}>
                                Inserta el ID de la multa para actualizar:
                            </Text>

                            <InputIcon iconName="car-sharp"
                                style={{ alignSelf: "center", backgroundColor: 'white', marginTop: 10 }}
                                value={numeroUnidadInsertarMulta}
                                onChangeText={setNumeroUnidadInsertarMulta}
                                placeholder="ID de multa" />

                            <DropBox
                                style={{ marginTop: 5 }}
                                texto="Estado:"
                                getValue={setEstados}
                                values={estados}
                                valor={(value: string) => setSelectedValue(value)}
                            />

                            <Button
                                style={{ width: 240, alignSelf: "center", marginTop: 10 }}
                                text="Actualizar Multa"
                                colorBackground={colors.primary}
                                fontColor="white"
                                altura={60}
                                onPress={botonActualizarMulta}
                                styleText={{ fontSize: 20 }}
                            />

                            <Icon
                                nameIcon='volume-high-outline'
                                colorBackground='black'
                                size={60}
                                style={{ marginTop: 10, marginBottom:10, alignSelf: "center" }}
                                width={80}
                            />
                            <VentanaModal
                                colorIcon={colors.primary}
                                colorBoton={colors.primary}
                                nameIcon="checkmark-circle"
                                visible={alertaYes}
                                setVisible={setAlertYes}
                                text="Multa actulizada correctamente"
                            />

                            <VentanaModal
                                colorIcon="red"
                                colorBoton="red"
                                nameIcon="alert-circle"
                                visible={alertaNo}
                                setVisible={setAlertNo}
                                text={"Ocurrio un error: " + error2}
                            />

                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>
    )

    //Funciones
    async function multa() {
        const mensaje = await fetch('https://702b-159-54-132-73.ngrok-free.app/api/multas/consultarMultas', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            return res.json();

        }).then(resolve => {
            console.log("Error de funcion: " + resolve);
            return resolve;
        })
            .catch(a => {
                console.log("soy a: ", a);
                return a;
            })

        return mensaje;
    }

    async function updateMulta(idMulta: string, state: string) {
        const mensaje = await fetch("https://702b-159-54-132-73.ngrok-free.app/api/multas/actualizarMulta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "idmultas": idMulta,
                "estadoMulta": state
            })
        }).then(res => {
            console.log(res);
            return res.json();
        }).then(resolve => {
            console.log("error de funcion: " + resolve);
            console.log(resolve);

            return resolve;
        }).catch(e => {
            console.log("Error del catch " + e);

        })
        return mensaje;
    }

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
    customTable: {
        marginLeft: 5,
        width: '97%'
    },
    tableHeader: {
        backgroundColor: colors.primary,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'left',
        borderColor: colors.backgroundPrimary,
        borderWidth: 4,
        padding: 4
    },
    tableCell: {
        borderColor: colors.primary,
        borderWidth: 2,
        fontSize: 10,
        color: colors.backgroundPrimary,
        padding: 4,
    },
    textoColumn: {
        fontSize: 20,
        fontWeight: "700",
        color: "white"
    },
    textoRow: {
        fontSize: 15,
        color: "black",
        fontWeight: "700"
    }
})