import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {TouchableOpacity} from 'react-native-ui-lib';

export default class main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonColor: '#B2C2D2',
      colorva: 0,
      TextColor: '#000000',
      string: '',
      open: '',
    };
  }
  componentDidMount() {
    fetch('ip/html/homemode.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Contect-type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(responseJson => {
        var modevalue = JSON.stringify(responseJson.data[0].state);
        this.setState({
          colorva: responseJson.data[0].state,
        });
        if (this.state.colorva == 1) {
          this.setState({
            buttonColor: '#3C5166',
            TextColor: '#000000',
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  homeApplication = () => {
    const {navigate} = this.props.navigation;
    navigate('AC', {});
  };
  personal = () => {
    const {navigate} = this.props.navigation;
    navigate('personalsetting', {});
  };
  personal_num = () => {
    const {navigate} = this.props.navigation;
    navigate('person_num', {});
  };

  // unlockFunction = () => {
  //     fetch('http://10.3.141.1:8888/check.php', {
  //         method: 'put',
  //         header: {
  //             'Accept': 'application/json',
  //             'Contect-type': 'application/json',
  //         },
  //         body: JSON.stringify({

  //         })
  //     }).then((response) => response.json())
  //         .then((responseJson) => {
  //             var powerswitch = responseJson;
  //             if (powerswitch == "unlock") {
  //                 Alert.alert("警告", "大門解鎖")
  //             }
  //         })
  //         .catch((error) => {
  //             console.error(error);
  //         });
  //     fetch('http://10.3.141.1:8888/gate.php', {
  //         method: 'put',
  //         header: {
  //             'Accept': 'application/json',
  //             'Contect-type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //         })
  //     }).then((response) => {
  //         return response.text();

  //     })
  //         .then((responseJson) => {
  //             console.log(responseJson);
  //         })
  //         .catch((error) => {
  //             console.error(error);
  //         });

  // }

  unlockFunction = () => {
    setTimeout(() => {
      fetch('http://10.3.141.1:8888/check.php', {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Contect-type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then(response => {
          return response.text();
        })
        .then(responseJson => {
          console.log(responseJson);
          var powerswitch = responseJson;
          if (powerswitch == '"unlock"') {
            Alert.alert('警告', '大門解鎖');
            fetch('http://10.3.141.1:8888/gate.php', {
              method: 'post',
              header: {
                Accept: 'application/json',
                'Contect-type': 'application/json',
              },
              body: JSON.stringify({}),
            })
              .then(response => {
                return Response.text();
              })
              .then(responseJson => {
                console.error(error);
              });
          }
        })
        .catch(e => {
          if ((e = 'TyepErr: Network request failed')) {
            Alert.alert('警告', '請先連上中控系統');
          }
        });
    }, 500);
  };

  // unlockFunction = () => {
  //     setTimeout(() => {
  //         fetch('http://10.3.141.1:8888/check.php').then((response) => response.json())
  //             .then((responseJson) => {
  //                 var powerswitch = responseJson;
  //                 if (powerswitch == "unlock") {
  //                     Alert.alert("警告", "大門解鎖")
  //                 }
  //             })
  //             .catch((e) =>
  //                 alert(e))

  //     }, 500);

  // }
  changeColor() {
    if (this.state.colorva == 0) {
      fetch('ip/html/on_homemode.php', {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Contect-type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then(response => response.json())
        .then(responseJson => {})
        .catch(error => {
          console.error(error);
        });
      this.setState({
        buttonColor: '#3C5166',
        colorva: 1,
        TextColor: '#ffffff',
      });
      Alert.alert('提醒', '現在開啟Home Mode');
    } else if (this.state.colorva == 1) {
      fetch('ip/html/off_homemode.php', {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Contect-type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then(response => response.json())
        .then(responseJson => {})
        .catch(error => {
          console.error(error);
        });
      this.setState({
        buttonColor: '#B2C2D2',
        colorva: 0,
        TextColor: '#000000',
      });
      Alert.alert('提醒', '現在關閉Home Mode');
    }
  }
  // 下拉
  _onRefresh = () => {
    this.setState({
      isRefreshing: true,
    });
    setTimeout(() => {
      fetch('ip/html/homemode.php', {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Contect-type': 'application/json',
        },
        body: JSON.stringify({}),
      })
        .then(response => response.json())
        .then(responseJson => {
          var modevalue = JSON.stringify(responseJson.data[0].state);
          this.setState({
            colorva: responseJson.data[0].state,
          });
          if (this.state.colorva == 1) {
            this.setState({
              buttonColor: '#3C5166',
              TextColor: '#ffffff',
            });
          }
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
          <Row backgroundColor="#ffffffff" size={1}>
            <Col backgroundColor="#ffffffff">
              <TouchableOpacity
                // style={styles.TOhome} onPress={this.unlockFunction}

                style={{
                  backgroundColor: this.state.buttonColor,
                  borderRadius: 30,
                  flex: 1,
                  margin: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.changeColor()}>
                {/* <Text style={styles.hometext}>Home　Mode</Text> */}
                <Text
                  style={{
                    fontSize: 35,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: this.state.TextColor,
                    lineHeight: 80,
                    letterSpacing: 10,
                  }}>
                  Home　Mode
                </Text>
              </TouchableOpacity>
            </Col>
            <Col backgroundColor="#ffffffff">
              <TouchableOpacity
                style={styles.TOElectric}
                onPress={this.homeApplication}>
                <Text style={styles.totext}>家電設定</Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row backgroundColor="#ffffffff" size={1}>
            <Col backgroundColor="#ffffffff">
              <TouchableOpacity
                style={styles.TOold}
                onPress={this.personal_num}>
                <Text style={styles.totext}>屋內人數</Text>
              </TouchableOpacity>
            </Col>
            <Col backgroundColor="#ffffffff">
              <TouchableOpacity
                style={styles.TOpersonal}
                onPress={this.personal}>
                <Text style={styles.totext}>個人設定</Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <Row backgroundColor="#ffffffff" size={1}>
            <TouchableOpacity
              onPress={this.unlockFunction}
              style={styles.unlock}>
              <Text style={styles.unlocktext}>大門解鎖</Text>
            </TouchableOpacity>
          </Row>
        </Grid>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  TOhome: {
    borderRadius: 30,
    backgroundColor: '#BACBDD',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2,
  },
  TOElectric: {
    borderRadius: 30,
    backgroundColor: '#FAF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2,
  },
  TOold: {
    borderRadius: 30,
    backgroundColor: '#ECE3DE',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2,
  },
  TOpersonal: {
    borderRadius: 30,
    backgroundColor: '#D7C1A9',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2,
  },
  unlock: {
    borderRadius: 30,
    backgroundColor: '#EAB5A3',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2,
  },

  unlocktext: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 10,
  },
  hometext: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    // color: 'black',
    lineHeight: 80,
    letterSpacing: 10,
  },
  totext: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 40,
    lineHeight: 80,
  },
});
