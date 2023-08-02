import { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import domtoimage from 'dom-to-image'
import styled from 'styled-components/native'
import { ImageSourcePropType, View, Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { captureRef } from 'react-native-view-shot'
import ImageViewer from './components/ImageViewer'
import Button from './components/buttons/Default'
import CircleButton from './components/buttons/Circle'
import IconButton from './components/buttons/Icon'
import PlaceholderImage from './assets/images/background-image.png'
import EmojiPicker from './components/EmojiPicker'
import EmojiList from './components/EmojiList'
import EmojiSticker from './components/EmojiSticker'

const Container = styled(GestureHandlerRootView)`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #25292e;
  align-items: center;
  justify-content: center;
`

const ImageContainer = styled.View`
  flex-basis: 67%;
  justify-content: center;
`

const FooterContainer = styled.View`
  padding: 24px 0;
  flex-basis: 33%;
  align-items: center;
`

const DrawerContainer = styled.View`
  padding: 24px 0;
  flex-basis: 33%;
  gap: 48px;
  flex-direction: row;
  align-items: center;
`

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showAppOptions, setShowAppOptions] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pickedEmoji, setPickedEmoji] = useState(null)
  const imageRef = useRef<View>(null)

  const [status, requestPermission] = MediaLibrary.usePermissions()

  if (status === null) {
    requestPermission()
  }

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
    if (!imageRef.current) {
      return
    }

    try {
      if (Platform.OS !== 'web') {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        })

        await MediaLibrary.saveToLibraryAsync(localUri)
        if (localUri) {
          alert('Image saved in your library.')
        }
      } else {
        const dataUrl = await domtoimage.toJpeg(imageRef.current as never, {
          quality: 0.95,
          width: 320,
          height: 440,
        })

        const link = document.createElement('a')
        link.download = 'sticker-smash.jpeg'
        link.href = dataUrl
        link.click()
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onAddSticker = () => {
    setIsModalVisible(true)
  }

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  const displayedImage = selectedImage
    ? { uri: selectedImage }
    : (PlaceholderImage as ImageSourcePropType)

  return (
    <Container>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <ImageContainer>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer source={displayedImage} />
          {pickedEmoji !== null ? (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          ) : null}
        </View>
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
      <StatusBar style="light" />
    </Container>
  )
}
