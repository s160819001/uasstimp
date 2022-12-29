import { View, ScrollView, RefreshControl } from "react-native";
import { Text, Button, ListItem, Avatar, Dialog } from '@rneui/base';
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
            privasi: 0,
            check: true,
            is_fetch: false
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
                            data: resjson.data,
                            is_fetch: true
                        })
                });
        } catch (error) {
            console.log(error);
        }
    }

    // showdataprivasi(data){
    //     return <FlatList
    //     data={data}
    //     // keyExtractor={(item) => item.id.toString()}
    //     renderItem={({ item }) => (
    //         <ListItem

    //         containerStyle={style.listitem}
    //     >

    //         <ListItem.Content style={{ position: 'relative', flexDirection: 'row', alignItems: 'center' }}>
    //             <View style={{ position: 'absolute', left: 0 }}>
    //                 <ListItem.Title style={{ color: '#000', }}>
    //                 {this.setState(
    //                     this.state= {
    //                         privasi:item.privasi})}
    //                 </ListItem.Title>
    //             </View>
    //         </ListItem.Content>
    //     </ListItem>
    //     )}/>
    // }

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

            console.log(newFirstName + " " + newLastName);
            return newFirstName + " " + newLastName;
        } else if (privasi == 0 && lastName != null) {
            return firstName + " " + lastName;
        } else if (privasi == 0 && lastName == null) {
            return firstName;
        }
    }

    showdata(data) {
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
                                {/* {item.namadepan} {item.namabelakang} */}
                                {this.sensorname(item.namadepan, item.namabelakang, item.privasi)}
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
            )} />
    }



    render() {
        if (!this.state.is_fetch) {
            this.fetchData();
            // return <Text>{this.state.tes}</Text>
            return <Dialog><Dialog.Loading /></Dialog>
        } else {

            return (

                <ScrollView style={style.container} refreshControl={
                    <RefreshControl
                        // refreshing={this.state.refreshing}
                        onRefresh={() => {
                            try {
                                // this.setState({ refreshing: true });
                                fetch('https://ubaya.fun/react/160819001/leaderboard.php')
                                    .then(response => response.json())
                                    .then(resjson => {
                                        this.setState(
                                            this.state = {
                                                // tes: resjson.result,
                                                //   tes:resjson.data[0].url,
                                                data: resjson.data,
                                                // is_fetch: true,
                                                // refreshing: false
                                            })
                                    })
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    />
                }>

                    {this.showdata(this.state.data)}

                </ScrollView>
            )
        }
    }

}

export default Leaderboard;