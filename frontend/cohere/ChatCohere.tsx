import { JSX, ReactNode, useCallback, useEffect, useState } from 'react'
import { Bubble, BubbleProps, GiftedChat, IMessage, InputToolbar, InputToolbarProps, LeftRightStyle, QuickRepliesProps, RenderMessageAudioProps, RenderMessageImageProps, RenderMessageTextProps, RenderMessageVideoProps, Reply, Send, Time, TimeProps, User } from 'react-native-gifted-chat'
import { cohereGenerate } from './services/cohereGenerate'
import { View, StyleSheet, Dimensions, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { InferProps, Requireable, Validator } from 'prop-types'

interface Message extends IMessage {
  user: {
    _id: number;
    name: string;
    avatar: string
  }
}

const screenWidth = Dimensions.get('window').width
// const screenHeight = Dimensions.get('window').height

export function ChatCohere() {
  const [messages, setMessages] = useState<Message[]>([])
  const [lastMessageId, setLastMessageId] = useState(2)

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hola en que puedo ayudarte?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'cohere',
          avatar: 'https://avatars.githubusercontent.com/u/54850923?s=280&v=4'
        }
      }
    ])
  }, [])

  const onSend = useCallback(async (messages: IMessage[]) => {
    const convertedMessages = messages.map((message: IMessage) => {
      const userId = typeof message.user._id === 'string' ? parseInt(message.user._id, 10) : message.user._id

      const convertedMessage: Message = {
        ...message,
        user: {
          ...message.user,
          _id: userId,
          name: 'cohere',
          avatar: 'https://avatars.githubusercontent.com/u/54850923?s=280&v=4'
        }
      }

      return convertedMessage
    })

    setMessages(previousMessages => GiftedChat.append(previousMessages, convertedMessages))
    setLastMessageId(lastMessageId + 1)
    // llamar a cohere para obtener la respuesta
    const userMessage = messages[0].text
    const responseText = await cohereGenerate(userMessage)

    // Agregar respuesta de cohere al estado de mensajes
    setMessages(previusMessages =>
      GiftedChat.append(previusMessages, [
        {
          _id: lastMessageId + 1,
          text: responseText,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Cohere',
            avatar: 'https://avatars.githubusercontent.com/u/54850923?s=280&v=4'
          }
        }
      ])
    )
  }, [lastMessageId])

  const renderInputToolbar = (props: JSX.IntrinsicAttributes & Pick<InputToolbarProps<IMessage>, keyof InputToolbarProps<IMessage>> & Pick<InferProps<{ renderAccessory: Requireable<(...args: any[]) => any>; renderActions: Requireable<(...args: any[]) => any>; renderSend: Requireable<(...args: any[]) => any>; renderComposer: Requireable<(...args: any[]) => any>; onPressActionButton: Requireable<(...args: any[]) => any>; containerStyle: Requireable<number | boolean | object>; primaryStyle: Requireable<number | boolean | object>; accessoryStyle: Requireable<number | boolean | object> }>, never> & Pick<InputToolbarProps<IMessage>, 'options' | 'optionTintColor'>) => {
    return (
      <InputToolbar {...props} containerStyle={styles.textBackground} />
    )
  }

  const renderBubble = (props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<Bubble<IMessage>> & Pick<Pick<Readonly<BubbleProps<IMessage>>, keyof BubbleProps<IMessage>> & Pick<InferProps<{ user: Validator<object>; touchableProps: Requireable<object>; onLongPress: Requireable<(...args: any[]) => any>; renderMessageImage: Requireable<(...args: any[]) => any>; renderMessageVideo: Requireable<(...args: any[]) => any>; renderMessageAudio: Requireable<(...args: any[]) => any>; renderMessageText: Requireable<(...args: any[]) => any>; renderCustomView: Requireable<(...args: any[]) => any>; isCustomViewBottom: Requireable<boolean>; renderUsernameOnMessage: Requireable<boolean>; renderUsername: Requireable<(...args: any[]) => any>; renderTime: Requireable<(...args: any[]) => any>; renderTicks: Requireable<(...args: any[]) => any>; renderQuickReplies: Requireable<(...args: any[]) => any>; onQuickReply: Requireable<(...args: any[]) => any>; position: Requireable<string>; optionTitles: Requireable<(string | null | undefined)[]>; currentMessage: Requireable<object>; nextMessage: Requireable<object>; previousMessage: Requireable<object>; containerStyle: Requireable<InferProps<{ left: Requireable<number | boolean | object>; right: Requireable<number | boolean | object> }>>; wrapperStyle: Requireable<InferProps<{ left: Requireable<number | boolean | object>; right: Requireable<number | boolean | object> }>>; bottomContainerStyle: Requireable<InferProps<{ left: Requireable<number | boolean | object>; right: Requireable<number | boolean | object> }>>; tickStyle: Requireable<number | boolean | object>; usernameStyle: Requireable<number | boolean | object>; containerToNextStyle: Requireable<InferProps<{ left: Requireable<number | boolean | object>; right: Requireable<number | boolean | object> }>>; containerToPreviousStyle: Requireable<InferProps<{ left: Requireable<number | boolean | object>; right: Requireable<number | boolean | object> }>> }>, never> & Pick<Readonly<BubbleProps<IMessage>>, 'inverted' | 'textStyle' | 'quickReplyStyle' | 'quickReplyTextStyle' | 'onPress' | 'renderQuickReplySend'>, 'user' | 'isCustomViewBottom' | 'renderUsernameOnMessage' | 'inverted' | 'textStyle' | 'quickReplyStyle' | 'quickReplyTextStyle' | 'renderQuickReplySend'> & { readonly containerStyle?: LeftRightStyle<ViewStyle> | undefined; readonly position?: 'left' | 'right' | undefined; readonly touchableProps?: object | undefined; readonly onLongPress?: ((context?: any, message?: any) => void) | undefined; readonly renderMessageImage?: ((props: RenderMessageImageProps<IMessage>) => ReactNode) | undefined; readonly renderMessageVideo?: ((props: RenderMessageVideoProps<IMessage>) => ReactNode) | undefined; readonly renderMessageAudio?: ((props: RenderMessageAudioProps<IMessage>) => ReactNode) | undefined; readonly renderMessageText?: ((props: RenderMessageTextProps<IMessage>) => ReactNode) | undefined; readonly renderCustomView?: ((bubbleProps: BubbleProps<IMessage>) => ReactNode) | undefined; readonly renderUsername?: ((user?: User | undefined) => ReactNode) | undefined; readonly renderTime?: ((timeProps: TimeProps<IMessage>) => ReactNode) | undefined; readonly renderTicks?: ((currentMessage: IMessage) => ReactNode) | undefined; readonly renderQuickReplies?: ((quickReplies: QuickRepliesProps<IMessage>) => ReactNode) | undefined; readonly onQuickReply?: ((replies: Reply[]) => void) | undefined; readonly optionTitles?: string[] | undefined; readonly currentMessage?: IMessage | undefined; readonly nextMessage?: IMessage | undefined; readonly previousMessage?: IMessage | undefined; readonly wrapperStyle?: LeftRightStyle<ViewStyle> | undefined; readonly bottomContainerStyle?: LeftRightStyle<ViewStyle> | undefined; readonly tickStyle?: StyleProp<TextStyle>; readonly usernameStyle?: TextStyle | undefined; readonly containerToNextStyle?: LeftRightStyle<ViewStyle> | undefined; readonly containerToPreviousStyle?: LeftRightStyle<ViewStyle> | undefined; readonly onPress?: ((context?: any, message?: any) => void) | undefined } & {}) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'black'
          },
          left: {
            backgroundColor: '#bdf26d'
          }
        }}
        textStyle={{
          right: {
            fontSize: 18,
            color: '#bef264'
          },
          left: {
            fontSize: 18,
            color: 'black'
          }
        }}
      />
    )
  }

  // const RenderSends = (props) => {
  //   <Send {...props} containerStyle={{ alignContent: 'center', alignItems: 'center', justifyContent: 'cernter' }}>
  //     <View>
  //       <Ionicons name='send' size={6} color='highlight.100' />
  //     </View>
  //   </Send>
  // }

  return (
    <View style={{ backgroundColor: '#494', flex: 1, paddingBottom: 10 }}>
      <GiftedChat
        // textInputProps={{ backgroundColor: 'black', color: 'white', borderRadius: 25, paddingLeft: 10, justifyContent: 'center', alignItems: 'center' }}
        messages={messages}
        placeholder='Escribe una pregunta'
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
        renderTime={(props) => (<Time {...props} timeTextStyle={{ left: { color: '#010101' } }} />)}
        renderSend={(props) => (
          <Send {...props} containerStyle={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 200, backgroundColor: 'rgba(119, 166, 73, 1)', width: 50, height: 50, left: 73 }}>
            <View>
              <Ionicons name='send' size={20} color='white' />
            </View>
          </Send>
        )}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    width: screenWidth - 60,
    minHeight: 54,
    maxHeight: 300,
    paddingVertical: 2,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    textAlign: 'center',
    marginLeft: 5,
    marginBottom: -5
  }
})
