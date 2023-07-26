import { FC } from 'react'
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated'
import { Image, ImageSourcePropType, View } from 'react-native'
import styled from 'styled-components/native'

type Props = {
  imageSize: number
  stickerSource: ImageSourcePropType
}

const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedImage = Animated.createAnimatedComponent(Image)

const Container = styled(AnimatedView)`
  top: -350px;
`

const EmojiSticker: FC<Props> = ({ imageSize, stickerSource }) => {
  const scaleImage = useSharedValue(imageSize)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

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

  //   const onDrag = useAnimatedGestureHandler({
  //     onStart: (event, context) => {
  //       context.translateX = translateX.value
  //       context.translateY = translateY.value
  //     },
  //     onActive: (event, context) => {
  //       translateX.value = event.translationX + context.translateX
  //       translateY.value = event.translationY + context.translateY
  //     },
  //   })

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
