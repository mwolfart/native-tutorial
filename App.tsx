import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ImageSourcePropType } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import styled from 'styled-components/native'
import ImageViewer from './components/ImageViewer'
import Button from './components/buttons/Default'
import CircleButton from './components/buttons/Circle'
import IconButton from './components/buttons/Icon'
import PlaceholderImage from './assets/images/background-image.png'
import EmojiPicker from './components/EmojiPicker'
import EmojiList from './components/EmojiList'
import EmojiSticker from './components/EmojiSticker'

const Container = styled.View`
  display: flex;
  width: 100%;
  background-color: #25292e;
  align-items: center;
`

const ImageContainer = styled.View`
  flex-grow: 1;
  padding-top: 58px;
`

const FooterContainer = styled.View`
  flex-basis: 33%;
  padding-block: 24px;
  align-items: center;
`

const DrawerContainer = styled.View`
  position: absolute;
  bottom: 80px;
  gap: 48px;
  flex-direction: row;
  align-items: center;
`

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showAppOptions, setShowAppOptions] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pickedEmoji, setPickedEmoji] = useState(null)

  const onPickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true)
    }
  }

  const onReset = () => {
    setShowAppOptions(false)
    setPickedEmoji(null)
    setSelectedImage(null)
  }

  const onSaveImageAsync = async () => {
    // we will implement this later
  }

  const onAddSticker = () => {
    setIsModalVisible(true)
  }

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  const displayedImage = (selectedImage ??
    PlaceholderImage) as ImageSourcePropType

  return (
    <Container>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <ImageContainer>
        <ImageViewer source={displayedImage} />
        {pickedEmoji !== null ? (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        ) : null}
      </ImageContainer>
      {showAppOptions ? (
        <DrawerContainer>
          <IconButton iconName="refresh" label="Reset" onPress={onReset} />
          <CircleButton iconName="add" onPress={onAddSticker} />
          <IconButton
            iconName="save-alt"
            label="Save"
            onPress={onSaveImageAsync}
          />
        </DrawerContainer>
      ) : (
        <FooterContainer>
          <Button
            label="Choose a photo"
            onPress={onPickImage}
            variant="primary"
            iconName="picture-o"
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </FooterContainer>
      )}
      <StatusBar style="auto" />
    </Container>
  )
}
