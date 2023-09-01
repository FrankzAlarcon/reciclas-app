import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button } from './app/Atoms/Button';
import { LoginInput } from './app/Atoms/LoginInput';
import { AdminLoginPage } from './Admin/Organisms/AdminLoginPage';

export default function App() {
    return (
        <SafeAreaView style={{backgroundColor:'#5DD55F', padding:10, height:'100%', width:'100%'}}>
          <AdminLoginPage/>
        </SafeAreaView>
    );
}