import { useContext } from "react";
import { StyleProp, ViewStyle, TouchableOpacity, Text, StyleSheet, TextStyle } from "react-native";

import { colors } from "../theme/styles";
import { Ionicons } from "@expo/vector-icons";


interface Props {
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    colorBackground?: string;
    fontColor?: string;
    borde?: StyleProp<ViewStyle>
    styleText?: StyleProp<TextStyle>;
    altura?: number;
    nameIcon?: string;
}

export const ButtonIcon = ({nameIcon, altura, styleText, borde, onPress, style, colorBackground = colors.buttonPrimary, fontColor = "black" }: Props) => {
    

    return (
        <TouchableOpacity 
            style={[ borde, localStyles.container, { backgroundColor: colorBackground, height: altura } ]} 
            onPress={onPress}
        >
            <Ionicons style={style} name={nameIcon} size={40} />
        </TouchableOpacity>
    );
}

const localStyles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        borderRadius: 8,
        padding: 10,
        height: 62,
    },
    text: {
        fontWeight: "bold",
    }
});
