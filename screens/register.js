import React, { Component } from "react";
import { View, NativeModules, Image, TextInput } from "react-native";
import { Input, Button, Text } from '@rneui/base';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';

import style from "../assets/style";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repassword: '',
        };

    }

    create = async (username, password) => {
        if (password == this.state.repassword) {
            const options = {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),
                body: "user_id=" + username + "&user_password=" + password
            };

            const response = await fetch('https://ubaya.fun/react/160819001/register.php',
                options);
            const json = await response.json();

            if (json.result == 'success') {
                try {
                    // await AsyncStorage.setItem('namadepan', json.namadepan);
                    // await AsyncStorage.setItem('namabelakang', json.namabelakang);
                    alert('Register Sukses');
                    NativeModules.DevSettings.reload();
                } catch (e) {
                    // saving error
                }
            } else {
                alert('Username atau Password salah')
            }
        }
        else {
            alert('password salah');
        }


    }


    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#f1dd96',
            }}>
                <View style={{ marginHorizontal: '5%', display: 'flex' }}>
                    <Text style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                        color: '#265e80',
                        marginTop: 10,
                        alignSelf: 'center',
                    }} >
                        Daily Meme Digest
                    </Text>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 18,
                        color: '#265e80',
                    }}>
                        Create Account
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
                    <Input
                        onChangeText={(repassword) => this.setState({ repassword })}
                        disabledInputStyle={{ background: "#ddd" }}
                        secureTextEntry={true}
                        leftIcon={<Ionicons name='key' size={15} />}
                        placeholder="repeat password"
                    />
                    <Button
                        onPress={() => { this.create(this.state.username, this.state.password) }}
                        title="Create Account"
                        buttonStyle={style.btn_style}
                    // containerStyle={style.btn_container}
                    />
                </View>
            </View>

        );
    }
}

export default Register;