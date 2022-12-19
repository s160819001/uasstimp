import { View, ScrollView, RefreshControl } from "react-native";
import { Text, Button, Card, Icon, Image, Dialog } from '@rneui/base';
import React, { Component } from "react";
import style from "../assets/style";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from "react-native-gesture-handler";

class MyCreation extends React.Component {
    constructor() {
        super();
        this.state = {
            tes: "Menunggu API",
            data: [],
            username: global.activeuser,
            is_fetch: false,
            refreshing: false
        }
        this.fetchData();
    }

    dateformatter(d) {
        var date = new Date(d);
        var formateddate = date.toLocaleString("en-GB", { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
        return formateddate;
    }
    fetchData = () => {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "username=" + this.state.username
        };
        try {
            fetch('https://ubaya.fun/react/160819001/mycreation.php', options)
                .then(response => response.json())
                .then(resjson => {
                    this.setState(
                        this.state = {
                            tes: resjson.result,
                            //   tes:resjson.data[0].url,
                            data: resjson.data,
                            is_fetch: true
                        })
                });
        } catch (error) {
            console.log(error);
        }
    }
    showdata(data) {
        return <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
            (
                <Card containerStyle={style.card}>
                    <View style={{
                        position: 'relative'
                    }}>
                        <Text style={style.text_atas}>{item.teksatas}</Text>
                        <Image
                            containerStyle={{
                                aspectRatio: 1,
                            }}
                            source={{
                                uri:
                                    item.url,
                            }}
                        />
                        <Text style={style.text_bawah}>{item.teksbawah}</Text>
                    </View>
                    <View>
                        <View>
                            <Text style={style.text_date}>{
                                this.dateformatter(item.tglbuat)}</Text>
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
                            }}> {item.numoflike} likes</Text>
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 16,
                                right: 35,
                                marginLeft: 'auto',
                                color: '#fff'
                            }}>{item.banyakcomment} comments</Text>
                            <Button
                                icon={
                                    <Ionicons
                                        name="chatbubble-ellipses"
                                        size={30}
                                        color="white"
                                    />
                                }
                                buttonStyle={{
                                    backgroundColor: 'rgba(0,0,0,0)',
                                }}
                                containerStyle={{
                                    position: 'absolute',
                                    right: -10,
                                    alignSelf: 'center',
                                }}
                                onPress={() => {
                                    const { navigation } = this.props;
                                    navigation.navigate("Meme Detail", { idmeme: item.id })
                                }}
                            />
                        </View>
                    </View>
                </Card>
            )}
        />
    }
    render() {
        if (!this.state.is_fetch) {
            this.fetchData();
            // return <Text>{this.state.tes}</Text>
            return <Dialog><Dialog.Loading /></Dialog>
        } else {
            return (
                <View style={style.container}>
                    <ScrollView style={style.container} refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                const options = {
                                    method: 'POST',
                                    headers: new Headers({
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }),
                                    body: "username=" + this.state.username
                                };
                                try {
                                    this.setState({ refreshing: true });
                                    fetch('https://ubaya.fun/react/160819001/mycreation.php', options)
                                        .then(response => response.json())
                                        .then(resjson => {
                                            this.setState(
                                                this.state = {
                                                    tes: resjson.result,
                                                    //   tes:resjson.data[0].url,
                                                    data: resjson.data,
                                                    is_fetch: true,
                                                    refreshing: false
                                                })
                                        });
                                } catch (error) {
                                    console.log(error);
                                }
                            }}
                        />
                    }>
                        {this.showdata(this.state.data)}
                    </ScrollView>
                </View>
            )
        }
    }
}
export default function (props) {
    const navigation = useNavigation();
    return <MyCreation {...props} navigation={navigation} />;
};