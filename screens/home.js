import { View, ScrollView } from "react-native";
import { Text, Button, Card, Icon, Image } from '@rneui/base';
import React, { Component } from "react";
import style from "../assets/style";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

class Home extends Component {
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

                            <Button
                                icon={
                                    <Ionicons
                                        name="heart-outline"
                                        size={30}
                                        color="white"
                                    />
                                }
                                buttonStyle={{
                                    backgroundColor: 'rgba(0,0,0,0)',
                                }}
                            />
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 16,
                                color: '#fff'
                            }}>200 likes</Text>
                            <Button
                                icon={
                                    <Ionicons
                                        name="chatbubble-ellipses"
                                        size={30}
                                        color="white"
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
                </ScrollView>
                <FAB
                    icon="plus"
                    style={style.fab}
                    mode='elevated'
                    onPress={() => {
                        const { navigation } = this.props;
                        navigation.navigate("Create Your Meme")
                    }} />
            </View>
        )
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <Home {...props} navigation={navigation} />;
};