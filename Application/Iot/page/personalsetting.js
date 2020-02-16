import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  AsyncStorage,
  Alert,
} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {TouchableOpacity} from 'react-native-ui-lib';
import DialogInput from 'react-native-dialog-input';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogVisible: false,
      new_password: '',
      pwd: '',
      secure: true,
      statetext: '',
      air_text: '',
    };
  }
  componentDidMount() {
    fetch('ip/html/pwd.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Contect-type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(responseJson => {
        var pwddd = responseJson.data[0].pwd;

        this.setState({
          pwd: pwddd,
        });
      })
      .catch(error => {
        console.error(error);
      });

    fetch('ip/html/curtain_state.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Contect-type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(responseJson => {
        var temp = responseJson.data[0].curtain_auto_state;
        if (temp == 1) {
          this.setState({
            statetext: 'on',
          });
        } else {
          this.setState({
            statetext: 'off',
          });
        }
      })

      .catch(error => {
        console.error(error);
      });

    fetch('ip/html/air_auto_state.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Contect-type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(responseJson => {
        var temp = responseJson.data[0].air_auto_state;
        if (temp == 1) {
          this.setState({
            air_text: 'on',
          });
        } else {
          this.setState({
            air_text: 'off',
          });
        }
      })

      .catch(error => {
        console.error(error);
      });
  }

  data = () => {
    const {navigate} = this.props.navigation;
    alert('this is button');
  };
  warning = () => {
    const {navigate} = this.props.navigation;
    alert('this is button');
  };
  pwd = () => {
    this.setState({isDialogVisible: true});
  };

  sendInput = n_pwd => {
    this.setState({
      new_password: n_pwd,
    });
    var jsonobj = '';
    fetch('ip/html/pwdedit.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Contect-type': 'application/json',
      },
      body: JSON.stringify({
        new_password: n_pwd,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        jsonobj = responseJson;
        const {navigate} = this.props.navigation;
        this.setState({isDialogVisible: false});
        alert('更改完成！');
        navigate('login');
      })
      .catch(error => {
        console.error(error);
      });
  };

  logout = () => {
    const {navigate} = this.props.navigation;
    var keyValuePairs = [
      ['Userid', ''],
      ['Userpassword', ''],
    ];
    AsyncStorage.multiSet(keyValuePairs, function(errs) {
      if (errs) {
        //TODO：存储出错
        alert('存錯喔');
        return;
      } else {
        navigate('login', {});
      }
    });
  };
  changeValue = () => {
    if (this.state.statetext == 'on') {
      Alert.alert('窗簾自動', '已經關閉');
      fetch('ip/html/off_curtain_auto_state.php');
      this.setState({
        statetext: 'off',
      });
    } else {
      Alert.alert('窗簾自動', '已經開啟');

      this.setState({
        statetext: 'on',
      });
      fetch('ip/html/on_curtain_auto_state.php');
    }
  };

  air_state = () => {
    if (this.state.air_text == 'on') {
      Alert.alert('空調自動', '已經關閉');
      fetch('ip/html/off_air_auto_state.php');
      this.setState({
        air_text: 'off',
      });
    } else {
      Alert.alert('空調自動', '已經開啟');
      this.setState({
        air_text: 'on',
      });
      fetch('ip/html/on_air_auto_state.php');
    }
  };
  render() {
    return (
      <View style={styles.flexContainer}>
        <Grid>
          <Row size={2}>
            <Col size={2} alignItems="center" justifyContent="center">
              <Icon
                name="user-circle-o"
                type="FontAwesome"
                size={100}
                color="#303030"></Icon>
            </Col>
            <Col size={3}>
              <Text style={styles.textsty}>USER</Text>
            </Col>
          </Row>

          <Row size={1}>
            <Col>
              <Text style={styles.textaccount}>帳號：</Text>
            </Col>
            <Col>
              <Text style={styles.textaccountright}>user</Text>
            </Col>
          </Row>
          <Row size={1} justifyContent="center">
            <Col>
              <Text style={styles.textaccount}>密碼：</Text>
            </Col>
            <Col onPress={this.pwd}>
              <TextInput
                editable={false}
                secureTextEntry={this.state.secure}
                style={styles.textaccountright}
                value={this.state.pwd}></TextInput>
            </Col>
            <Col size={0.4} justifyContent="center">
              <Text onPress={this.pwd} style={styles.min}>
                修改密碼
              </Text>
            </Col>
          </Row>

          <Row size={1}>
            <Col>
              <Text style={styles.textaccount}>開門權限：</Text>
            </Col>
            <Col>
              <Text style={styles.textcolor}> Y e s </Text>
            </Col>
          </Row>
          <Row size={1}>
            <Col size={3}>
              <Text style={styles.textaccount}>
                窗簾自動 {this.state.statetext}
              </Text>
            </Col>
            <Col size={0.5}></Col>
            <Col size={2}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#D2E0E3',
                  borderRadius: 20,
                  flex: 1,
                  margin: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this.changeValue}>
                <Text style={styles._onOFF}>開/關</Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={1}>
            <Col size={3}>
              <Text style={styles.textaccount}>
                空調自動 {this.state.air_text}
              </Text>
            </Col>
            <Col size={0.5}></Col>
            <Col size={2}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#E8CED5',
                  borderRadius: 20,
                  flex: 1,
                  margin: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={this.air_state}>
                <Text style={styles._onOn}>開/關</Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={1}>
            <Col>
              <TouchableOpacity style={styles.btl} onPress={this.logout}>
                <Text style={styles.bttext}>登出</Text>
              </TouchableOpacity>
            </Col>
          </Row>

          <DialogInput
            isDialogVisible={this.state.isDialogVisible}
            title={'修改密碼'}
            message={'請輸入密碼(最多十個字)'}
            hintInput={'密碼'}
            cancelText="取消"
            submitText="確認修改"
            submitInput={inputText => {
              this.sendInput(inputText);
            }}
            closeDialog={() => {
              this.setState({isDialogVisible: false});
            }}></DialogInput>
        </Grid>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#FFFFF4',
  },

  unlock: {
    borderRadius: 10,
    backgroundColor: '#C8C8C8',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2,
  },
  white: {
    borderRadius: 10,
    backgroundColor: '#ffffffff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2,
  },
  textsty: {
    fontSize: 40,
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'black',
    textAlignVertical: 'center',
    flex: 1,
    textDecorationLine: 'underline',
    letterSpacing: 20,
  },
  textaccount: {
    fontSize: 25,
    textAlign: 'right',
    fontWeight: 'bold',
    color: 'black',
    textAlignVertical: 'center',
    flex: 1,
    letterSpacing: 5,
  },
  textaccountright: {
    fontSize: 25,
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'black',
    textAlignVertical: 'center',
    flex: 1,
    textDecorationLine: 'underline',
    letterSpacing: 10,
  },
  textcolor: {
    fontSize: 30,
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'red',
    textAlignVertical: 'center',
    flex: 1,
    textDecorationLine: 'underline',
    letterSpacing: 10,
  },
  data: {
    borderRadius: 20,
    backgroundColor: '#94C9C4',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datatext: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  warning: {
    borderRadius: 20,
    backgroundColor: '#CA9494',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningtext: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  btl: {
    borderRadius: 50,
    backgroundColor: '#F48777',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bttext: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  _onOFF: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlignVertical: 'center',
    flex: 1,
    letterSpacing: 10,
  },
  _onOn: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlignVertical: 'center',
    flex: 1,
    letterSpacing: 10,
  },
  min: {
    fontSize: 10,
    color: 'black',
  },
});
