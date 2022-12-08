import { View, ScrollView } from "react-native";
import { Text, Button, Card, Icon, Image } from '@rneui/base';
import React, { Component } from "react";
import style from "../assets/style";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

class MyCreation extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={style.container}>
                <ScrollView style={style.container}>
                    <Card containerStyle={style.card}>
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
                            }}>200 likes</Text>
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 16,
                                right: 35,
                                marginLeft: 'auto',
                                color: '#fff'
                            }}>5 comments</Text>
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
                            />
                        </View>
                    </Card>
                </ScrollView>
            </View>
        )
    }
}

export default MyCreation;