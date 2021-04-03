import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Gap, Header, Input} from '../../components';
import {Fire} from '../../config';
import {colors, showError, storeData, useForm} from '../../utils';

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    fullName: '',
    category: 'Spesialist Diesel',
    pendidikan: '',
    No_ID: '',
    experience: '',
    gender: 'pria',
    email: '',
    password: '',
  });
  const [itemCategory] = useState([
    {
      id: 1,
      label: 'Spesialist Diesel',
      value: 'Diesel',
    },
    {
      id: 2,
      label: 'Spesialist Petrol',
      value: 'Petrol',
    },
    {
      id: 3,
      label: 'Spesialist Motor Matic',
      value: 'Motor Matic',
    },
    {
      id: 4,
      label: 'Spesialist Motor Manual',
      value: 'Motor Matic',
    },
    {
      id: 5,
      label: 'Spesialist Transmisi',
      value: 'Transmisi',
    },
    {
      id: 6,
      label: 'Spesialist Kelistrikan',
      value: 'Kelistrikan',
    },
  ]);

  const [itemGender] = useState([
    {
      id: 1,
      label: 'Pria',
      value: 'pria',
    },
    {
      id: 2,
      label: 'Wanita',
      value: 'wanita',
    },
  ]);

  const onContinue = () => {
    dispatch({type: 'SET_LOADING', value: true});
    Fire.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        dispatch({type: 'SET_LOADING', value: false});
        setForm('reset');
        const data = {
          fullName: form.fullName,
          profession: form.category,
          category: form.category,
          rate: 5,
          pendidikan: form.pendidikan,
          No_ID: form.No_ID,
          experience: form.experience,
          gender: form.gender,
          email: form.email,
          uid: success.user.uid,
        };

        Fire.database()
          .ref(`mechanics/${success.user.uid}/`)
          .set(data);

        storeData('user', data);
        navigation.navigate('UploadPhoto', data);
      })
      .catch(err => {
        dispatch({type: 'SET_LOADING', value: false});
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={value => setForm('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Kategori"
            value={form.category}
            onValueChange={value => setForm('category', value)}
            select
            selectItem={itemCategory}
          />
          <Gap height={24} />
          <Input
            label="Pendidikan"
            value={form.pendidikan}
            onChangeText={value => setForm('pendidikan', value)}
          />
          <Gap height={24} />
          <Input
            label="No ID"
            value={form.No_ID}
            onChangeText={value => setForm('No_ID', value)}
          />
          <Gap height={24} />
          <Input
            label="Pengalaman"
            value={form.experience}
            onChangeText={value => setForm('experience', value)}
          />
          <Gap height={24} />
          <Input
            label="Jenis Kelamin"
            value={form.gender}
            onValueChange={value => setForm('gender', value)}
            select
            selectItem={itemGender}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={40} />
          <Button title="Continue" onPress={onContinue} />
          <Gap height={40} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  content: {paddingHorizontal: 40, flex: 1},
});
