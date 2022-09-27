import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Dimensions,
  PixelRatio,
  FlatList,
} from 'react-native';
import Button from '../UI/Button';
const dimension = Dimensions.get('screen').height / 830;

const Verification = ({route}) => {
  const changeHandler = (index, text) => {
    console.log('index:', index);
    console.log('text:', text);

    if (index < val.toString().length - 1 && text != '') {
      console.log(val.toString().length);
      console.log(index);
      this[`input${index + 1}`].focus();
      console.log("frontFocus");
      inputData[index] = text;
    } else {
      if (index != 0 && index != val.toString().length && text =="" ) {
        console.log(index);
        console.log(val.toString().length - 1);
        console.log("Backpedal");
        this[`input${index + -1}`].focus();
      }
    }
  };
  // const clickHandler = (index) => {
  //   console.log(index);
  //   if (index > 0 && inputData[index-1]!="") {
  //     this[`input${index - 1}`].focus()
  //   }
  // }

  console.log(route.params.path);
  console.log(dimension);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [val, setVal] = useState(Math.floor(1000 + Math.random() * 9000));

  const [otparr, setOtpArr] = useState([]);

  const inputData = ['', '', '', ''];

  useEffect(() => {
    const temparr = [];
    for (let i = 0; i < val.toString().length; i++) {
      console.log('amogus');

      temparr.push(
        <TextInput
          key={i}
          style={styles.textInput}
          maxLength={1}
          textAlign="center"
          // onFocus={()=>{clickHandler(i)}}
          onChangeText={text => changeHandler(i, text)}
          ref={input => {
            this[`input${i}`] = input;
          }}
        />,
      );
    }
    setOtpArr(temparr);
    console.log(otparr);
  }, []);

  const navigate = useNavigation();

  const placeholder = 'Enter Email/Phone Number to Register';
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text
            style={{
              marginTop: 30 * dimension,
              marginBottom: 20 * dimension,
              fontSize: 36 * dimension,
              fontWeight: '700',
              color: '#0C1A30',
            }}>
            Verification
          </Text>
          <Text
            style={{
              color: '#838589',
              fontSize: 16 * dimension,
              fontWeight: '400',
            }}>
            We have sent the verification code to +628*******716 Change?
          </Text>
        </View>
        <View
          style={{
            marginTop: 60 * dimension,
            flex: 1,
          }}>
          <View>
            <Text
              style={{
                color: '#0C1A30',
                fontSize: 20 * dimension,
                fontWeight: '400',
              }}>
              Verification Code
            </Text>
            {/* <View style={{flexDirection: 'row'}}>{OtpArr}</View> */}
            <View style={{flexDirection: 'row'}}>
              {otparr.map(input => {
                console.log(input);
                return input;
              })}
            </View>
          </View>

          <View style={{marginTop: 150 * dimension}}>
            <View style={{height: 60 * dimension}}>
              <Button backgroundColor={'#C4C5C4'} color={'white'}>
                Continue
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25 * dimension,
    flex: 1,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 16 * dimension,
    paddingHorizontal: 20 * dimension,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    marginTop: 20 * dimension,

    borderWidth: 2,
  },
});

export default Verification;