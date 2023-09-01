import { View, Image, TextInput, ImageSourcePropType } from "react-native";
import { loginInputStyles } from "../../styles/Atoms/LoginInputStyles";

type Props = {
    defaultText: string;
    iconSource: ImageSourcePropType;
};

export function LoginInput({defaultText, iconSource}: Props) {
    return (
        <View style={loginInputStyles.container}>
            <Image style={loginInputStyles.icon} source={iconSource}/>
            <TextInput style={loginInputStyles.textInput} placeholder={defaultText} placeholderTextColor='#FFFFFF'/>
        </View>
    );
}