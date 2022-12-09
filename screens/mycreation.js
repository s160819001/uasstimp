import { View, ScrollView } from "react-native";
import { Text, Button, Card, Icon, Image } from '@rneui/base';
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
            tes:"Menunggu API",
            data:[],
            namadepan:global.activeuser

        }
        this.fetchData();
    }
    fetchData = () => {
        const options = {
            method: 'POST',
            headers: new Headers({
             'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "namadepan="+this.state.namadepan
           };
        try {
         fetch('https://ubaya.fun/react/160819001/mycreation.php',options)
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
                {item.tglbuat}
                {"\n"}
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
                />
            </View>
        </Card>
        )}
        />
       }
    render() {
        return (
            <View style={style.container}>
                <ScrollView style={style.container}>
                    {this.showdata(this.state.data)}
                </ScrollView>
            </View>
        )
    }
}

export default MyCreation;