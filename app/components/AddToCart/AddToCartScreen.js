import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import px from '../../assets/utility/dimension';
import colors from '../../config/colors';
import IconButton from '../UI/IconButton';
import Button from '../UI/Button';
import {useEffect} from 'react';

const AddToCartScreen = ({route, navigation}) => {
  const [quantity, setQuantity] = useState(1);

  const [maxValue, setMaxValue] = useState(
    route.params.price.replace(/\s/g, '') * quantity,
  );

  useEffect(() => {
    const val = route.params.price.replace(/\s/g, '') * quantity;
    setMaxValue(val);
  }, [quantity]);

  const quanityChangeHandler = type => {
    switch (type) {
      case 'increase':
        setQuantity(quantity + 1);
        break;
      case 'decrease':
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
    }
  };

  return (
    <>
      <Pressable
        android_ripple={'#fff'}
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          backgroundColor: 'rgba(101, 96, 96,0.5)',
          height: '100%',
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          paddingHorizontal: px(20),
        }}>
        <View
          style={{
            marginTop: px(180),
            paddingTop: px(25),

            paddingHorizontal: px(25),
            paddingBottom: px(10),
            borderTopLeftRadius: 20,
            // borderTopRightRadius: 20,
            // borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
            }}>
            <Text
              style={{
                color: colors.fontColor,
                fontFamily: 'DMSans-Bold',
                fontSize: px(20),
              }}>
              Add To Cart
            </Text>
            <IconButton
              name="close"
              color={colors.darkgray}
              size={px(27)}
              onPress={() => {
                navigation.goBack;
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: px(20),
              paddingBottom: px(10),
              borderBottomWidth: 1,
            }}>
            <Text
              style={{
                fontFamily: 'DMSans-Bold',
                fontSize: px(20),
                color: colors.fontColor,
              }}>
              Quantity
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IconButton
                name="remove-outline"
                color={colors.darkgray}
                size={px(27)}
                onPress={() => {
                  quanityChangeHandler('decrease');
                }}
              />
              <Text>{quantity}</Text>
              <IconButton
                name="add-outline"
                color={colors.darkgray}
                size={px(27)}
                onPress={() => {
                  quanityChangeHandler('increase');
                }}
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              paddingTop: px(25),
              paddingBottom: px(10),
              paddingVertical: px(20),
            }}>
            <Text
              style={{
                fontFamily: 'DMSans-Bold',
                fontSize: px(20),
                color: colors.fontColor,
              }}>
              Total Price
            </Text>
            <Text
              style={{
                marginVertical: px(10),
                fontFamily: 'DMSans-Regular',
                fontSize: px(16),
                color: colors.fontColor,
              }}>
              {maxValue % 1 === 0 ? maxValue : maxValue.toFixed(2)}$
            </Text>
          </View>

          <View style={{paddingBottom: px(25)}}>
            <View style={{height: px(50)}}>
              <Button
                backgroundColor={colors.blue}
                onPress={() => {
                  navigation.goBack();
                }}
                color={colors.white}>
                Add to cart
              </Button>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default AddToCartScreen;

const styles = StyleSheet.create({});
