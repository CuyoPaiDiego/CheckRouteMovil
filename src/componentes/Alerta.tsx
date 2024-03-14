import { Ionicons } from "@expo/vector-icons";
import React from 'react'
import { Button, Dimensions, Modal, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { colors, globalStyles } from "../theme/styles";
import { StyleProps } from "react-native-reanimated";


interface Props {
    text: string;
    nameIcon: string;
    colorIcon?: string;
    colorBoton?: StyleProp<any>;
    width?: number;
    visible: boolean;
    setVisible: (value: React.SetStateAction<boolean>) => void;
}

const { height: windowHeight } = Dimensions.get('window');
export const VentanaModal = ( {colorBoton , colorIcon, nameIcon, text, width = 300, setVisible, visible }: Props ) => {

    return (
        <Modal
            transparent={true}
            animationType='slide'
            visible={visible}
        >
            <View
                style={[ localStyles.modalContainer, { width } ]}
            >
                <Ionicons style={{fontSize: 60, color: colorIcon }} name={nameIcon} />
                <Text style={[ localStyles.textoStyle, {marginBottom: 24} ]} > { text } </Text>
                <View style={{ flexDirection: 'row' }} >

                    {/* Aceptar */}
                    {/* <TouchableOpacity
                        style={[ localStyles.boton, { marginRight: 20 } ]}
                        onPress={action}
                    >
                        <Text style={[ localStyles.textoStyle, { color: 'white' } ]} >Aceptar</Text>
                    </TouchableOpacity> */}

                    {/* // Cancelar */}
                    <TouchableOpacity
                        style={ [localStyles.boton, {backgroundColor: colorBoton}]  }
                        onPress={() => setVisible(false)}
                    >
                        <Text style={[ localStyles.textoStyle, { color: 'white' } ]} >Cerrar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
}

const localStyles = StyleSheet.create({
    modalContainer: {
        height: 300,
        backgroundColor: "white",
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: (windowHeight / 2) - 110,
        borderRadius: 18,
        elevation: 40,
        paddingHorizontal: 8,
        paddingVertical: 16,
        justifyContent: 'center',
        flexDirection: "column"
    },
    textoStyle: {
        fontSize: 18,
        fontWeight: 'bold'
        
    },
    boton: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 12,
    }
});