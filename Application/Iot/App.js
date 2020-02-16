import React from 'react';
import { style } from 'react-native';
import { createAppContainer } from 'react-navigation';//導頁
import { createStackNavigator } from 'react-navigation-stack';//導頁需要
import home from './page/home'; // import “自己的名字” 從 哪邊引用
import AC from './page/ApplicationContorl';
import lightControl from './page/lightControl';
import personalsetting from './page/personalsetting';
import takecareold from './page/takecareold';
import LeftSideMenu from './page/LeftSideMenu';
import login from './page/login.js';
import Main from './page/Main';
import person_num from './page/person_num';
import air_control from './page/air_control';
import curtain from './page/curtain';
import motion from './page/motion';
const AppNavigator = createStackNavigator({//新版使用createStackNavigator

  // *---------------------
  Main: {
    screen: Main,
    navigationOptions: {
      header: null
    },
  },
  login: {
    screen: login,
    navigationOptions: {
      header: null
    },
  },
  home: {
    screen: home,
    navigationOptions: {
      header: null
    },
  },

  //第二頁
  AC: {
    screen: AC,
    navigationOptions: {
      title: "家電控制",

      headerStyle: {
        backgroundColor: '#FDFAF0',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        letterSpacing: 5,
      },
    },
  },
  lightControl: {
    screen: lightControl,
    navigationOptions: {
      title: "電燈控制",

      headerStyle: {
        backgroundColor: '#F5F3F1',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        letterSpacing: 5,
      },
    },
  },
  personalsetting: {
    screen: personalsetting,
    navigationOptions: {
      title: "個人設定",

      headerStyle: {
        backgroundColor: '#F1E9E0',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        letterSpacing: 5,
      },
    },
  },

  person_num: {
    screen: person_num,
    navigationOptions: {
      title: "屋內人數",

      headerStyle: {
        backgroundColor: '#F5F3F1',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        letterSpacing: 5,
      },
    },
  },

  air_control: {
    screen: air_control,
    navigationOptions: {
      title: "空調設定",

      headerStyle: {
        backgroundColor: '#F5F3F1',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        letterSpacing: 5,
      },
    },
  },
  curtain: {
    screen: curtain,
    navigationOptions: {
      title: "窗簾設定",

      headerStyle: {
        backgroundColor: '#F5F3F1',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        letterSpacing: 5,
      },
    },
  },

  // *---------------------

  motion: {
    screen: motion,
    navigationOptions: {
      title: "監控設定",

      headerStyle: {
        backgroundColor: '#F5F3F1',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        letterSpacing: 5,
      },
    },
  },
});
export default createAppContainer(AppNavigator);//新版使用createStackNavigator,括號內為第五行的名稱 Ａpp....