import { FC } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import styled from 'styled-components/native'

type Props = {
  label: string
  onPress: () => void
  iconName: keyof typeof MaterialIcons.glyphMap
}

const StyledPressable = styled.Pressable`
  justify-content: center;
  align-items: center;
`

const StyledText = styled.Text`
  color: #fff;
  margin-top: 12px;
`

const StyledIcon = styled(MaterialIcons)`
  color: #fff;
  font-size: 24px;
`

const IconButton: FC<Props> = ({ label, onPress, iconName }) => {
  return (
    <StyledPressable onPress={onPress}>
      <StyledIcon name={iconName} />
      <StyledText>{label}</StyledText>
    </StyledPressable>
  )
}

export default IconButton
