import React, { Component } from "react";
import { AsyncStorage, StyleSheet,TextInput, Alert } from "react-native";
import { View, Text, Image, TouchableOpacity, Navigator } from 'react-native-ui-lib';
import { Col, Grid, Row } from 'react-native-easy-grid';
export default class main extends React.Component {

    componentDidMount() {
        this.getStorage().done();
        var _that = this;
        var keys = ["Userid", "Userpassword"];
        AsyncStorage.multiGet(keys, function (errs, result) {
            if (errs) {
                alert('錯誤');
                return;
            }
            _that.setState({
                //if result[0][1]不為空 傳回01 為空傳回''
                Userid: (result[0][1] != null) ? result[0][1] : '',
                Userpassword: (result[1][1] != null) ? result[1][1] : ''
            });
        });
    }
    getStorage = async () => {
        try {
            await AsyncStorage.multiGet(['Userid', 'Userpassword']).then((data) => {

                if (data[0][1] == null) {
                    const { navigate } = this.props.navigation;
                    navigate('login');
                }
                else {
                    const { navigate } = this.props.navigation;
                    navigate('home');
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
   

    render() {
        return (
            <View >
           
            </View>

        );
    }
}