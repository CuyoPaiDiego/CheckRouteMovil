import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import { RootLoginStackParams } from "../navigators/StackNavigator";

interface Props extends StackScreenProps<RootLoginStackParams,any>{
}

export const useLogin = () => {

    const [moodChecador, setMoodChecador] = useState(false);
    const [botonChecador, setBotonChecador] = useState("white");
    const [bordeChecador, setBordeChecador] = useState("black");
    const [textChecador, setTextChecador] = useState("black");
    const [moodChofer, setMoodChofer] = useState(false);
    const [botonChofer, setBotonChofer] = useState("white");
    const [bordeChofer, setBordeChofer] = useState("black");
    const [textChofer, setTextChofer] = useState("black");

    

    

    const isChecador = () => {
        setMoodChecador(true);
        setBotonChecador("#24B960");
        setMoodChofer(false);
        setBotonChofer("white");
        setBordeChecador("black");
        setBordeChofer("white");
        setTextChecador("white");
        setTextChofer("black");
    }

    const isChofer = () => {
        setMoodChofer(true);
        setBotonChofer("#24B960");
        setMoodChecador(false);
        setBotonChecador("white");
        setBordeChecador("white");
        setBordeChofer("black");
        setTextChecador("black");
        setTextChofer("white");
    }

    return{
        isChecador,
        isChofer,
        bordeChecador,
        bordeChofer,
        botonChofer,
        botonChecador,
        moodChecador,
        moodChofer,
        textChecador,
        textChofer
    }
        
    
}