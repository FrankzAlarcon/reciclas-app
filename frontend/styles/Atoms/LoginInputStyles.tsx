import { StyleSheet } from "react-native";

export const loginInputStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 2,
        paddingHorizontal: 14,
        paddingVertical: 11,
        borderRadius: 10,
        gap: 10,
        width: '80%'
    },
    icon: {
        width: '15%',
        height: 'auto',
        objectFit: 'contain'
    },
    textInput: {
        fontFamily: 'Montserrat',
        color: '#FFFFFF'
    }
})