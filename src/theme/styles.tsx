import { Dimensions, StyleSheet } from "react-native"

export const { height: heightWindow, width: widthWindow } = Dimensions.get('window');

export const colors = {
    primary: "#24B960", //Verde
    secondary: "#7BF5AC", //Modal verde
    terciary: "#EDB025",
    backgroundPrimary: "#FEF9D1", //Cremita

    buttonPrimary: "#EDB025",
    buttonSecondary: "#16193F",
}

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundPrimary,
    },
    fontSize: {
        fontSize: 22
    }
});