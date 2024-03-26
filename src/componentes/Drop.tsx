
import { useContext, useState } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';


interface Props {
    texto: string;
    values: {label: string, value: string}[];
    getValue: (value: ItemType<string>) => void;
    style?: StyleProp<ViewStyle>;
    valor?: (value:string)=> void; 
}

export const DropBox = ({valor, getValue, texto, values, style}: Props) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(values);

    return (
      <View style={[styles.container, style]} >
        <Text style={[styles.texto, {fontSize: 20}]} > {texto} </Text>
        <DropDownPicker 
            items={items}
            value={value}
            open={open}
            setOpen={setOpen}
            setValue={setValue}
            onChangeValue={valor}
            style={{
                width: 250
            }}
            containerStyle={{
              width: 250
            }}
            onSelectItem={getValue}
            language="ES"
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    texto: {
      fontWeight: 'bold',
      marginRight: 14,
    }
});