import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import px from '../../../assets/utility/dimension';
import colors from '../../../config/colors';
import { useNavigation } from '@react-navigation/native';

const CategoryItem = ({image,id, title, color}) => {

  const navigation = useNavigation()
  // useEffect(() => {
  // })
  return (
    <View style={styles.container}>
      <Pressable style={styles.containerPressable} onPress={() => {navigation.navigate("categoryproducts",{id:id,title:title})}}>

      <View style={[styles.backgroundContainer, {backgroundColor: color}]}>
        <Image style={styles.image} source={{uri: image}} />
      </View>
      <View>
        <Text style={styles.text}>{title}</Text>
        </View>
        </Pressable>
    </View>
    
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
  containerPressable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: px(35),
    height: px(35),
  },
  backgroundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: px(80),
    height: px(72),
  },
  text: {
    fontFamily: 'DMSans-regular',
    color: colors.fontColor,
    marginVertical: 8,
  },
});
