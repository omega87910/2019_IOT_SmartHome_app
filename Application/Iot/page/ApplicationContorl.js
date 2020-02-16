import React, {Component} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {TouchableOpacity} from 'react-native-ui-lib';
import Dialog from 'react-native-dialog';

export default class main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: '',
      danger_on: '',
      danger_off: '',
    };
  }
  lightcontrol = () => {
    const {navigate} = this.props.navigation;
    navigate('lightControl', {});
  };
  componentDidMount = () => {
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
        this.setState({
          state: responseJson.data[0].curtain_auto_state,
        });
      })

      .catch(error => {
        console.error(error);
      });
  };
  // curtain
  curtain = () => {
    if (this.state.state == 1) {
      Alert.alert('警告', '目前已經開啟自動窗簾模式\n請到個人設定調整');
    } else {
      const {navigate} = this.props.navigation;
      navigate('curtain', {});
    }
  };

  air_dialog = () => {
    const {navigate} = this.props.navigation;
    navigate('air_control', {});
  };

  // -----------------------------------------------------
  // danger dialog
  danger_dialog = () => {
    fetch('ip/html/danger_state.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Contect-type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(responseJson => {
        var danger = JSON.stringify(responseJson.data[0].danger_state);
        if (danger.match('1')) {
          this.setState({danger_on_dialogVisible: true});
        } else if (danger.match('0')) {
          this.setState({danger_off_dialogVisible: true});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  // on
  handleCancel_danger_on = () => {
    this.setState({danger_on_dialogVisible: false});
    fetch('ip/html/off_danger.php');
    fetch('http://192.168.137.24/gpio_0/0');
  };

  handleDelete_danger_on = () => {
    this.setState({danger_on_dialogVisible: false});
  };
  // off
  handleCancel_danger_off = () => {
    this.setState({danger_off_dialogVisible: false});
    fetch('ip/html/on_danger.php');
    fetch('http://192.168.137.24/gpio_0/1');
  };

  handleDelete_danger_off = () => {
    this.setState({danger_off_dialogVisible: false});
  };
  to_motion = () => {
    const {navigate} = this.props.navigation;
    navigate('motion', {});
  };

  render() {
    return (
      <View style={styles.flexContainer}>
        <Grid>
          <Row backgroundColor="#ffffffff" size={1}>
            <TouchableOpacity
              style={styles.unlock}
              onPress={this.danger_dialog}>
              <Text style={styles.unlocktext}>危險家電</Text>
            </TouchableOpacity>
          </Row>
          <Row backgroundColor="#ffffffff" size={1}>
            <TouchableOpacity style={styles.white} onPress={this.lightcontrol}>
              <Text style={styles.unlocktext}>電燈控制</Text>
            </TouchableOpacity>
          </Row>
          <Row backgroundColor="#ffffffff" size={1}>
            <TouchableOpacity style={styles.unlock} onPress={this.curtain}>
              <Text style={styles.unlocktext}>窗簾控制</Text>
            </TouchableOpacity>
          </Row>
          <Row backgroundColor="#ffffffff" size={1}>
            <TouchableOpacity style={styles.white} onPress={this.air_dialog}>
              <Text style={styles.unlocktext}>空調控制</Text>
            </TouchableOpacity>
          </Row>
          <Row backgroundColor="#ffffffff" size={1}>
            <TouchableOpacity style={styles.unlock} onPress={this.to_motion}>
              <Text style={styles.unlocktext}>監控控制</Text>
            </TouchableOpacity>
          </Row>
          <Row size={3}></Row>

          <Dialog.Container visible={this.state.danger_on_dialogVisible}>
            <Dialog.Title>現在危險家電是開著的唷</Dialog.Title>
            <Dialog.Description>想要關掉嗎</Dialog.Description>
            <Dialog.Button
              color="#black"
              label="關掉"
              onPress={this.handleCancel_danger_on}
            />
            <Dialog.Button
              color="red"
              label="不要"
              onPress={this.handleDelete_danger_on}
            />
          </Dialog.Container>

          <Dialog.Container visible={this.state.danger_off_dialogVisible}>
            <Dialog.Title>現在危險家電是關著的唷</Dialog.Title>
            <Dialog.Description></Dialog.Description>

            <Dialog.Button
              color="red"
              label="關閉視窗"
              onPress={this.handleDelete_danger_off}
            />
          </Dialog.Container>
        </Grid>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#F1FEF8',
  },

  unlock: {
    borderRadius: 10,
    backgroundColor: '#EBEBEB',
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
  unlocktext: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 20,
  },
});
