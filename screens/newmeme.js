import { View, ScrollView, TextInput } from "react-native";
import { Text, Button, Image, } from '@rneui/base';
import React from "react";
import style from "../assets/style";
import ValidationComponent from 'react-native-form-validator';
export default class NewMeme extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            ImageURL: "https://picsum.photos/1080/1080",
            TopText: "",
            BottomText: "",
            id: global.id,
            numoflike: 0,
            view: 0
        }
    }

    _onPressButton = () => {
        if (this.validate({
            ImageURL: {
                required: true
            },
            TopText: {
                required: true,
            },
            BottomText: {
                required: true,
            },
        })) {
            this.submitData();
            alert("data berhasil disimpan")
            const { navigation } = this.props;
            navigation.popToTop();
            navigation.navigate("My Creation")
        }
    }

    submitData = () => {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "url=" + this.state.ImageURL + "&" +
                "teksatas=" + this.state.TopText + "&" +
                "teksbawah=" + this.state.BottomText + "&" +
                "user_id=" + this.state.id + "&" +
                "numoflike=" + this.state.numoflike + "&" +
                "view=" + this.state.view
        };
        try {
            fetch('https://ubaya.fun/react/160819001/addmeme.php',
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

    render() {
        return (

            <ScrollView automaticallyAdjustKeyboardInsets={true} style={style.container} >
                <View style={{
                    flex: 1,
                    backgroundColor: '#f1dd96',
                    padding: 10,
                }}>
                    <Text style={style.text_body}>Preview</Text>
                    <View style={{
                        position: 'relative'
                    }}>
                        <Text style={style.text_atas}>{this.state.TopText}</Text>
                        <Image
                            containerStyle={{
                                aspectRatio: 1,
                            }}
                            source={{
                                uri:
                                    this.state.ImageURL,
                            }}
                        />
                        <Text style={style.text_bawah}>{this.state.BottomText}</Text>
                    </View>
                    <Text style={style.text_body}>Image URL</Text>
                    <TextInput
                        style={style.input}
                        placeholder="Insert Image URL here"
                        ref="ImageURL"
                        onChangeText={(ImageURL) => this.setState({ ImageURL })}
                        value={this.state.ImageURL}
                    />
                    <Text style={style.text_body}>Top Text</Text>
                    <TextInput
                        style={style.input}
                        placeholder="Insert Top Text here"
                        onChangeText={(TopText) => this.setState({ TopText })}
                        value={this.state.TopText}
                    />
                    <Text style={style.text_body}>Bottom Text</Text>
                    <TextInput
                        style={style.input}
                        placeholder="Insert Bottom Text here"
                        onChangeText={(BottomText) => this.setState({ BottomText })}
                        value={this.state.BottomText}
                    />
                    <Text style={style.warntext}>
                        {/* {this.getErrorMessages()} */}
                    </Text>


                    <Button
                        onPress={this._onPressButton}
                        title="Submit"
                        buttonStyle={style.btn_style}
                    />

                </View>
            </ScrollView>
        )
    }
}