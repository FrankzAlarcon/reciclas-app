import { StyleSheet } from "react-native";

export const AdminLoginPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 30
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        backgroundColor: '#77A649',
        borderRadius: 30
    },
    backButton: {
        width: '15%',
        height: '25%',
        objectFit: 'contain',
        marginLeft: '2%',
        marginTop: '5%'
    },
    appLogo: {
        width: '20%',
        height: '10%',
        objectFit: 'contain',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '-35%'
    },
    appTitle: {
        color: 'white',
        fontFamily: 'Monsterrat',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 45,
        marginTop: '-5%',
        alignContent: 'center'
    },
    appSubTitle: {
        color: 'white',
        fontFamily: 'Monsterrat',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 25,
        alignContent: 'center',
        letterSpacing: 5
    },
    appDescription: {
        color: 'white',
        fontFamily: 'Monsterrat',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 15,
        alignContent: 'center',
        marginTop: '4%'
    },
    grayContainer: {
        backgroundColor: '#494D4F',
        marginTop: '13%',
        borderRadius: 30,
        flex: 1,
    },
    welcomeText: {
        color: 'white',
        fontFamily: 'Monsterrat',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 43,
        fontWeight: 'bold',
        alignContent: 'center',
        marginTop: '8%',
        marginBottom: 0
    },
    rolText: {
        color: 'white',
        fontFamily: 'Monsterrat',
        marginLeft: 'auto',
        marginRight: 'auto',
        alignContent: 'center',
        marginTop: 0
    },
    loginInputs: {
        marginTop: '8%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10
    },
    loginButton: {
        marginTop: '6%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    forgotPassword: {
        color: 'white',
        fontFamily: 'Monsterrat',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '3%',
    },
    bottomAppLogo: {
        width: '12%',
        height: '12%',
        marginTop: '12%',
        objectFit: 'contain',
        marginLeft: 'auto',
        marginRight: 'auto' 
    }
})