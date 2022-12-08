import { View, ScrollView } from "react-native";
import { Text, Button, ListItem, Avatar } from '@rneui/base';
import React, { Component } from "react";
import style from "../assets/style";
import Ionicons from 'react-native-vector-icons/Ionicons';

class Leaderboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={style.container}>
                <ListItem
                    containerStyle={style.listitem}
                >
                    <Avatar rounded size={'medium'} source={{ uri: 'http://placekitten.com/50/50' }} />
                    <ListItem.Content style={{ position: 'relative', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ position: 'absolute', left: 0 }}>
                            <ListItem.Title style={{ color: '#000', }}>
                                David Kurniawan
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
                                200
                            </ListItem.Title>
                        </View>
                    </ListItem.Content>
                </ListItem>
            </ScrollView>
        )
    }

}

export default Leaderboard;