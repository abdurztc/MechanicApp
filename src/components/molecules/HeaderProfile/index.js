/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../utils';

const HeaderProfile = ({ title}) => {
  return (
  <View style={styles.container}>
  <Text style={styles.text}> {title} </Text>
</View>
  );
};

export default HeaderProfile;

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 16,
        paddingVertical: 30,
        backgroundColor:colors.white,
        flexDirection: 'row',
        alignItems: 'center',

      },
      text:{
        textAlign: 'center',
        flex: 1,
        fontSize: 20,
        fontFamily: 'Nunito-SemiBold',
        color:colors.text.primary,
      },
});
