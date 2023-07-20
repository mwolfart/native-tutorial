import { FC } from 'react';
import { StyleSheet, Image, ImageSourcePropType } from 'react-native';

type Props = {
  source: ImageSourcePropType
}

const ImageViewer: FC<Props> = ({ source }) => {
  return (
    <Image source={source} style={styles.image} />
  );
}

export default ImageViewer

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});