import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "@src/utils/appInfo";

export const defaultStyle = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    
    row: {
        flexDirection: 'row'
    },

    col: {
        flexDirection: 'column',
    }
})