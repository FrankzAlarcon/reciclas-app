import { View, Image, Text, TouchableOpacity } from 'react-native';
import { LoginInput } from '../../app/Atoms/LoginInput';
import { Button } from '../../app/Atoms/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { AdminLoginPageStyles } from '../../styles/Organisms/AdminLoginPageStyles';

export function AdminLoginPage() {
    return (
        <View style={AdminLoginPageStyles.container}>
            <LinearGradient
                colors={['rgba(119, 166, 73, 1)', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 1)','rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)']}
                style={AdminLoginPageStyles.background}
            />
            <TouchableOpacity>
                <Image style={AdminLoginPageStyles.backButton} source={require('../../assets/previous.webp')}/>
            </TouchableOpacity>
            <Image style={AdminLoginPageStyles.appLogo} source={require('../../assets/reciclasLogo.png')}/>
            <Text style={AdminLoginPageStyles.appTitle}>RE CICLAS</Text>
            <Text style={AdminLoginPageStyles.appSubTitle}>ECUADOR</Text>
            <Text style={AdminLoginPageStyles.appDescription}>bicicletas ecológicas</Text>
            <View style={AdminLoginPageStyles.grayContainer}>
                <Text style={AdminLoginPageStyles.welcomeText}>¡Bienvenido!</Text>
                <Text style={AdminLoginPageStyles.rolText}>Administración</Text>
                <View style={AdminLoginPageStyles.loginInputs}>
                    <LoginInput defaultText='Nombre de usuario' iconSource={require('../../assets/user.png')}/>
                    <LoginInput defaultText='Contraseña' iconSource={require('../../assets/password.png')}/>
                </View>
                <View style={AdminLoginPageStyles.loginButton}>
                    <Button text='Iniciar sesión'/>
                </View>
                <TouchableOpacity>
                        <Text style={AdminLoginPageStyles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
                <Image style={AdminLoginPageStyles.bottomAppLogo} source={require('../../assets/reciclasLogo.png')}/>
            </View>
        </View>
    );
}