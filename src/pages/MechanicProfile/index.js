/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Header, Profile, ProfileItem, Gap} from '../../components';
import {colors} from '../../utils';

const MechanicProfile = ({navigation, route}) => {
  const dataMechanic = route.params;
  return (
    <View style={styles.page}>
      <Header title="Mechanic Profile" onPress={() => navigation.goBack()} />
      <Profile
        name={dataMechanic.data.fullName}
        desc={dataMechanic.data.profession}
        photo={{uri: dataMechanic.data.photo}}
      />
      <Gap height={10} />
      <ProfileItem label="Pendidikan" value={dataMechanic.data.pendidikan} />
      <ProfileItem
        label="Pengalaman"
        value={dataMechanic.data.experience}
      />
      <ProfileItem label="No. ID" value={dataMechanic.data.No_ID} />
      <View style={styles.action}>
        <Button
          title="Start Consultation"
          onPress={() => navigation.navigate('Chatting', dataMechanic)}
        />
      </View>
    </View>
  );
};

export default MechanicProfile;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  action: {paddingHorizontal: 40, paddingTop: 23},
});
