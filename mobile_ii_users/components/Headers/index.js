import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../Styles';

const HomeHeader = () => {
    return (
        <View style={styles.navContainer}>
            <Text style={styles.navHeader} > Home </Text >
        </View>
    );
}

const SignUpHeader = () => {
    return (
        <View style={styles.navContainer}>
            <Text style={styles.navHeader} > Sign Up </Text >
        </View>
    );
}

const SignInHeader = () => {
    return (
        <View style={styles.navContainer}>
            <Text style={styles.navHeader} > Sign In </Text >
        </View>
    );
}

const ContentsHeader = () => {
    return (
        <View style={styles.navContainer}>
            <Text style={styles.navHeader} > Contents </Text >
        </View>
    );
}

module.exports = {
    HomeHeader, SignUpHeader, SignInHeader, ContentsHeader
};