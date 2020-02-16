import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Icon} from 'react-native-elements';
import {StyleSheet, View, AppRegistry, Dimensions} from 'react-native';
import {Image, Text, TouchableOpacity} from 'react-native-ui-lib';
let {width} = Dimensions.get('window');
import SideMenu from 'react-native-side-menu';
import Menu from './LeftSideMenu';
export default class LeftSideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.SelectMenuItemCallBack = this.SelectMenuItemCallBack.bind(this);
  }
  //關閉側欄
  SelectMenuItemCallBack() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  //點開側欄
  SelectToOpenLeftSideMenu() {
    this.setState({
      isOpen: true,
    });
  }
  render() {
    const menu = <Menu onSelectMenuItem={this.SelectMenuItemCallBack} />;
    return (
      // <SideMenu
      //     menu={menu}
      //     isOpen={this.state.isOpen}
      //     onChange={(isOpen) => {
      //         this.setState({
      //             isOpen: isOpen,
      //         })
      //     }}
      //     menuPosition={'left'}// 左或右
      //     openMenuOffset={0.5 * width}//欄寬
      //     edgeHitWidth={200}//距離
      // >
      <Grid>
        <Row backgroundColor="white" size={0.5} justifyContent="center">
          <Col size={1} justifyContent="center">
            {/* <Icon name='menu'
                                type='MaterialIcons'
                                color='#FE8B85'
                                size={32}
                                onPress={() => this.SelectToOpenLeftSideMenu()}
                            /> */}
          </Col>
          <Col size={5} justifyContent="center">
            <Text style={styles.headertext}>老人照護</Text>
          </Col>
          <Col size={1} justifyContent="center">
            {/* <Icon name='settings'
                                type='MaterialIcons'
                                color='#FE8B85'
                                size={32}
                                onPress={() => alert('寫東西啊')}
                            /> */}
          </Col>
        </Row>
        <Row backgroundColor="white" size={3}>
          <Image style={styles.img} source={require('../image/oldman.jpg')} />
        </Row>
        <Row backgroundColor="white" size={1} justifyContent="center">
          {/* <TouchableOpacity style={styles.row} onPress={() => alert('this is button')} >
                            <Icon name='heart'
                                type='entypo'
                                color='#FD453C'
                                size={50}
                            />
                            <Text style={styles.textsty}>心率正常</Text>
                        </TouchableOpacity> */}
        </Row>

        <Row backgroundColor="white" size={1} justifyContent="center">
          <TouchableOpacity
            style={styles.row}
            onPress={() => alert('this is button')}>
            <Icon
              name="local-hospital"
              type="MaterialIcons"
              color="#FD453C"
              size={50}
            />
            <Text style={styles.textsty}>設定提醒吃藥</Text>
          </TouchableOpacity>
        </Row>
        <Row backgroundColor="white" size={1} style={styles.row}>
          {/* <TouchableOpacity
                            onPress={() => alert('add some action')}
                        >
                            <Text style={styles.textsty}>一周健康報告</Text>
                        </TouchableOpacity> */}
        </Row>
      </Grid>

      // </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  img: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textsty: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 15,
  },
  headertext: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 15,
    justifyContent: 'center',
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('ThirdPartyToolTest', () => LeftSideMenu);
