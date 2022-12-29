import React, { Component } from "react";
import { View, NativeModules, Image } from "react-native";
import { Input, Button, Text } from '@rneui/base';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';

import style from "../assets/style";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      score: 0
    };

  }

  doLogin = async (username, password) => {
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: "user_id=" + username + "&user_password=" + password
    };

    const response = await fetch('https://ubaya.fun/react/160819001/login.php',
      options);
    const json = await response.json();

    if (json.result == 'success') {
      try {
        await AsyncStorage.setItem('username', json.username);
        await AsyncStorage.setItem('namadepan', json.namadepan);
        await AsyncStorage.setItem('namabelakang', json.namabelakang);
        // await AsyncStorage.setItem('namabelakang', json.namabelakang);
        alert('Login Sukses');
        NativeModules.DevSettings.reload();
      } catch (e) {
        // saving error
      }
    } else {
      alert('Username atau Password salah')
    }

  }


  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#f1dd96',
        justifyContent: 'center'
      }}>
        <View style={{ marginHorizontal: '5%', display: 'flex' }}>
          <Image
            source={{ uri: 'https://i.pinimg.com/originals/c8/1a/c5/c81ac51c21863b1c9251159b1ee59342.png' }}

            style={{ width: 245, height: 200, alignSelf: 'center' }}
          />
          <Text style={style.text_judul}>
            Daily Meme Digest
          </Text>
          <Input
            onChangeText={(username) => this.setState({ username })}
            disabledInputStyle={{ background: "#ddd" }}
            leftIcon={<Ionicons name='person' size={15} />}
            placeholder="username"
          />
          <Input
            onChangeText={(password) => this.setState({ password })}
            disabledInputStyle={{ background: "#ddd" }}
            secureTextEntry={true}
            leftIcon={<Ionicons name='key' size={15} />}
            placeholder="password"
          />
          <Button
            onPress={() => { this.doLogin(this.state.username, this.state.password) }}
            title="Sign In"
            buttonStyle={style.btn_style}
          // containerStyle={style.btn_container}
          />
          <Button
            onPress={() => {
              const { navigation } = this.props;
              navigation.navigate("Create Account")
            }}
            title="Create Account"
            type="outline"
            buttonStyle={{ borderRadius: 8, borderColor: '#a1346f' }}
            titleStyle={{ color: '#a1346f' }}
            // containerStyle={style.btn_container}
            containerStyle={{ marginVertical: '5%' }}
          />
        </View>
        {/* <Card containerStyle={style.card}>
          <Card.Title>Silahkan Login</Card.Title>
          <Card.Divider />
          <Input
            onChangeText={(username) => this.setState({ username })}
            disabledInputStyle={{ background: "#ddd" }}
            leftIcon={<Ionicons name='person' size={15} />}
            placeholder="username"
          />
          <Input
            onChangeText={(password) => this.setState({ password })}
            disabledInputStyle={{ background: "#ddd" }}
            secureTextEntry={true}
            leftIcon={<Ionicons name='key' size={15} />}
            placeholder="password"
          />
          <Button
            onPress={() => { this.doLogin(this.state.username, this.state.password) }}
            title="LOGIN"
            buttonStyle={style.btn_style}
            containerStyle={style.btn_container}
          />
        </Card> */}
      </View>

    );
  }
}

export default Login;



// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     width: 200,
//     borderWidth: 1,
//     padding: 10,
//   },
//   button: {
//     height: 40,
//     width: 200,
//   },
//   viewRow: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     alignItems: 'center',
//     paddingRight: 50,
//     margin: 3
//   }
// })