import { FC } from 'react'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
} from 'react-native-gesture-handler'
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

type PanGestureContextType = {
  translateX: number
  translateY: number
}

const StyledView = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
`

const AnimatedView = Animated.createAnimatedComponent(StyledView)
const AnimatedImage = Animated.createAnimatedComponent(Image)

const EmojiSticker: FC<Props> = ({ imageSize, stickerSource }) => {
  const scaleImage = useSharedValue(imageSize)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(-350)

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2
      } else {
        scaleImage.value = scaleImage.value / 2
      }
    },
  })

  const onDrag = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    PanGestureContextType
  >({
    onStart: (_, context) => {
      context.translateX = translateX.value
      context.translateY = translateY.value
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX
      translateY.value = event.translationY + context.translateY
    },
  })

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    }
  })

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    }
  })

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={containerStyle}>
        <TapGestureHandler
          onGestureEvent={onDoubleTap as never}
          numberOfTaps={2}
        >
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  )
}

export default EmojiSticker
