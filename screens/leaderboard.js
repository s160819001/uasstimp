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
            privasi:0,
            check:true
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

    sensorname(firstName, lastName){
        var newFirstName = "";
        var newLastName = "";
    
        newFirstName = firstName.substring(0, 3);
        if(lastName ==null){
            newLastName = "";
        }

        
        
        for(var i = 0; i < firstName.length; i++){
        if(i > 2) {
            newFirstName += "*";
            }
        }
        if(lastName!=null){
            for(var i = 0; i < lastName.length; i++){
                newLastName += "*";
                }
        } 

        console.log(newFirstName + " " + newLastName);
        return newFirstName + " " + newLastName;
        
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
                        {/* {item.namadepan} {item.namabelakang} */}
                        {this.sensorname(item.namadepan,item.namabelakang)}
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