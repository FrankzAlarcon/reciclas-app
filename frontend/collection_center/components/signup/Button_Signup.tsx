import { Text, TouchableOpacity } from 'react-native'
import { ButtonStyles } from './styles_signup/ButtonStyles_Signup'

type Props = {
  text: string;
};

export function Button ({ text }: Props) {
  return (
    <TouchableOpacity style={ButtonStyles.touchableOpacity}>
      <Text style={ButtonStyles.text}>{text}</Text>
    </TouchableOpacity>
  )
}