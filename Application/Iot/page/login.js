import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, TextInput, Alert} from 'react-native';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Navigator,
} from 'react-native-ui-lib';
import {Col, Grid, Row} from 'react-native-easy-grid';

export default class main extends React.Component {
  componentDidMount() {
    var _that = this;
    var keys = ['Userid', 'Userpassword'];
    AsyncStorage.multiGet(keys, function(errs, result) {
      if (errs) {
        alert('錯誤');
        return;
      }
      _that.setState({
        //if result[0][1]不為空 傳回01 為空傳回''
        Userid: result[0][1] != null ? result[0][1] : '',
        Userpassword: result[1][1] != null ? result[1][1] : '',
      });
    });
  }
  // static propTypes = {};
  login = () => {
    var jsonobj = '';
    const {Userid, Userpassword} = this.state;
    const {navigate} = this.props.navigation;
    fetch('ip/html/checklogin.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Contect-type': 'application/json',
      },
      body: JSON.stringify({
        id: Userid,
        password: Userpassword,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        jsonobj = responseJson;
        if (Userid != null && Userpassword != null) {
          if (jsonobj != 'Wrong') {
            Alert.alert('歡迎登入');
            var keyValuePairs = [
              ['Userid', Userid],
              ['Userpassword', Userpassword],
            ];
            AsyncStorage.multiSet(keyValuePairs, function(errs) {
              if (errs) {
                //TODO：存储出错
                alert('存錯喔');
                return;
              }
            });
            navigate('home');
          } else {
            Alert.alert('錯誤', '找不到帳號或密碼,請再次確認');
          }
        } else {
          Alert.alert('錯誤', '請輸入帳號或密碼');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.flexContainer}>
        <Image style={styles.bg} source={{uri: 'ip/html/BG.jpg'}} />
        {/* 背景 */}
        <Grid>
          <Row size={1}></Row>
          <Row backgroundColor="#00fffff" size={3}>
            <View style={styles.center}>
              <TextInput
                style={styles.input}
                placeholder="username"
                onChangeText={Userid => this.setState({Userid})}
              />
            </View>
          </Row>
          <Row backgroundColor="#00fffff" size={3}>
            <View style={styles.center}>
              <TextInput
                style={styles.input}
                placeholder="password"
                onChangeText={Userpassword => this.setState({Userpassword})}
                secureTextEntry
              />
            </View>
          </Row>
          <Row size={1}>
            <Col>
              <TouchableOpacity style={styles.btl} onPress={this.login}>
                <Text style={styles.bttext}>登入</Text>
              </TouchableOpacity>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  flexContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  img: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 15,
  },
  bt: {
    borderRadius: 50,
    height: 60,
    backgroundColor: '#89CBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btl: {
    borderRadius: 50,
    backgroundColor: '#2d9fd6',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bttext: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  input: {
    textAlign: 'center',
    fontSize: 25,
    width: 400,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
