import React from 'react';
import { createStackNavigator } from "react-navigation";

import Splash from './screens/Splash';
import Home from './screens/Home';
import Articles from './screens/Articles';
import WebArticle from './screens/WebArticle';
import Search from './screens/Search';

const App = createStackNavigator(
  {
    Splash: { screen: Splash },
    Home: { screen: Home },
    Articles: { screen: Articles },
    WebArticle: { screen: WebArticle },
    Search : { screen: Search }
  },
  {
    index: 0,
    initialRouteName: "Splash",
    headerMode: "none"
  }
);

export default App;