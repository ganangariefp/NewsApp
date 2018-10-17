import React, { Component } from "react";
import { 
	Image,
  View,
  ImageBackground,
  Dimensions 
} from "react-native";
import Spinner from 'react-native-spinkit';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const launchscreen = require('../../assets/logo.jpg');
const logo = require('../../assets/text-lines.png');

class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.skip();
    }, 3000);
  }
  
  skip() {
    return this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <ImageBackground source={launchscreen} resizeMode = {'cover'} style={{ flex: 1, height: null, width: null }}>
        <View style = {{flex: 1, height: SCREEN_HEIGHT, width: SCREEN_WIDTH, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={logo} resizeMode = {'contain'} style={{ height: 100, width: 100, margin: 30 }}/>
          <Spinner 
            style={{ alignSelf: 'center' }}
            isVisible={true} 
            size={37} 
            type={'ThreeBounce'} 
            color={'white'}/>
        </View>
      </ImageBackground>
		)
  };
}

export default Splash;
