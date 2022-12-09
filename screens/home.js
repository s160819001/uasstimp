import { View, ScrollView } from "react-native";
import { Text, Button, Card, Icon, Image } from '@rneui/base';
import React, { Component } from "react";
import style from "../assets/style";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from "react-native-gesture-handler";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            tes:"Menunggu API",
            data:[],
        }
        this.fetchData();
    }
    fetchData = () => {
         try {
          fetch('https://ubaya.fun/react/160819001/get_memes.php')
           .then(response => response.json())
           .then(resjson =>{
            this.setState(
             this.state = {
                 tes:resjson.result,
            //   tes:resjson.data[0].url,
                 data:resjson.data
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
            renderItem={({item}) => (
                <View>
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
                            }}>{item.numoflike} likes</Text>
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

            </View>
            )}
            />
        }
    render() {
        return <View style={style.container}>
            <ScrollView style={style.container}>
            {this.showdata(this.state.data)}
            <FAB
                    icon="plus"
                    style={style.fab}
                    mode='elevated'
                    onPress={() => {
                        const { navigation } = this.props;
                        navigation.navigate("Create Your Meme")
                    }} />
            </ScrollView>
        </View>
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <Home {...props} navigation={navigation} />;
};