import { FC } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import styled from 'styled-components/native'

type Props = {
  label: string
  onPress: () => void
  variant?: string
  iconName?: keyof typeof FontAwesome.glyphMap
}

type StyledProps = { variant?: string }

const Container = styled.View<StyledProps>`
  width: 320px;
  max-height: 96px;
  ${({ variant }) =>
    variant === 'primary' &&
    `
      border-width: 4px;
      border-color: #ffd33d;
      border-radius: 18px;
      padding: 3px;
    `}
`

const StyledPressable = styled.Pressable<StyledProps>`
  border-radius: 10px;
  padding: 24px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
  ${({ variant }) => variant === 'primary' && `backgroundColor: #fff;`}
`

const StyledText = styled.Text<StyledProps>`
  color: ${({ variant }) => (variant === 'primary' ? '#25292e' : '#fff')};
  font-size: 16px;
`

const StyledIcon = styled(FontAwesome)`
  color: #25292e;
  font-size: 18px;
`

const Button: FC<Props> = ({ label, onPress, variant, iconName }) => {
  return (
    <Container variant={variant}>
      <StyledPressable variant={variant} onPress={onPress}>
        {iconName && <StyledIcon name={iconName} />}
        <StyledText variant={variant}>{label}</StyledText>
      </StyledPressable>
    </Container>
  )
}

export default Button
