import FontAwesome from '@expo/vector-icons/FontAwesome'
import styled from 'styled-components/native'
import { FC } from 'react'

type Props = {
  onPress: () => void
  label?: string
  variant?: string
  iconName?: keyof typeof FontAwesome.glyphMap
}

type StyledProps = { variant?: string }

const Container = styled.View<StyledProps>`
  ${({ variant }) =>
    variant === 'primary'
      ? `
        width: 320px;
        border-width: 4px;
        border-color: #ffd33d;
        border-radius: 18px;
        padding: 3px;
      `
      : variant === 'circle'
      ? `
        width: auto;
        aspect-ratio: 1;
        border-width: 4px;
        border-color: #ffd33d;
        border-radius: 100%;
        padding: 3px;
      `
      : `
        width: 320px;
      `}
`

const StyledPressable = styled.Pressable<StyledProps>`
  border-radius: ${({ variant }) => (variant === 'circle' ? '100%' : '10px')};
  padding: 24px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 8px;
  ${({ variant }) =>
    (variant === 'primary' || variant === 'circle') && `backgroundColor: #fff;`}
`

const StyledText = styled.Text<StyledProps>`
  color: ${({ variant }) =>
    variant === 'primary' || variant === 'circle' ? '#25292e' : '#fff'};
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
        {label && <StyledText variant={variant}>{label}</StyledText>}
      </StyledPressable>
    </Container>
  )
}

export default Button
