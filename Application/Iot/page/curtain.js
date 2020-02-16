import React, {Component} from 'react';
import {StyleSheet, TextInput, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import {View, Text, Image, TouchableOpacity} from 'react-native-ui-lib';
import {Col, Grid, Row} from 'react-native-easy-grid';
export default class main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curtain: '',
      curtain_state: '',
    };
  }
  componentDidMount() {
    fetch('ip/html/curtain.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Contect-type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(responseJson => {
        // var powerswitch = JSON.stringify(responseJson.data[0].curtain_state);
        this.setState({
          curtain: responseJson.data[0].curtain_state,
        });
        if (this.state.curtain == 0) {
          this.setState({
            curtain_state: '窗簾現在關閉',
          });
        } else {
          this.setState({
            curtain_state: '窗簾現在開啟中',
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _off_curtain = () => {
    fetch('ip/html/off_curtain.php');
    fetch('http://192.168.137.24/gpio_0/0');
    this.setState({
      curtain_state: '窗簾現在關閉',
    });
  };
  _on_curtain = () => {
    fetch('ip/html/on_curtain.php');
    fetch('http://192.168.137.24/gpio_0/1');
    this.setState({
      curtain_state: '窗簾現在開啟中',
    });
  };

  //end air
  render() {
    return (
      <View style={styles.flexContainer}>
        {/* 背景 */}
        <Grid>
          <Row style={styles.center} size={2}>
            <Icon
              name="projection-screen"
              type="Foundation"
              color="#414141"
              size={100}></Icon>
          </Row>

          <Row style={styles.center}>
            <Text style={styles.bttext_red}>{this.state.curtain_state}</Text>
          </Row>
          <Row></Row>
          <Row>
            <TouchableOpacity style={styles.unlock} onPress={this._on_curtain}>
              <Text style={styles.unlocktext}>打開</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.lock} onPress={this._off_curtain}>
              <Text style={styles.unlocktext}>關掉</Text>
            </TouchableOpacity>
          </Row>

          {/* 空調 */}
        </Grid>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#F4FFF2',
  },

  bttext: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000',
  },
  bttext_red: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#F85C53',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  unlocktext: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 20,
  },
  unlock: {
    borderRadius: 10,
    backgroundColor: '#AAD5FF',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2,
  },
  lock: {
    borderRadius: 10,
    backgroundColor: '#FFF3C6',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2,
  },
});
