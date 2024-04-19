import { ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { HeaderApp } from "../../componentes/HeaderApp";
import { InputIcon } from "../../componentes/InputIcon";
import { Button } from "../../componentes/Button";
import { colors, globalStyles } from "../../theme/styles";
import { VentanaModal } from "../../componentes/Alerta";
import { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootLoginStackParams } from "../../navigators/StackNavigator";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { HorariosResponse } from "../../interfaces/HorariosResponse";
import { Icon } from "../../componentes/Icon";

interface Props extends StackScreenProps<RootLoginStackParams, any> {
}

interface Horarios {
    idhorarios: number;
    horaSalida: string;
    horaLlegada: string;
    ruta: string;
}

export const HorariosCh = ({ navigation, route }: Props) => {
    const [horarios, setHorarios] = useState<Horarios[][]>();
    const dataHead = ["Hora salida", "Hora llegada", "Ruta"];
    const [cargando, setCargando] = useState(true);
    const { params } = route;
    const usuario = params!.usuario;


    //Cargar Horarios
    const obtenerHorarios = async () => {
        try {
            const response = await horario(usuario);
            console.log("soy el response", response);

            const data = (await response) as HorariosResponse[];
            const matriz = data.map(hora => {
                const aux = hora as any;
                return [aux.horaLlegada, aux.horaSalida, aux.ruta]
            })
            setHorarios(matriz);
            console.log(matriz);
        } catch (error) {
            console.error("Error al obtener horarios:", error);

        }
    };

    useEffect(() => {
        obtenerHorarios()
            .then(() => {
                setCargando(false);
            })
    }, [])

    return (
        <View style={{ flex: 1 }} >
            <View style={globalStyles.container} >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >
                        <HeaderApp logo height={160} />
                        <View style={{ marginTop: 10, flexDirection: 'row', gap: 50, justifyContent: "center" }} >
                            <Text style={[styles.textStyleBienvenido, { fontSize: 40 }]}>
                                ¡Mi Horario!
                            </Text>
                        </View>
                        <View style={{ marginTop: 10, flexDirection: 'column', justifyContent: "center" }} >
                            {(!cargando) ? (<Table style={styles.customTable}>
                                <Row style={styles.tableHeader}
                                    data={dataHead}
                                    textStyle={styles.textoColumn}
                                />
                                <Rows style={styles.tableCell}
                                    data={horarios}
                                    textStyle={styles.textoRow}
                                />
                            </Table>) : (
                                <ActivityIndicator color={colors.backgroundPrimary}

                                />
                            )}
                        </View>


                        <View style={{ marginTop: 50, flexDirection: 'column', justifyContent: "center" }}>




                            <Button
                                style={{ width: 240, alignSelf: "center", marginTop: 30 }}
                                text="Cerrar sesión"
                                colorBackground={"red"}
                                fontColor="white"
                                altura={60}
                                onPress={() => (navigation.navigate("LoginScreen"))}
                                styleText= {{fontSize:20}}
                            />

                            <Icon
                                nameIcon='volume-high-outline'
                                colorBackground='black'
                                size={60}
                                style={{ marginTop: 10, marginBottom: 10, alignSelf: "center" }}
                                width={80}
                            />

                            {/* <VentanaModal
                                colorIcon={colors.primary}
                                colorBoton={colors.primary}
                                nameIcon="checkmark-circle"
                                visible={alertaYes}
                                setVisible={setAlertYes}
                                text="Multa insertada correctamente"

                            /> */}





                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>
    )

    //########  FUNCION  #######3


    async function horario(user: string) {
        const mensaje = await fetch('https://702b-159-54-132-73.ngrok-free.app/api/horarios/consultar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "chofer": user
            })
        }).then(res => {
            return res.json();

        }).then(resolve => {
            console.log("Error de funcion: " + resolve);
            return resolve;
        })
            .catch(a => {
                console.log(a);
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
        fontWeight: "700"
    }
})