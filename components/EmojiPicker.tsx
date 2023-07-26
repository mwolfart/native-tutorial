import { Modal, Pressable } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FC, PropsWithChildren } from 'react'
import styled from 'styled-components/native'

type Props = {
  isVisible: boolean
  onClose: () => void
} & PropsWithChildren

const Content = styled.View`
  height: 25%;
  width: 100%;
  background-color: #25292e;
  border-top-right-radius: 18px;
  border-top-left-radius: 18px;
  position: absolute;
  bottom: 0;
`

const TitleContainer = styled.View`
  height: 16%;
  background-color: #464c55;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding-inline: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.Text`
  color: #fff;
  fontsize: 16;
`

const EmojiPicker: FC<Props> = ({ isVisible, children, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <Content>
        <TitleContainer>
          <Title>Choose a sticker</Title>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </TitleContainer>
        {children}
      </Content>
    </Modal>
  )
}

export default EmojiPicker
