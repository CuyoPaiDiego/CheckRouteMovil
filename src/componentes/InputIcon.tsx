import { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { widthWindow } from '../theme/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


interface Props {
    click?: ()=> void;
    margenAbajo?: number;
    iconName: string;
    placeholder: string;
    onChangeText: (value:string)=> void;
    tipo?:StyleProp<any>;
    security?: boolean;
    style?: StyleProp<ViewStyle>
    value?:string;
}

export const InputIcon = ({value, tipo, click, margenAbajo, onChangeText, placeholder, iconName, security = false, style }: Props) => {
    
    const [securityIcon, setSecurityIcon] = useState("eye");
    const [showSecurity, setShowSecurity] = useState(security);

    const handleSecurity = () => {
        if(securityIcon === "eye") setSecurityIcon("eye-off")
        else setSecurityIcon("eye");
        setShowSecurity(!showSecurity);
    }

    return (
        <View style={[style, localStyles.container, {marginBottom: margenAbajo}]} >
            <Ionicons name={iconName} size={40} />
            <TextInput
                value={value} 
                placeholder={placeholder}
                onChangeText={onChangeText}
                secureTextEntry={showSecurity}
                style={[localStyles.input, {fontSize:20, textAlign:"center"}]}
                onFocus={click}
                keyboardType="number-pad"
                
                
            />
            {
                (security) ? (
                    <TouchableOpacity onPress={handleSecurity} >
                        <Ionicons name={securityIcon} size={40} />
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 40 }} />
                )
            }
        </View>
    );
}

const localStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        width: widthWindow - 60,
        borderRadius: 8,
        borderWidth: 1
        
    },
    input: {
        height: 50,
        width: 200,
        paddingHorizontal: 6,
    }
});
