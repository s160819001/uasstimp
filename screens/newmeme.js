import { View, ScrollView, TextInput } from "react-native";
import { Text, Button, Card, Icon, Image, } from '@rneui/base';
import React, { Component } from "react";
import style from "../assets/style";

class NewMeme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageURL: "",
            TopText: "",
            BottomText: ""
        }
    }
    render() {
        return (
            <ScrollView style={style.container} >
                <View style={{
                    flex: 1,
                    backgroundColor: '#f1dd96',
                    padding: 10,
                }}>
                    <Text style={style.text_body}>Preview</Text>
                    <View style={{
                        position: 'relative'
                    }}>
                        <Text style={style.text_atas}>Text ATAS</Text>
                        <Image
                            containerStyle={{
                                aspectRatio: 1,
                            }}
                            source={{
                                uri:
                                    'https://picsum.photos/1080/1080',
                            }}
                        />
                        <Text style={style.text_bawah}>Text BAWAH</Text>
                    </View>
                    <Text style={style.text_body}>Image URL</Text>
                    <TextInput
                        style={style.input}
                        placeholder="Insert Image URL here"
                        ref="homepage"
                        onChangeText={(ImageURL) => this.setState({ ImageURL })}
                        value={this.state.Homepage}
                    />
                    <Text style={style.text_body}>Top Text</Text>
                    <TextInput
                        style={style.input}
                        placeholder="Insert Top Text here"
                        onChangeText={(T) => this.setState({ TopText })}
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


export default NewMeme;