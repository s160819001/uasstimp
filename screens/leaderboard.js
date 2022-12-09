import { View, ScrollView } from "react-native";
import { Text, Button, ListItem, Avatar } from '@rneui/base';
import React, { Component } from "react";
import style from "../assets/style";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from "react-native-gesture-handler";

class Leaderboard extends React.Component {
    constructor() {
        super();
        this.state = {
            tes: "Menunggu API",
            data: [],
        }
        this.fetchData();
    }
    fetchData = () => {
        try {
            fetch('https://ubaya.fun/react/160819001/leaderboard.php')
                .then(response => response.json())
                .then(resjson => {
                    this.setState(
                        this.state = {
                            tes: resjson.result,
                            //   tes:resjson.data[0].url,
                            data: resjson.data
                        })
                });
        } catch (error) {
            console.log(error);
        }
    }

    showdata(data){
        return <FlatList
        data={data}
        // keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <ListItem
            containerStyle={style.listitem}
        >
            <Avatar rounded size={'medium'} source={{ uri: item.avatar }} />
            <ListItem.Content style={{ position: 'relative', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ position: 'absolute', left: 0 }}>
                    <ListItem.Title style={{ color: '#000', }}>
                        {item.namadepan} {item.namabelakang}
                    </ListItem.Title>
                </View>
                <View style={{ position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons
                        name="heart"
                        size={30}
                        color="#917f54"
                        style={{ right: 5 }}
                    />
                    <ListItem.Title style={{ color: '#000', }}>
                        {item.totallike}
                    </ListItem.Title>
                </View>
            </ListItem.Content>
        </ListItem>
        )}/>
    }
    render() {
        return (
            <ScrollView style={style.container}>
                {this.showdata(this.state.data)}
            </ScrollView>
        )
    }

}

export default Leaderboard;