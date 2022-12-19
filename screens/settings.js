import { View, TextInput,NativeModules} from "react-native";
import { Text, Button, Avatar,CheckBox} from '@rneui/base';
import React, { Component } from "react";
import { FAB } from 'react-native-paper';
import style from "../assets/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";


class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tes: "Menunggu API",
            data: [],
            user_id: global.activeuser,
            private:0,
            check:true
        }
        this.fetchData();
    }
    _onPressButton = () => {
        alert("hai")

            // const { navigation } = this.props;
            // navigation.popToTop();
            // navigation.navigate("My Creation")
        
    }
    dateformatter(d) {
        var date = new Date(d);
        var formateddate = date.toLocaleString("en-GB", { month: 'long', year: 'numeric', hour12: false });
        return formateddate;
    }
    fetchData = () => {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "user_id=" + this.state.user_id
        };
        try {
            fetch('https://ubaya.fun/react/160819001/getuser.php', options)
                .then(response => response.json())
                .then(resjson => {
                    this.setState(
                        this.state = {
                            // tes: resjson.result,
                            //   tes:resjson.data[0].privasi,
                            data: resjson.data,
                            private:resjson.data[0].privasi
                            // tes: this.state.data.privasi
                        })
                });
        } catch (error) {
            console.log(error);
        }
    }
    showdata(data){
       return <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
            (
                    <View>
                    <Avatar containerStyle={{
                        alignSelf: 'center',
                        marginVertical: 20
                    }} rounded size={'xlarge'} source={{ uri: item.avatar }} />
                    <Text style={style.text_judul}>
                        {item.namadepan} {item.namabelakang}
                    </Text>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 16,
                        fontWeight: "bold",
                        color: '#265e80',
                    }}>
                        Active since {this.dateformatter(item.tgldaftar)}
                    </Text>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 16,
                        fontWeight: '300',
                        color: '#265e80',
                        marginVertical: 10
                    }}>
                        {item.username}
                    </Text>
                    <View style={{
                        flex: 1,
                        backgroundColor: '#f1dd96',
                        padding: 10,
                    }}>
                        <Text style={style.text_body}>First Name</Text>
                        <TextInput
                            style={style.input}
                            placeholder={item.namadepan}
                        />
                        <Text style={style.text_body}>Last Name</Text>
                        <TextInput
                            style={style.input}
                            placeholder={item.namabelakang}
                        />
                        
                        <CheckBox
                            title="Hide My Name"
                            containerStyle={{
                                backgroundColor: 'rgba(0,0,0,0)',
                            }}
                            value={this.state.check}
                        />
                        {/* <Button
                            onPress={this._onPressButton}
                            title="Save Changes"
                            buttonStyle={style.btn_style}
                            containerStyle={{ bottom: 30, position: 'absolute', width: '100%', alignSelf: 'center' }}
                        /> */}
                    </View>
                    </View>
            
            )}
            />
        
    }
    render() {
    
        return (
            <View style={style.container}>
                {/* {this.state.data['avatar']} */}
                {/* {this.state.private} */}
                {this.showdata(this.state.data)}
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