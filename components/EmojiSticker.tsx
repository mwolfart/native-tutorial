import { FC } from 'react'
import { Image, ImageSourcePropType } from 'react-native'
import styled from 'styled-components/native'

type Props = {
  imageSize: number
  stickerSource: ImageSourcePropType
}

const Container = styled.View`
  top: -350px;
`

const EmojiSticker: FC<Props> = ({ imageSize, stickerSource }) => {
  return (
    <Container>
      <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </Container>
  )
}

export default EmojiSticker
