import React, { Component } from "react";
import { StyleSheet, View, Text, Alert, TouchableHighlightProperties } from "react-native";
import { Col, Grid, Row } from 'react-native-easy-grid';
import { TouchableOpacity } from 'react-native-ui-lib';
import { WebView } from 'react-native-webview';

export default class main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (

            <View style={styles.flexContainer}>
                <WebView
                    source={{ uri: 'http://10.3.141.1:8088' }}
                    style={{ marginTop: 20 }}
                />

            </View>

        );
    }
}
const styles = StyleSheet.create({

    flexContainer: {
        flex: 1,
        backgroundColor: '#ECF5FF'
    },
    TOhome: {
        borderRadius: 30,
        backgroundColor: '#BACBDD',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 2

    },
    TOElectric: {
        borderRadius: 30,
        backgroundColor: '#FAF3E0',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 2

    },
    TOold: {
        borderRadius: 30,
        backgroundColor: '#ECE3DE',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 2

    },
    TOpersonal: {
        borderRadius: 30,
        backgroundColor: '#D7C1A9',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 2

    },
    unlock: {
        borderRadius: 30,
        backgroundColor: '#EAB5A3',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 2
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
        lineHeight: 80

    },
});