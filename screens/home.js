import { View, ScrollView, RefreshControl } from "react-native";
import { Text, Button, Card, Icon, Image, Dialog, ButtonGroup } from '@rneui/base';
import React from "react";
import style from "../assets/style";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from "react-native-gesture-handler";
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['VirtualizedLists should never be nested','source.uri']);

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            tes: "Menunggu API",
            refreshing: false,
            is_fetch: false,
            data: [],
            datalike: [],
            datacomment: [],
            dataview: [],
            selectedIndex: 0,
        }
        this.fetchData();
        this.fetchDataComment();
        this.fetchDataLike();
        this.fetchDataView();
    }

    like = (ori, meme_id) => {
        var method = ""
        if (ori == "heart") {
            method = "remove"
        } else if (ori == "heart-outline")
            method = "insert"
        console.log(method)
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "meme=" + meme_id + "&" + "user=" + global.activeuser + "&" + "method=" + method
        };
        try {
            fetch('https://ubaya.fun/react/160819001/likes.php', options)
                .then(response => response.json())
                .then(resjson => {
                    console.log(resjson)
                    if (resjson.result == "success") {
                        this.refetchdata();
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    viewAdd(banyak, idmeme) {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "view=" + (banyak + 1) + "&" + "meme_id=" + idmeme
        };
        try {
            // this.setState({refreshing:true});
            fetch('https://ubaya.fun/react/160819001/addview.php', options)
                .then(response => response.json())
                .then(resjson => {
                    console.log(resjson)
                    if (resjson.result == "success") {
                        this.refetchdata();
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    setSelectedIndex(value) {
        this.setState({ selectedIndex: value });
        this.refetchdata();
    }

    fetchData() {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "user=" + global.activeuser
        };
        try {
            fetch('https://ubaya.fun/react/160819001/get_memes.php', options)
                .then(response => response.json())
                .then(resjson => {
                    this.setState(
                        this.state = {
                            tes: resjson.result,
                            data: resjson.data,
                            is_fetch: true,
                        })
                })
        } catch (error) {
            console.log(error);
        }
    }

    fetchDataLike() {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "user=" + global.activeuser
        };
        try {
            fetch('https://ubaya.fun/react/160819001/get_memes_like.php', options)
                .then(response => response.json())
                .then(resjson => {
                    this.setState(
                        this.state = {
                            tes: resjson.result,
                            datalike: resjson.data,
                            is_fetch: true,
                        })
                })
        } catch (error) {
            console.log(error);
        }
    }

    fetchDataComment() {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "user=" + global.activeuser
        };
        try {
            fetch('https://ubaya.fun/react/160819001/get_memes_comment.php', options)
                .then(response => response.json())
                .then(resjson => {
                    this.setState(
                        this.state = {
                            tes: resjson.result,
                            datacomment: resjson.data,
                            is_fetch: true,
                        })
                })
        } catch (error) {
            console.log(error);
        }
    }

    fetchDataView() {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "user=" + global.activeuser
        };
        try {
            fetch('https://ubaya.fun/react/160819001/get_memes_view.php', options)
                .then(response => response.json())
                .then(resjson => {
                    this.setState(
                        this.state = {
                            tes: resjson.result,
                            dataview: resjson.data,
                            is_fetch: true,
                        })
                })
        } catch (error) {
            console.log(error);
        }
    }

    showdata(data) {
        return <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
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
                                        name={item.like}
                                        size={30}
                                        color="white"
                                    />
                                }
                                buttonStyle={{
                                    backgroundColor: 'rgba(0,0,0,0)',
                                }}
                                onPress={() => this.like(item.like, item.id)}
                            />
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 16,
                                color: '#fff'
                            }}>{item.numoflike} likes</Text>
                            <Ionicons
                                name="eye"
                                size={35}
                                color="white"
                                style={{ alignSelf: 'center', marginLeft: 20 }}
                            />
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 18,
                                color: '#fff'
                            }}> {item.view}</Text>
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
                                onPress={() => {
                                    this.viewAdd(item.view, item.id);
                                    const { navigation } = this.props;
                                    navigation.navigate("Meme Detail", { idmeme: item.id })
                                }}
                            />
                        </View>
                    </Card>
                </View>
            )}
        />
    }

    refetchdata() {
        if (this.state.selectedIndex == 0)
            this.fetchData()
        else if (this.state.selectedIndex == 1)
            this.fetchDataLike()
        else if (this.state.selectedIndex == 2)
            this.fetchDataComment()
        else if (this.state.selectedIndex == 3)
            this.fetchDataView()
    }

    show() {
        if (this.state.selectedIndex == 0) {
            return this.showdata(this.state.data)
        } else if (this.state.selectedIndex == 1) {
            return this.showdata(this.state.datalike)
        } else if (this.state.selectedIndex == 2) {
            return this.showdata(this.state.datacomment)
        } else if (this.state.selectedIndex == 3) {
            return this.showdata(this.state.dataview)
        }
    }

    render() {
        if (!this.state.is_fetch) {
            this.fetchData();
            this.fetchDataLike();
            this.fetchDataComment();
            this.fetchDataView();
            return <Dialog><Dialog.Loading /></Dialog>
        } else {

            return <View style={style.container}>
                <View>
                    <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 11 }}>Sort By</Text>
                    <ButtonGroup
                        buttons={[
                            <Icon
                                name='time'
                                type='ionicon'
                                color='#fff'

                            />,
                            <Icon
                                name='heart'
                                type='ionicon'
                                color='#fff'
                            />,
                            <Icon
                                name='chatbubble-ellipses'
                                type='ionicon'
                                color='#fff'
                            />,
                            <Icon
                                name='eye'
                                type='ionicon'
                                color='#fff'
                            />]}
                        selectedIndex={this.state.selectedIndex}
                        onPress={(value) => {
                            this.setSelectedIndex(value);

                        }}
                        containerStyle={{ borderRadius: 10 }}
                        buttonStyle={{ backgroundColor: '#a1346f' }}
                        selectedButtonStyle={{ backgroundColor: '#917f54' }}
                    />
                </View>
                <ScrollView style={style.container} contentContainerStyle={{ paddingBottom: 85 }} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.refetchdata()
                        }}
                    />
                }>
                    {this.show()}
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
        }
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <Home {...props} navigation={navigation} />;
};