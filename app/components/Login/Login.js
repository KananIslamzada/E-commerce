import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../UI/Button';
import IconButton from '../UI/IconButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import px from '../../assets/utility/dimension';
import axios from 'axios';
import colors from '../../config/colors';import base from '../../helpers/base';
;

const Login = ({navigation}) => {
  const [keyboard,setkeyboard]=useState()
  const [iconName, setIconName] = useState('eye-outline');
  const [buttonColor, setButtonColor] = useState(colors.disabledButton);
  const [buttonHandler, setButtonHandler] = useState(false);
  const [error, setError] = useState();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [passwordType, setPasswordType] = useState(true);
  useEffect(() => {
    if (
      inputs.email != '' &&
      inputs.password != '' &&
      inputs.email.includes('@', 0)
    ) {
      setButtonColor(colors.blue);
      setButtonHandler(true);
    } else {
      setButtonColor(colors.darkgray);
      setButtonHandler(false);
    }
  }, [inputs]);
  function forgotPassword() {
    navigation.navigate('resetpassword');
  }
  function SignUp() {
    navigation.navigate('Register');
  }
  function changePasswordVisibility() {
    if (iconName == 'eye-outline') {
      setIconName('eye-off-outline');
    } else {
      setIconName('eye-outline');
    }
    setPasswordType(!passwordType);
  }
  function getInputs(inputName, data) {
    setInputs({
      ...inputs,
      [inputName]: data,
    });
  }
  async function postRequest() {
    try {
      setError(false);
      let response = await axios.post(
        'https://izzi-ecom.herokuapp.com/user/login',
        {
          email: inputs.email,
          password: inputs.password,
        },
      );
      await AsyncStorage.setItem('email', response.data.email);
      await AsyncStorage.setItem('username', response.data.username);
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('_id', response.data._id);
      base.token=response.data.token;
      Home();
    } catch (error) {
      setError(true);
    }
    function Home() {
      navigation.navigate('HomePage');
    }
  }
  useEffect(()=>{

    const keyboardListener=Keyboard.addListener('keyboardDidChangeFrame',(value)=>{
      setkeyboard(value.endCoordinates.height)
      console.log(value.endCoordinates.height);
    })
  
    // console.log(keyboardListener);
    
    return()=>keyboardListener.remove();
    
  },[])

  return (
    <KeyboardAwareScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={keyboard>0?{flexGrow:0}:{flexGrow:1}}
      enableOnAndroid={true}
      overScrollMode={'never'}
      keyboardShouldPersistTaps="always"
      >
      <View style={styles.container}>
        <View style={{marginTop: px(20)}}>
          <View>
            <Text style={styles.welcomeText}>Welcome back to Mega Mall</Text>
            <Text style={styles.descriptionText}>
              Please enter data to login
            </Text>
          </View>
          <View style={{marginTop: px(50)}}>
            <View style={{marginBottom: px(30)}}>
              <Text style={styles.inputText}>Email/ Phone</Text>
              <TextInput
                style={[
                  styles.inputContainer,
                  error && {borderWidth: 1, borderColor: colors.errorRed},
                ]}
                placeholderTextColor={colors.darkgray}
                placeholder="Enter your email address/ phone number"
                onChangeText={getInputs.bind(this, 'email')}
              />
            </View>
            <View>
              <Text style={styles.inputText}>Password</Text>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={[
                    styles.inputContainer,
                    {flex: 1},
                    error && {borderWidth: 1, borderColor: colors.errorRed},
                  ]}
                  placeholderTextColor={colors.darkgray}
                  placeholder="Enter your password"
                  onChangeText={getInputs.bind(this, 'password')}
                  secureTextEntry={passwordType}
                />
                <View style={{position: 'absolute', right: 0}}>
                  <IconButton
                    size={24}
                    color={colors.darkgray}
                    onPress={changePasswordVisibility}
                    name={iconName}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: px(20)}}>
            {error && (
              <Text style={{color: colors.errorRed}}>
                Email or password is incorrect
              </Text>
            )}
          </View>
          <View style={styles.signin}>
            <Button
              color={'white'}
              onPress={buttonHandler ? postRequest : () => {}}
              backgroundColor={buttonColor}>
              Sign In
            </Button>
          </View>
        </View>
        <View style={[styles.forgotPassword]}>
          <Button color={'black'} onPress={forgotPassword}>
            Forgot Password
          </Button>
          <Button onPress={SignUp} color={colors.blue}>
            Sign Up
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
const screen=Dimensions.get('window').height
const styles = StyleSheet.create({
  scrollView: { 
    backgroundColor:colors.white,
    
  },
  container: {
    flex:1,
    marginHorizontal: px(25),
    justifyContent: 'space-between',
    backgroundColor:colors.white
  },
  welcomeText: {
    fontSize: px(25),
    color: colors.fontColor,
    marginBottom: px(20),
    fontFamily: 'DMSans-Bold',
  },
  descriptionText: {
    color: colors.darkgray,
    fontSize: px(24),
    fontWeight: '400',
    fontFamily: 'DMSans-Regular',
  },
  inputContainer: {
    color: colors.fontColor,
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    paddingVertical: px(16),
    paddingHorizontal: px(20),
  },
  inputText: {
    color: colors.fontColor,
    fontSize: px(14),
    marginBottom: px(20),
    fontFamily: 'DMSans-Regular',
  },
  forgotPassword: {
    height: px(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  signin: {
    height: px(50),
    marginTop: px(70),
  },
});

export default Login;
