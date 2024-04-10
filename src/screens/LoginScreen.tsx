import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
// import { UserAuthenticated } from '../interfaces';
// import { HeaderApp } from '../components/HeaderApp';
import { colors, globalStyles } from '../theme/styles';
import { StackScreenProps } from '@react-navigation/stack';
import { RootLoginStackParams } from '../navigators/StackNavigator';
import { InputIcon } from '../componentes/InputIcon';
import { Button } from '../componentes/Button';
import { HeaderApp } from '../componentes/HeaderApp';
import { useLogin } from '../hooks/useLogin';
import { Ionicons } from "@expo/vector-icons"
import { InputIconLogin } from '../componentes/InputIconLogin';
import { VentanaModal } from '../componentes/Alerta';
import { Icon } from '../componentes/Icon';

interface Props extends StackScreenProps<RootLoginStackParams, any> {
}

export const LoginScreen = ({ navigation }: Props) => {


    const {
        isChecador,
        isChofer,
        bordeChecador,
        bordeChofer,
        botonChofer,
        botonChecador,
        textChecador,
        textChofer,
        moodChecador,
        moodChofer,
    } = useLogin();


    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [modal, setModal] = useState(false);
    const [touchOutsideTimer, setTouchOutsideTimer] = useState<NodeJS.Timeout | null>(null);
    const [alertaYesChecador, setAlertYesChecador] = useState(false);
    const [alertaNoChecador, setAlertNoChecador] = useState(false);
    const [alertaYesCh, setAlertYesCh] = useState(false);
    const [alertaNoCh, setAlertNoCh] = useState(false);
    const [error, setError] = useState("")

    //#######  BOTON  #########

    const autenticarChecador = async () => {
        const { mensaje } = await authChecador(user, password).then(mens => {
            console.log(mens);
            return mens;
        })
        if (mensaje == "Usuario validado correctamente") {
            setAlertYesChecador(true);
            navigation.navigate('DrawerCh');
        } else {
            const mensajeMostrado = "El usuario Checador no existe";
            setError(mensajeMostrado)
            setAlertNoChecador(true)
        }

    }

    const autenticarChofer = async () => {
        const { mensaje2 } = await authChofer(user, password).then(mens => {
            console.log("soy el mensaje que llega del end point: ",mens);
            return mens;
        })
        console.log("soy el mensaje 2: ", mensaje2);
        
        if (mensaje2 == "Chofer validado correctamente") {
            setAlertYesCh(true);
            navigation.navigate('DrawerChofer', { usuario: user });
        } else {
            const mensajeMostrado = "El usuario Chofer no existe";
            setError(mensajeMostrado)
            setAlertNoCh(true)
            
        }

    }

    const autenticar = () => {
        if (!moodChecador && !moodChofer) {
            setModal(true);
        }
        if (moodChecador) {
            console.log("Es un checador");
            autenticarChecador();
            if (alertaYesChecador) {
                
            }
        }
        if (moodChofer) {
            console.log("Es un chofer");
            autenticarChofer();
            if (alertaYesCh) {
                
            }

        }

        console.log("El user es ", user);
        console.log("El password es ", password);
        setUser("");
        setPassword("");

    }

    const handleModalShow = () => {
        // Limpiar el temporizador si el modal se muestra correctamente
        if (touchOutsideTimer) {
            clearTimeout(touchOutsideTimer);
            setTouchOutsideTimer(null);
        }
    };

    //########  FUNCION  #######3

    async function authChecador(usuario: string, password: string) {
        const mensaje = await fetch("https://702b-159-54-132-73.ngrok-free.app/api/empleados/autenticacion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "usuario": usuario,
                "password": password
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

    async function authChofer(usuario: string, password: string) {
        const mensaje = await fetch("https://702b-159-54-132-73.ngrok-free.app/api/empleados/autenticacionChofer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "usuario": usuario,
                "contrasena": password
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

            <HeaderApp height={120} />
            <View style={globalStyles.container} >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >
                        <Image
                            source={require("../../assets/imgLogo.png")}
                            style={[styles.image, { marginTop: 10 }]}
                        />

                        <View style={{ marginTop: 10, flexDirection: 'row', gap: 50, justifyContent: "center" }} >

                            <Button
                                onPress={isChecador}
                                text='Checador'
                                colorBackground={botonChecador}
                                borde={{ borderWidth: 2, borderColor: bordeChecador }}
                                fontColor={textChecador}
                                altura={64} />
                            <Button
                                onPress={isChofer}
                                text='Chofer'
                                colorBackground={botonChofer}
                                borde={{ borderWidth: 2, borderColor: bordeChofer }}
                                fontColor={textChofer}
                                altura={64} />
                        </View>

                        <InputIconLogin
                            style={{ alignSelf: "center", marginTop: 40, backgroundColor: "white" }}
                            value={user}
                            onChangeText={setUser}
                            placeholder="Usuario"
                            iconName='person'
                        />

                        <InputIconLogin
                            style={{ alignSelf: "center", marginTop: 40, backgroundColor: "white" }}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Contraseña"
                            iconName="lock-closed"
                            security={true}
                        />
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: "center" }} >
                        <Button
                            style={{ width: 180, alignSelf: "center", marginRight: 6 }}
                            text="Aceptar"
                            colorBackground={colors.primary}
                            onPress={autenticar}
                            altura={64}
                            styleText={{fontSize:20}}
                        />
                        <Icon
                            nameIcon='volume-high-outline'
                            colorBackground='black'
                            size={60}
                        />
                        </View>
                        <VentanaModal
                            colorIcon={colors.primary}
                            colorBoton={colors.primary}
                            nameIcon="checkmark-circle"
                            visible={alertaYesChecador}
                            setVisible={setAlertYesChecador}
                            text="Auntenticación exitosa"

                        />

                        <VentanaModal
                            colorIcon="red"
                            colorBoton="red"
                            nameIcon="alert-circle"
                            visible={alertaNoChecador}
                            setVisible={setAlertNoChecador}
                            text={"Ocurrio un error al autenticar: " + error}
                        />

                        <VentanaModal
                            colorIcon={colors.primary}
                            colorBoton={colors.primary}
                            nameIcon="checkmark-circle"
                            visible={alertaYesCh}
                            setVisible={setAlertYesCh}
                            text="Auntenticación exitosa"

                        />

                        <VentanaModal
                            colorIcon="red"
                            colorBoton="red"
                            nameIcon="alert-circle"
                            visible={alertaNoCh}
                            setVisible={setAlertNoCh}
                            text={"Ocurrio un error al autenticar: " + error}
                        />

                        <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modal}
                                onRequestClose={() => setModal(false)}
                                onShow={handleModalShow}
                            >
                                <View style={styles.centeredView}>


                                    <View style={[styles.modalView, { flexDirection: 'column' }]}>
                                        <Ionicons style={{ fontSize: 60, color: "gold" }} name="warning" />
                                        <Text style={[styles.modalText, { textAlign: "justify" }]}>¡Elije si eres un Checador o un Chofer!</Text>

                                    </View>
                                </View>
                            </Modal>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
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
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20
    },
    modalContainer: {
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
    }
})
