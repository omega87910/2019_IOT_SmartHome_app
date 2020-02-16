import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Grid, Row, Col } from 'react-easy-grid';
import { Icon } from 'react-native-elements'
export default class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.selectSideMenu = this.selectSideMenu.bind(this);
    }
    selectSideMenu() {
        this.props.onSelectMenuItem();
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={[
                        { key: '老人1' },
                        { key: '老人2' },
                    ]}
                    renderItem={({ item }) => <Text  onPress={() => alert('this is button')} style={styles.item}>{item.key}</Text>}
                
                >
                    
                </FlatList>
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E0E0E0',
        flex: 1

    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,

        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        elevation: 1,
    },
     btl: {
        borderRadius: 30,
        backgroundColor: '#8DCBE9',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textsty: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        letterSpacing: 15,

    },
});

AppRegistry.registerComponent('ThirdPartyToolTest', () => LeftMenu);