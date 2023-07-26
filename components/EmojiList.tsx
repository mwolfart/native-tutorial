import { FC, useState } from 'react'
import { StyleSheet, FlatList, Platform, Pressable } from 'react-native'
import styled from 'styled-components/native'

type Props = {
  onSelect: (image: never) => void
  onCloseModal: () => void
}

const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-right: 20px;
`

const EmojiList: FC<Props> = ({ onSelect, onCloseModal }) => {
  const [emoji] = useState([
    require('../assets/images/emoji1.png'),
    require('../assets/images/emoji2.png'),
    require('../assets/images/emoji3.png'),
    require('../assets/images/emoji4.png'),
    require('../assets/images/emoji5.png'),
    require('../assets/images/emoji6.png'),
  ])

  const renderItem = ({ item, index }: { item: never; index: number }) => {
    return (
      <Pressable
        onPress={() => {
          onSelect(item)
          onCloseModal()
        }}
      >
        <StyledImage source={item} key={index} />
      </Pressable>
    )
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji as never}
      contentContainerStyle={styles.listContainer}
      renderItem={renderItem}
    />
  )
}

export default EmojiList

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
