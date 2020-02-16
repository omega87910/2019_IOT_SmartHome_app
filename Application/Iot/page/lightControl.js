import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {TouchableOpacity} from 'react-native-ui-lib';
// import{ Icon} from 'react-native-vector-icons/MaterialCommunityIcons';
import {Icon} from 'react-native-elements';

export default class main extends React.Component {
  on_yellow() {
    fetch('ip/html/turn_on_yellow.php');
  }
  on_white() {
    fetch('ip/html/turn_on_white.php');
  }
  off() {
    fetch('ip/html/turn_off_light.php');
  }
  render() {
    return (
      <View style={styles.flexContainer}>
        <Grid>
          <Row justifyContent="center">
            <TouchableOpacity onPress={this.on_white}>
              <Icon
                name="lightbulb-on-outline"
                type="material-community"
                size={60}
                color="white"
                reverse
                reverseColor="black"></Icon>

              <Text style={styles.textaccount}>白光</Text>
            </TouchableOpacity>
          </Row>
          <Row justifyContent="center">
            <TouchableOpacity onPress={this.on_yellow}>
              <Icon
                name="lightbulb-on-outline"
                type="material-community"
                size={60}
                color="#FFFF86"
                reverse
                reverseColor="black"></Icon>
              <Text style={styles.textaccount}>黃光</Text>
            </TouchableOpacity>
          </Row>
          <Row justifyContent="center">
            <TouchableOpacity style={styles.white} onPress={this.off}>
              <Icon
                name="lightbulb-off-outline"
                type="material-community"
                size={60}
                color="#FE5F55"
                reverse
                reverseColor="white"></Icon>
              <Text style={styles.textaccount}>關</Text>
            </TouchableOpacity>
          </Row>
        </Grid>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#FFEEDD',
  },
  ba: {
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  textaccount: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    textAlignVertical: 'center',
    letterSpacing: 5,
  },
  unlocktext: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 20,
  },
  white: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
