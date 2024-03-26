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
import { LlegadasResponse } from "../../interfaces/LlegadasResponse";
import { ButtonIcon } from "../../componentes/ButtonIcon";


interface Props extends DrawerScreenProps<RootDrawerChecadorNav, any> {
}

interface Llegadas {
    idUnidad: number;
    horaSalida: string;
    horaLlegada: string;
}

export const VerLlegadasSalidas = ({route}: Props) => {
    const [llegadasSalidas, setLlegadasSalidas] = useState<Llegadas[][]>();
    const dataHead = ["Unidad", "Hora salida", "Hora llegada"];
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);
    const [intento, setIntento] = useState(0);
    const {params} = route
    const num = params!.numero;
    let contador = 0;

    //Cargar Horarios
    const obtenerRegistros = async () => {
        try {
            const response = await registros();
            console.log("soy el response", response);

            const data = (await response) as LlegadasResponse[];
            const matriz = data.map(hora => {
                const aux = hora as any;
                return [aux.idUnidad, aux.horaSalida, aux.horaLlegada]
            })
            setLlegadasSalidas(matriz);
            console.log(matriz);



        } catch (error) {
            console.error("Error al obtener registros:", error);

        }
    };


    

    useEffect(() => {
        obtenerRegistros()
            .catch(()=>{
                setError(true);
                console.log(intento);
                setIntento(intento + 1);
            }).finally(()=>{
                 setCargando(false);
         })
    }, [intento])

    return (
        <View style={{ flex: 1 }} >

            <HeaderApp logo height={160} />
            <View style={globalStyles.container} >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >


                        <View style={{ marginTop: 10, flexDirection: 'row', gap: 50, justifyContent: "center" }} >

                            <Text style={[styles.textStyleBienvenido, { fontSize: 32 }]}>
                                ¡Ver Salidas y Llegadas!
                            </Text>
                        </View>

                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: "center" }} >
                            {(!cargando) ? (
                            (!error) ? (
                                <Table style={styles.customTable}>
                                <Row style={styles.tableHeader}
                                    data={dataHead}
                                    textStyle={styles.textoColumn}
                                />
                                <Rows style={styles.tableCell}
                                    data={llegadasSalidas}
                                    textStyle={styles.textoRow}
                                />
                                
                            </Table>
                            ) : (
                                <View>
                                <ActivityIndicator 
                                    color={colors.primary}
                                    size={80}/>
                                <Text style={styles.textStyle}>No hay internet</Text>
                                </View>
                             )
                            
                            ) : (
                                <View>
                                <ActivityIndicator 
                                    color={colors.primary}
                                    size={80}/>
                                </View>
                            )}

                        </View>

                        

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

//########  FUNCION  #######


async function registros() {
    const mensaje = await fetch('https://702b-159-54-132-73.ngrok-free.app/api/registros/consultarRegistrosHoy', {
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
        })

    return mensaje;
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
