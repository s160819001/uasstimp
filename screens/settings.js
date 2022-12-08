import { View, TextInput,NativeModules } from "react-native";
import { Text, Button, Avatar, CheckBox } from '@rneui/base';
import React, { Component } from "react";
import { FAB } from 'react-native-paper';
import style from "../assets/style";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={style.container}>
                <Avatar containerStyle={{
                    alignSelf: 'center',
                    marginVertical: 20
                }} rounded size={'xlarge'} source={{ uri: 'http://placekitten.com/1080/1080' }} />
                <Text style={style.text_judul}>
                    David Kurniawan
                </Text>
                <Text style={{
                    alignSelf: 'center',
                    fontSize: 16,
                    fontWeight: "bold",
                    color: '#265e80',
                }}>
                    Active since Dec 2022
                </Text>
                <Text style={{
                    alignSelf: 'center',
                    fontSize: 16,
                    fontWeight: '300',
                    color: '#265e80',
                    marginVertical: 10
                }}>
                    dk
                </Text>
                <View style={{
                    flex: 1,
                    backgroundColor: '#f1dd96',
                    padding: 10,
                }}>
                    <Text style={style.text_body}>First Name</Text>
                    <TextInput
                        style={style.input}
                        placeholder="Your First Name"
                    />
                    <Text style={style.text_body}>Last Name</Text>
                    <TextInput
                        style={style.input}
                        placeholder="Your Last Name"
                    />
                    <CheckBox
                        title="Hide My Name"
                        checked
                        containerStyle={{
                            backgroundColor: 'rgba(0,0,0,0)',
                        }}
                    />
                    <Button
                        onPress={this._onPressButton}
                        title="Save Changes"
                        buttonStyle={style.btn_style}
                        containerStyle={{ bottom: 30, position: 'absolute', width: '100%', alignSelf: 'center' }}
                    />
                </View>
                <FAB
                    icon="logout"
                    style={{
                        position: 'absolute',
                        margin: 16,
                        right: 0,
                        top: 0,
                        borderRadius: 100,
                    }}
                    mode='elevated'
                    onPress={doLogout} />
            </View>
        )
    }
}

const doLogout = async () => {
    try {
      await AsyncStorage.clear()
      alert('Logged out');
      NativeModules.DevSettings.reload();
    } catch (e) {
    }
  }

export default Settings;