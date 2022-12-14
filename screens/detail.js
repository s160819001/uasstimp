import { View, ScrollView, TextInput } from "react-native";
import { Text, Button, Card, Image, Dialog } from '@rneui/base';
import React from "react";
import style from "../assets/style";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from "react-native-gesture-handler";
import ValidationComponent from "react-native-form-validator";

class Detail extends React.Component {
    constructor() {
        super();
        this.state = {
            tes: "Menunggu API",
            tes2: "tunggu",
            data: [],
            id: 0,
            is_fetch: false,
            comment: "",
            iduser: global.id
        }
    }

    _onPressButton = async () => {
        if (this.state.comment == "") {
            alert("Harap isi data komentar terlebih dahulu")
        }
        else {
            this.submitData();
            this.fetchData()
        }
    }

    submitData = () => {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "meme_id=" + this.state.id + "&" +
                "user_id=" + this.state.iduser + "&" +
                "content=" + this.state.comment
        };
        try {
            fetch('https://ubaya.fun/react/160819001/addcomment.php',
                options)
                .then(response => response.json())
                .then(resjson => {
                    console.log(resjson);
                    this.setState({ comment: "" });
                });
        } catch (error) {
            console.log(error);
        }
    }

    dateformatter(d) {
        var date = new Date(d);
        var formateddate = date.toLocaleString("en-GB", { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
        return formateddate;
    }

    sensorname(firstName, lastName, privasi) {
        if (privasi == 1) {
            var newFirstName = "";
            var newLastName = "";

            newFirstName = firstName.substring(0, 3);
            if (lastName == null) {
                newLastName = "";
            }

            for (var i = 0; i < firstName.length; i++) {
                if (i > 2) {
                    newFirstName += "*";
                }
            }
            if (lastName != null) {
                for (var i = 0; i < lastName.length; i++) {
                    newLastName += "*";
                }
            }
            return newFirstName + " " + newLastName;
        } else if (privasi == 0 && lastName != null) {
            return firstName + " " + lastName;
        } else if (privasi == 0 && lastName == null) {
            return firstName;
        }

    }

    fetchData = () => {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "id=" + this.state.id
        };
        try {
            fetch('https://ubaya.fun/react/160819001/detailmeme.php', options)
                .then(response => response.json())
                .then(resjson => {
                    console.log(resjson)
                    this.setState(
                        this.state = {
                            tes: resjson.result,
                            data: resjson.data,
                            is_fetch: true

                        })
                });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if (!this.state.is_fetch) {
            this.state.id = this.props.route.params.idmeme;
            this.fetchData();
            return <Dialog><Dialog.Loading /></Dialog>
        } else {
            return (
                <View style={style.container}>
                    <ScrollView automaticallyAdjustKeyboardInsets={true} style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0)' }}>
                        <ScrollView style={{ height: 575 }}>
                            <Card containerStyle={style.card}>
                                <View style={{
                                    position: 'relative'
                                }}>
                                    <Text style={style.text_atas}>{this.state.data.teksatas}</Text>
                                    <Image
                                        containerStyle={{
                                            aspectRatio: 1,
                                        }}
                                        source={{
                                            uri:
                                                this.state.data.url,
                                        }}
                                    />
                                    <Text style={style.text_bawah}>{this.state.data.teksbawah}</Text>
                                </View>
                                <View>
                                    <View>
                                        <Text style={style.text_date}>{
                                            this.dateformatter(this.state.data.tglbuat)}</Text>
                                    </View>
                                    <View style={{
                                        marginTop: 5,
                                        position: 'relative',
                                        flexDirection: 'row'
                                    }}>
                                        <Ionicons
                                            name="heart"
                                            size={30}
                                            color="white"
                                        />
                                        <Text style={{
                                            alignSelf: 'center',
                                            left: 5,
                                            fontSize: 16,
                                            color: '#fff'
                                        }}> {this.state.data.numoflike} likes</Text>
                                    </View>
                                </View>
                            </Card>
                            <FlatList
                                data={this.state.data.comment}
                                renderItem={({ item }) => (
                                    <Card containerStyle={style.card}>
                                        <View style={{
                                            position: 'relative',
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{
                                                fontSize: 14,
                                                color: '#ffffff',
                                                // margin: 10,
                                                fontWeight: 'bold'
                                            }}>{this.sensorname(item.namadepan, item.namabelakang, item.privasi)}</Text>
                                            <Text style={{
                                                alignSelf: 'center',
                                                fontSize: 14,
                                                right: 0,
                                                marginLeft: 'auto',
                                                color: '#fff'
                                            }}>{item.tgl}</Text>
                                        </View>
                                        <Text style={style.text_date}>{item.komentar}</Text>
                                    </Card>
                                )}
                            />
                        </ScrollView>
                        <View style={{
                            position: 'relative',
                            flexDirection: 'row'
                        }}>
                            <TextInput
                                style={{
                                    borderColor: '#fff',
                                    height: 40,
                                    borderWidth: 1,
                                    padding: 10,
                                    margin: 5,
                                    backgroundColor: '#fff',
                                    borderRadius: 50,
                                    width: '90%'
                                }}
                                // onChangeText={(Overview) => this.setState({ Overview })}
                                // value={this.state.Overview}
                                placeholder="Write Comments"
                                onChangeText={(comment) => this.setState({ comment })}
                                value={this.state.comment}
                            />
                            <Button
                                icon={
                                    <Ionicons
                                        name="send"
                                        size={25}
                                        color="#595855"
                                    />
                                }
                                buttonStyle={{
                                    backgroundColor: 'rgba(0,0,0,0)'
                                }}
                                containerStyle={{
                                    position: 'absolute',
                                    right: -5,
                                    alignSelf: 'center'
                                }}
                                onPress={this._onPressButton}
                            />
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <Detail {...props} navigation={navigation} />;
}