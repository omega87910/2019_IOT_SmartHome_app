import React, {Component} from 'react';
import {StyleSheet, TextInput, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {View, Text, Image, TouchableOpacity} from 'react-native-ui-lib';
import {Col, Grid, Row} from 'react-native-easy-grid';
export default class main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gettemp: '',
      gethumi: '',
      airstate: '',
      string: '',
      buttonstate: '',
      auto_state: '',
    };
  }
  componentDidMount() {
    fetch('ip/html/temperature.php', {
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
          gettemp: responseJson.data[0].temp,
          gethumi: responseJson.data[0].humi,
        });
      })
      .catch(error => {
        console.error(error);
      });

    fetch('ip/html/air_state.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Contect-type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(responseJson => {
        // var air = JSON.stringify(responseJson.data[0].air_state);

        this.setState({
          airstate: responseJson.data[0].air_state,
        });
        if (this.state.airstate == 0) {
          this.setState({
            string: 'OFF',
          });
        } else {
          this.setState({
            string: 'ON',
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
        var air = responseJson.data[0].air_auto_state;
        if (air == 1) {
          this.setState({
            buttonstate: true,
            auto_state: 'ON',
          });
        } else {
          this.setState({
            buttonstate: false,
            auto_state: 'OFF',
          });
        }
      })

      .catch(error => {
        console.error(error);
      });
  }

  air_off = () => {
    if (this.state.airstate == 0) {
      Alert.alert('警告', '空調已經是關著的');
    }
    fetch('ip/html/air_off.php');
    this.setState({
      string: 'OFF',
      airstate: 0,
    });
  };

  air_on = () => {
    if (this.state.airstate == 1) {
      Alert.alert('警告', '空調已經是開著的');
    }
    fetch('ip/html/air_on.php');
    this.setState({
      string: 'ON',
      airstate: 1,
    });
  };

  //end air
  render() {
    return (
      <View style={styles.flexContainer}>
        {/* 背景 */}
        <Grid>
          <Row size={0.1}></Row>
          <Row size={1.5} style={styles.center}>
            <Icon
              name="snowflake-o"
              type="font-awesome"
              color="#ffffff"
              size={60}></Icon>
          </Row>
          <Row size={1.5} style={styles.center}>
            <Col size={0.2}></Col>
            <Col size={1}>
              <Icon
                name="oil-temperature"
                type="material-community"
                color="red"
                size={35}></Icon>
            </Col>
            <Col size={3}>
              <Text style={styles.bttext}>溫度{this.state.gettemp}℃</Text>
            </Col>
            <Col size={0.2}></Col>
            <Col size={0.5}>
              <Icon
                name="ios-water"
                type="ionicon"
                color="#1E518A"
                size={35}></Icon>
            </Col>
            <Col size={3}>
              <Text style={styles.bttext}>濕度{this.state.gethumi}%</Text>
            </Col>
          </Row>

          <Row size={1.5} style={styles.center}>
            <Text style={styles.bttext}>空調狀態：</Text>
            <Text style={styles.bttext_red}>{this.state.string}</Text>
          </Row>
          <Row size={1.5} style={styles.center}>
            <Text style={styles.bttext}>空調自動：</Text>
            <Text style={styles.bttext_red}>{this.state.auto_state}</Text>
          </Row>
          <Row style={styles.center} size={0.5}>
            <Text style={styles.min_text}>欲手動設定請至個人設定調整</Text>
          </Row>
          <Row size={1.5}>
            <TouchableOpacity
              style={styles.unlock}
              disabled={this.state.buttonstate}
              onPress={this.air_on}>
              <Text style={styles.unlocktext}>打開</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lock}
              disabled={this.state.buttonstate}
              onPress={this.air_off}>
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
    backgroundColor: '#C2E7F9',
  },
  bttext: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000',
  },
  bttext_red: {
    fontSize: 30,
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
    backgroundColor: '#FFE88A',
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
  min_text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000000',
  },
});
