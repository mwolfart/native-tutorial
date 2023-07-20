import { FC } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import styled from 'styled-components/native'

type Props = {
  onPress: () => void
  iconName: keyof typeof MaterialIcons.glyphMap
}

const Container = styled.View`
  width: auto;
  aspect-ratio: 1;
  border-width: 4px;
  border-color: #ffd33d;
  border-radius: 100%;
  padding: 3px;
`

const StyledPressable = styled.Pressable`
  border-radius: 100%;
  padding: 16px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`

const StyledIcon = styled(MaterialIcons)`
  color: #25292e;
  font-size: 38px;
`

const CircleButton: FC<Props> = ({ onPress, iconName }) => {
  return (
    <Container>
      <StyledPressable onPress={onPress}>
        <StyledIcon name={iconName} />
      </StyledPressable>
    </Container>
  )
}

export default CircleButton
