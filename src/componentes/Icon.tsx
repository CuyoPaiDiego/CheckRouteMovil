import { useContext } from "react";
import { StyleProp, ViewStyle, TouchableOpacity, Text, StyleSheet, TextStyle } from "react-native";

import { colors } from "../theme/styles";
import { Ionicons } from "@expo/vector-icons";


interface Props {
    nameIcon: string;
    style?: StyleProp<ViewStyle>;
    colorBackground?: string;
    size:number;
    width: number;
}

export const Icon = ({nameIcon, style, colorBackground, size, width}: Props) => {
    

    return (
            <Ionicons style={[localStyles.container,{color:colorBackground, width:width}, style]} name={nameIcon} size={size} />
    );
}

const localStyles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.buttonPrimary,
        borderRadius: 8,
        padding: 10,
        height: 70,
    }
});
