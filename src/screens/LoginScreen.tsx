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

    const autenticar = () => {
        if (moodChecador) {
            console.log("Es un checador");
            navigation.navigate('DrawerCh');
        }
        if (moodChofer) {
            console.log("Es un chofer");

        }
        if (!moodChecador && !moodChofer) {
            setModal(true);
        }
        console.log("El user es ", user);
        console.log("El password es ", password);


    }

    const handleModalShow = () => {
        // Limpiar el temporizador si el modal se muestra correctamente
        if (touchOutsideTimer) {
            clearTimeout(touchOutsideTimer);
            setTouchOutsideTimer(null);
        }
    };
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
                                altura={64}/>
                            <Button
                                onPress={isChofer}
                                text='Chofer'
                                colorBackground={botonChofer}
                                borde={{ borderWidth: 2, borderColor: bordeChofer }}
                                fontColor={textChofer} 
                                altura={64}/>
                        </View>

                        <InputIcon
                            style={{ alignSelf: "center", marginTop: 40, backgroundColor: "white" }}
                            onChangeText={value => setUser(value)}
                            placeholder="Matricula"
                            iconName='person'
                        />

                        <InputIcon
                            style={{ alignSelf: "center", marginTop: 40, backgroundColor: "white" }}
                            onChangeText={value => setPassword(value)}
                            placeholder="Contraseña"
                            iconName="lock-closed"
                            security={true}
                        />

                        <Button
                            style={{ width: 180, alignSelf: "center", marginTop: 60 }}
                            text="Aceptar"
                            colorBackground={colors.primary}
                            onPress={autenticar}
                            altura={64}
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


                                    <View style={[styles.modalView, {flexDirection: 'column'} ]}>
                                        <Ionicons style={{fontSize: 60, color: "gold"}} name="warning"/>
                                        <Text style={[styles.modalText,{textAlign: "justify"}]}>¡Elije si eres un Checador o un Chofer!</Text>

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
