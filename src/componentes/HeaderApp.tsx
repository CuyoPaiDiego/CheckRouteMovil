import { Image, StatusBar, View } from "react-native";
import { colors } from "../theme/styles";

interface Props {
    height: number;
    logo?: boolean;
}

export const HeaderApp = ({ height, logo=false }: Props) => {
    return (
        <View
            style={{
                backgroundColor: colors.primary,
                height
            }}
        >
            {
                (logo) && (<Image style={{height: 160, width:160, alignSelf: "center"}} source={require("../../assets/imgLogo.png")}/>)
            } 
            <StatusBar backgroundColor={colors.primary} />
        </View>
    );
}
