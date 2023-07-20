import { StatusBar } from 'expo-status-bar'
import { ImageSourcePropType, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import ImageViewer from './components/ImageViewer'
import Button from './components/Button'
import PlaceholderImage from './assets/images/background-image.png'
import { useState } from 'react'
import styled from 'styled-components/native'

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

  const displayedImage = (selectedImage ??
    PlaceholderImage) as ImageSourcePropType

  return (
    <Container>
      <ImageContainer>
        <ImageViewer source={displayedImage} />
      </ImageContainer>
      {showAppOptions ? (
        <View />
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
          <Button iconName="plus" onPress={() => {}} variant="circle" />
        </FooterContainer>
      )}
      <StatusBar style="auto" />
    </Container>
  )
}
