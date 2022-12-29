import { View, TextInput, NativeModules, TouchableOpacity } from "react-native";
import { Text, Button, Avatar, CheckBox, Dialog } from '@rneui/base';
import React from "react";
import { FAB } from 'react-native-paper';
import style from "../assets/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import { LogBox } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import RBSheet from "react-native-raw-bottom-sheet";
import { manipulateAsync, SaveFormat, FlipType } from 'expo-image-manipulator';

LogBox.ignoreLogs(['VirtualizedLists should never be nested',]);

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tes: "Menunggu API",
            data: [],
            user_id: global.activeuser,
            private: 0,
            check: true,
            first_name: "",
            last_name: "",
            _imageUri: "https://ubaya.fun/blank.jpg",
            _image64: '',
            id: global.id,
            changed: !false,
            avatarChanged: !false,
            avatar: '',
            is_fetch: false
        }
        this.fetchData();
    }

    _onPressButton = () => {
        // if (this.state.first_name == "") {
        //     alert("Please update your name first");
        // }
        // else {

        this.submitData();
        // this.fetchData();

        // }

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
                            data: resjson.data,
                            private: resjson.data[0].privasi,
                            _imageUri: resjson.data[0].avatar,
                            avatar: resjson.data[0].avatar,
                            is_fetch: true
                        })
                });
        } catch (error) {
            console.log(error);
        }
    }

    updatePrivacy = () => {
        if (this.state.check)
            this.setState({ check: false })
        else if (!this.state.check)
            this.setState({ check: true })
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "user_id=" + this.state.user_id + "&" +
                "privacy=" + (this.state.check ? 1 : 0)
        };
        try {
            fetch('https://ubaya.fun/react/160819001/getuser.php',
                options)
                .then(response => response.json())
                .then(resjson => {
                    console.log(resjson);
                    if (resjson.result === 'success') {
                        alert('sukses')
                        this.fetchData();
                    }

                });
        } catch (error) {
            console.log(error);
        }
    }

    submitData = async () => {
        global.namadepan = await AsyncStorage.getItem('namadepan');
        global.namabelakang = await AsyncStorage.getItem('namabelakang');
        console.log(global.namadepan);
        console.log(global.namabelakang);
        if (this.state.first_name == "") {
            this.setState({ first_name: global.namadepan });
        }
        if (this.state.last_name == "") {
            this.setState({ last_name: global.namabelakang });
        }
        const data = new FormData();
        data.append('user_id', this.state.id);

        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "first_name=" + this.state.first_name + "&" +
                "last_name=" + this.state.last_name + "&" +
                "user_id=" + this.state.id
        };
        try {
            fetch('https://ubaya.fun/react/160819001/updateuser.php',
                options)
                .then(response => response.json())
                .then(async resjson => {
                    console.log(resjson);
                    if (resjson.result === 'success') {
                        alert('sukses');
                        await AsyncStorage.setItem('namadepan', this.state.first_name);
                        await AsyncStorage.setItem('namabelakang', this.state.last_name);
                        this.setState({ first_name: "", last_name: "" })
                        this.fetchData();
                    }
                });
        } catch (error) {
            console.log(error);
        };
    }

    submitAvatar = () => {
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
                    if (resjson.result === 'success') {
                        alert(resjson.msg);
                        this.setState({ avatar: this.state._imageUri, avatarChanged: !false });
                        global.avatar = this.state._imageUri;
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
            aspect: [1, 1],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {

            this._prosesFoto(result.uri);
        }
    }

    _imgKamera = async () => {
        const status = await ImagePicker.requestCameraPermissionsAsync();
        console.log(status);
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
            this._prosesFoto(result.uri);
        }
    }


    _prosesFoto = async (uri) => {
        const manipResult = await manipulateAsync(
            uri,
            [
                // { rotate: 90 },
                // { flip: FlipType.Horizontal },
                { resize: { height: 500, width: 500 } }
            ],
            { compress: 1, format: SaveFormat.JPEG, base64: true }
        );
        this.setState(
            this.state = {
                _imageUri: manipResult.uri,
                _image64: manipResult.base64,
                avatarChanged: !true
            }
        )
    };

    showdata(data) {
        return <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
            (
                <ScrollView automaticallyAdjustKeyboardInsets={true}>
                    <TouchableOpacity onPress={() => this.RBSheet.open()}>
                        <Avatar containerStyle={{
                            alignSelf: 'center',
                            marginVertical: 20
                        }} rounded size={'xlarge'} source={{ uri: this.state.avatar }} />
                    </TouchableOpacity>

                    <Text style={style.text_judul}>
                        {item.namadepan} {item.namabelakang}
                    </Text>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 16,
                        fontWeight: "500",
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
                            onEndEditing={() => {
                                if (this.state.first_name === "") {
                                    this.setState({ changed: !false });
                                }
                            }}
                            onChangeText={(first_name) => {
                                this.setState({ first_name });
                                if (this.state.first_name != null)
                                    this.setState({ changed: !true });
                            }}
                            value={this.state.first_name}
                        />
                        <Text style={style.text_body}>Last Name</Text>
                        <TextInput
                            style={style.input}
                            placeholder={item.namabelakang}
                            onEndEditing={() => {
                                if (this.state.last_name === "") {
                                    this.setState({ changed: !false });
                                }
                            }}
                            onChangeText={(last_name) => {
                                this.setState({ last_name });
                                if (this.state.last_name != null)
                                    this.setState({ changed: !true });
                            }}
                            value={this.state.last_name}
                        />

                        <CheckBox
                            title="Hide My Name"
                            containerStyle={{
                                backgroundColor: 'rgba(0,0,0,0)',
                            }}
                            checked={this.state.private == 0 ? false : true}
                            onPress={this.updatePrivacy}
                        />
                        <ScrollView>
                            <RBSheet
                                ref={ref => {
                                    this.RBSheet = ref;
                                }}
                                height={350}
                                openDuration={250}
                                closeOnDragDown={true}
                                customStyles={{
                                    container: {
                                        // justifyContent: "center",
                                        // alignItems: "center",
                                        backgroundColor: '#f0952a'
                                    }
                                }}
                            >

                                <Avatar containerStyle={{
                                    alignSelf: 'center',
                                    marginVertical: 5
                                }} rounded size={'xlarge'} source={{ uri: this.state._imageUri }} />
                                <Button
                                    onPress={this.submitAvatar}
                                    title="Save Avatar"
                                    disabled={this.state.avatarChanged}
                                    buttonStyle={style.btn_style}
                                    titleStyle={{ fontSize: 16 }}
                                    containerStyle={{ alignSelf: 'center' }}
                                />
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{
                                        color: "#fff",
                                        fontSize: 14,
                                        textAlign: 'center',
                                        fontWeight: '500'
                                    }}>Choose Avatar Image Source</Text>
                                </View>
                                <View style={style.viewRow2}>
                                    <Button buttonStyle={style.btn_style}
                                        containerStyle={{ marginHorizontal: 15 }}
                                        onPress={this._imgKamera}
                                        icon={{
                                            name: "camera",
                                            size: 15,
                                            color: "white"
                                        }}
                                        title="Camera" />
                                    {/* <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text> */}
                                    <Button buttonStyle={style.btn_style}
                                        containerStyle={{ marginHorizontal: 15 }}
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
                </ScrollView>
            )}
        />

    }

    render() {
        if (!this.state.is_fetch) {
            this.fetchData();
            return <Dialog><Dialog.Loading /></Dialog>
        } else {
            return (
                <View style={style.container}>
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

                    <Button
                        onPress={this._onPressButton}
                        title="Save Changes"
                        disabled={this.state.changed}
                        buttonStyle={style.btn_style}
                        containerStyle={{ position: 'absolute', bottom: 30, width: '100%', alignSelf: 'center', paddingHorizontal: 10 }}
                    />
                </View>
            )
        }
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