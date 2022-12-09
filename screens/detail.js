import { View, ScrollView, TextInput } from "react-native";
import { Text, Button, Card, Icon, Image } from '@rneui/base';
import React, { Component } from "react";
import style from "../assets/style";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from "react-native-gesture-handler";

class Detail extends React.Component {
    constructor() {
        super();
        this.state = {
            tes: "Menunggu API",
            data: [],
            id:0,
            is_fetch:false

        }
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
            body: "id=" + this.state.id
        };
        try {
            fetch('https://ubaya.fun/react/160819001/detailmeme.php', options)
                .then(response => response.json())
                .then(resjson => {
                    this.setState(
                        this.state = {
                            tes: resjson.result,
                              tes:resjson.data[0].url,
                            data: resjson.data,
                            // is_fetch:true
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
                            <Text style={style.text_body}>{
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
                        </View>
                    </View>
                <ScrollView>
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
                            }}>David Kurniawan</Text>
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 14,
                                right: 0,
                                marginLeft: 'auto',
                                color: '#fff'
                            }}>31 Des 22</Text>
                        </View>
                        <Text style={style.text_body}>Isi komentar di sini.</Text>
                    </Card>
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
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            width:'90%'
                        }}
                        // onChangeText={(Overview) => this.setState({ Overview })}
                        // value={this.state.Overview}
                        placeholder="Write Comments"
                        multiline={true} numberOfLines={4} />
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
                            right: 0
                        }}
                    />
                </View>

                </Card>
            )}
        />
    }
    render() {
        if(!this.state.is_fetch){
            this.state.id = this.props.route.params.idmeme;
            this.fetchData();

            return <Text>{this.state.tes}</Text>
        }else{
            return (
                <View style={style.container}>
                    <ScrollView style={style.container}>
                        {/* <Text>{this.state.data}</Text> */}
                {/* <Card containerStyle={style.card}>
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
                                    item.url,
                            }}
                        />
                        <Text style={style.text_bawah}>{this.state.data.teksbawah}</Text>
                    </View>
                    <View>
                        <View>
                            <Text style={style.text_body}>{
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
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 16,
                                right: 35,
                                marginLeft: 'auto',
                                color: '#fff'
                            }}>{this.state.data.banyakcomment} comments</Text>
                        </View>
                    </View>
                <ScrollView>
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
                            }}>{this.state.data.namadepan} {this.state.data.namabelakang}</Text>
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 14,
                                right: 0,
                                marginLeft: 'auto',
                                color: '#fff'
                            }}>{this.state.data.tgl}</Text>
                        </View>
                        <Text style={style.text_body}>{this.state.data.komentar}</Text>
                    </Card>
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
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            width:'90%'
                        }}
                        // onChangeText={(Overview) => this.setState({ Overview })}
                        // value={this.state.Overview}
                        placeholder="Write Comments"
                        multiline={true} numberOfLines={4} />
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
                            right: 0
                        }}
                    />
                </View>

                </Card> */}
            
                    {/* {this.showdata(this.state.data)} */}
    
                    </ScrollView>
    
                </View>
            )
        }
    }
}

export default function(props){
    const navigation = useNavigation();
    return<Detail {...props} navigation={navigation}/>;
}