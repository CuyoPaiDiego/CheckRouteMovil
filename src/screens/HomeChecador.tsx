import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerChecadorNav } from "../navigators/DrawerNavigator";
import { Image, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { HeaderApp } from "../componentes/HeaderApp";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../theme/styles";
import { Button } from "../componentes/Button";
import { InputIcon } from "../componentes/InputIcon";


interface Props extends DrawerScreenProps<RootDrawerChecadorNav,any>{
}

export const HomeChecador = () =>{

    const vacio2 = (hola: string)=> {
        console.log("nada", hola);
        
    }

    const vacio = ()=> {
        console.log("nada");
        
    }

    return(
        <View style={{ flex: 1 }} >
            
            <HeaderApp logo height={160} />
            <View style={globalStyles.container} >
                <KeyboardAvoidingView>
                    <ScrollView showsHorizontalScrollIndicator={false} >
                        
                        
                                <View style={{ marginTop: 50 , flexDirection: 'row', gap:50, justifyContent: "center"}} >
                                    
                                    <Text style={[styles.textStyleBienvenido, {fontSize: 40}]}>
                                        ¡Bienvenido a CheckRoute!
                                    </Text>
                                </View>

                                <View style={{ marginTop: 50 , flexDirection: 'row', justifyContent: "center"}} >
                                    
                                    <Text style={[styles.textStyle]}>
                                        "CheckRoute tu mejor aliado"
                                    </Text>
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
        padding:10,
        paddingLeft: 50,
        paddingRight: 50,
        textAlign: "justify",
        fontStyle: "italic"
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})
