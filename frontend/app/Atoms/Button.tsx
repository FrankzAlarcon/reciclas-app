import {Text, TouchableOpacity} from 'react-native';
import { buttonStyles } from '../../styles/Atoms/ButtonStyles';

type Props = {
    text: string;
};

export function Button({text}: Props) {
    return (
        <TouchableOpacity style={buttonStyles.touchableOpacity}>
            <Text style={buttonStyles.text}>{text}</Text>
        </TouchableOpacity>
    );
}