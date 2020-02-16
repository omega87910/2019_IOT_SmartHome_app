import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView, RefreshControl} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Feather';

export default class main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: '',
      isRefreshing: false,
    };
  }

  componentDidMount() {
    fetch('ip/html/person_num.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Contect-type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(responseJson => {
        var people = responseJson.data[0].num;

        this.setState({
          num: people,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  _onRefresh = () => {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      fetch('ip/html/person_num.php', {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Contect-type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then(response => response.json())
        .then(responseJson => {
          var people = responseJson.data[0].num;

          this.setState({
            num: people,
          });
        })
        .catch(error => {
          console.error(error);
        });
      this.setState({
        isRefreshing: false,
      });
    }, 500);
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{flex: 1, backgroundColor: '#F1FEF8'}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
          />
        }>
        <Grid>
          <Row size={0.5}></Row>
          <Row justifyContent="center">
            <Icon
              justifyContent="center"
              alignItems="center"
              name="user"
              type="AntDesign"
              size={100}
              color="#000000"></Icon>
          </Row>
          <Row>
            <Text style={styles.textsty}>屋內目前人數</Text>
          </Row>
          <Row>
            <Text style={styles.textsty}>{this.state.num}人</Text>
          </Row>
          <Row size={0.5}></Row>
        </Grid>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  textsty: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    textAlignVertical: 'center',
    flex: 1,
    letterSpacing: 20,
  },
});
