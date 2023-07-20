import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FC } from 'react';

type Props = {
  label: string
  onPress: () => void,
  variant?: string
  iconName?: keyof typeof FontAwesome.glyphMap
}

const Button: FC<Props> = ({ label, onPress, variant, iconName }) => {
  const isPrimary = variant === 'primary'
  return (
    <View style={ [styles.buttonContainer, isPrimary && styles.primaryContainer] }>
      <Pressable style={ [styles.button, isPrimary && styles.primaryButton] } onPress={onPress}>
        {iconName && (
          <FontAwesome 
            name={iconName}
            style={styles.buttonIcon}
          />
        )}
        <Text style={ [styles.buttonLabel, isPrimary && styles.primaryLabel] }>{label}</Text>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
  },
  primaryContainer: {
    borderWidth: 4,
    borderColor: '#ffd33d',
    borderRadius: 18,
    padding: 3,
  },
  button: {
    borderRadius: 10,
    padding: 24,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#fff',
  },
  buttonIcon: {
    color: '#25292e',
    fontSize: 18,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  primaryLabel: {
    color: '#25292e',
  },
});