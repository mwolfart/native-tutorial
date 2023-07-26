import { FC } from 'react'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated'
import { Image, ImageSourcePropType } from 'react-native'
import styled from 'styled-components/native'

type Props = {
  imageSize: number
  stickerSource: ImageSourcePropType
}

const Container = styled.View`
  top: -350px;
`

const AnimatedImage = Animated.createAnimatedComponent(Image)

const EmojiSticker: FC<Props> = ({ imageSize, stickerSource }) => {
  const scaleImage = useSharedValue(imageSize)

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2
      }
    },
  })

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    }
  })

  return (
    <Container>
      <TapGestureHandler onGestureEvent={onDoubleTap as never} numberOfTaps={2}>
        <AnimatedImage
          source={stickerSource}
          resizeMode="contain"
          style={[imageStyle]}
          //   style={{ width: imageSize, height: imageSize }}
        />
      </TapGestureHandler>
    </Container>
  )
}

export default EmojiSticker
