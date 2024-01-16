import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

type Props = {
    children: React.ReactNode;
    scroll?: boolean;
}

export function KeyboardAvoidingWrapper ({ children, scroll = false }: Props) {
  const handlePress = () => {
    Keyboard.dismiss()
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView scrollEnabled={scroll}>
        <TouchableWithoutFeedback onPress={handlePress}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
