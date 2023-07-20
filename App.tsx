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
  }

  const onAddSticker = () => {
    // we will implement this later
  }

  const onSaveImageAsync = async () => {
    // we will implement this later
  }

  const displayedImage = (selectedImage ??
    PlaceholderImage) as ImageSourcePropType

  return (
    <Container>
      <ImageContainer>
        <ImageViewer source={displayedImage} />
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
