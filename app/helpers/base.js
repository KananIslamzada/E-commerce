import axios from 'axios';
const {Platform, Dimensions} = require('react-native');

class Base {
  constructor() {
    this.token = '';
    this.isIOS = Platform.OS === 'ios';
    this.isAndroid = Platform.OS === 'android';
    this.screenWidth = Dimensions.get('window').width;
    this.screenHeight = Dimensions.get('window').height;
  }

  api({headers = {}} = {}) {
    headers = this.token
      ? {
          ...headers,
          Authorization: `${this.token}`,
        }
      : headers;
    return axios.create({
      baseURL: 'https://izzi-ecom.herokuapp.com/',
      headers: {
        Accept: 'application/json',
        ...headers,
      },
    });
  }
}

const base = new Base();

export default base;
