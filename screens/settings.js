import { View, TextInput,NativeModules,TouchableOpacity,Image} from "react-native";
import { Text, Button, Avatar,CheckBox} from '@rneui/base';
import React, { Component } from "react";
import { FAB } from 'react-native-paper';
import style from "../assets/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import {LogBox} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import { manipulateAsync, SaveFormat,FlipType } from 'expo-image-manipulator';

LogBox.ignoreLogs(['VirtualizedLists should never be nested',]);

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tes: "Menunggu API",
            data: [],
            user_id: global.activeuser,
            private:0,
            check:true,
            first_name:"",
            last_name:"",
            _imageUri:"https://ubaya.fun/blank.jpg",
            _image64:'',
            id:global.id
        }
        this.fetchData();
    }
    _onPressButton = () => {
        if(this.state.first_name =="" || this.state.last_name ==""){
            alert("Please update your name first");
        }
        else{
            alert("do")
            this.submitData();
            this.fetchData();

        }

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
    updatePrivacy = () => {
        if(this.state.check)
        this.setState({check:false})
        else if(!this.state.check)
        this.setState({check:true})
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "user_id=" + this.state.user_id + "&" +
                "privacy=" + (this.state.check?1:0)
        };
        try {
            fetch('https://ubaya.fun/react/160819001/getuser.php',
                options)
                .then(response => response.json())
                .then(resjson => {
                    console.log(resjson);
                    if (resjson.result === 'success'){
                        alert('sukses')
                        this.fetchData();
                    } 

                });
        } catch (error) {
            console.log(error);
        }
    }
    submitData = () => {
        const data = new FormData();
        data.append('user_id', this.state.id);
        data.append('avatar', this.state._image64);

        const options1 = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'multipart/form-data'
            }),
            body: data
        };

        try {
            fetch('https://ubaya.fun/react/160819001/uploadfoto.php',
                options1)
                .then(response => response.json())
                .then(resjson => {
                    console.log(resjson);
                    if (resjson.result === 'success') 
                    {
                        alert(resjson.msg);

                        const options = {
                            method: 'POST',
                            headers: new Headers({
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }),
                            body: "first_name=" + this.state.first_name + "&" +
                                "last_name=" + this.state.last_name + "&" +
                                "avatar=" + this.state._image64 + "&" +
                                "user_id=" + this.state.id
                        };
                        try {
                            fetch('https://ubaya.fun/react/160819001/updateuser.php',
                                options)
                                .then(response => response.json())
                                .then(resjson => {
                                    console.log(resjson);
                                    if (resjson.result === 'success') alert('sukses')
                                });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    _imgGaleri = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
    
        if (!result.canceled) {
           
            this._prosesFoto(result.uri);
        }
    }
    
    _imgKamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
    
        if (!result.canceled) {
            this._prosesFoto(result.uri);
            this._prosesFoto(result.uri)
        }
    }

    
    _prosesFoto = async (uri) => {
        const manipResult = await manipulateAsync(
            uri,
            [                              
            { rotate: 90 },
            { flip: FlipType.Vertical },
            {resize:{height:480,width:360}}
            ],
            { compress: 1, format: SaveFormat.JPEG, base64:true }
        );
        //alert(manipResult.base64);
        this.setState(
            this.state = {
                _imageUri:manipResult.uri,
                _image64: manipResult.base64
            }
           )
        };


    showdata(data){
       return <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
            (
                    <View>
                        {/* {this.state._imageUri = item.avatar} */}
                    <TouchableOpacity onPress={() => this.RBSheet.open()}>
                    <Avatar containerStyle={{
                        alignSelf: 'center',
                        marginVertical: 20
                    }} rounded size={'xlarge'} source={{ uri:this.state._imageUri }} />
                    {/* <Image containerStyle={{
                        alignSelf: 'center',
                        marginVertical: 20
                    }} rounded size={'xlarge'}
                    
                    source={{uri: this.state._imageUri}}
                    /> */}
                    </TouchableOpacity>
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
                            onChangeText={(first_name) => this.setState({ first_name })}
                            value={this.state.first_name}
                        />
                        <Text style={style.text_body}>Last Name</Text>
                        <TextInput
                            style={style.input}
                            placeholder={item.namabelakang}
                            onChangeText={(last_name) => this.setState({ last_name })}
                            value={this.state.last_name}
                        />
                        
                        <CheckBox
                            title="Hide My Name"
                            containerStyle={{
                                backgroundColor: 'rgba(0,0,0,0)',
                            }}
                            checked={this.state.private==0?false:true}
                            onPress={this.updatePrivacy}
                        />
                        <Button
                            onPress={this._onPressButton}
                            title="Save Changes"
                            buttonStyle={style.btn_style}
                            containerStyle={{ bottom: 30, position: 'absolute', width: '100%', alignSelf: 'center' }}
                        />
                        <ScrollView>
                        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={100}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          <View style={style.viewRow2}>
            <Button style={style.btn}
            onPress={this._imgKamera}
             icon={{
              name: "camera",
              size: 15,
              color: "white"
            }} 
            title="Camera"/>
            <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
            <Button style={style.btn} 
            onPress={this._imgGaleri}
            icon={{
              name: "photo",
              size: 15,
              color: "white"
            }} 
            title="Gallery" />
          </View>

       </RBSheet>
                        </ScrollView>
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
                <TouchableOpacity onPress={() => this.RBSheet.open()}>
                    <Image containerStyle={{
                        alignSelf: 'center',
                        marginVertical: 20
                    }} rounded size={'xlarge'}
                    
                    source={{uri: this.state._imageUri}}
                    />
            </TouchableOpacity>
            
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