import { Text, View, NativeModules } from 'react-native';
import { Image, Avatar } from '@rneui/base';
import { FAB } from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Component } from 'react';

import style from './assets/style';
import Home from './screens/home';
import Login from './screens/login';
import Register from './screens/register';
import MyCreation from './screens/mycreation';
import Leaderboard from './screens/leaderboard';
import Settings from './screens/settings';
import NewMeme from './screens/newmeme';
import Detail from './screens/detail';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false,
      namadepan: "",
      namabelakang: "",
      avatar: "",
      data: [],
      user_id: '',
      id: 0
    }

    this.cekLogin().then((item) => {
      if (item != null) {
        console.log(item)
        this.setState(
          this.state = {
            islogin: true,
            user_id: item
          });
        this.fetchData()
      }
    });

  }

  fetchData = () => {
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: "user_id=" + this.state.user_id
    };
    try {
      fetch('https://ubaya.fun/react/160819001/getuser.php', options)
        .then(response => response.json())
        .then(resjson => {
          this.setState(
            this.state = {
              namadepan: resjson.data[0].namadepan,
              namabelakang: resjson.data[0].namabelakang,
              avatar: resjson.data[0].avatar,
              id: resjson.data[0].id,
              data: resjson.data,
            })
        });
    } catch (error) {
      console.log(error);
    }
  }

  cekLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      global.activeuser = value;
      console.debug(value);
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  }

  TabNav() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            var iconName;
            if (route.name == 'Home') { iconName = 'home'; var iconColor = (focused) ? '#fff' : '#265e80'; }
            if (route.name == 'My Creation') { iconName = 'happy'; var iconColor = (focused) ? '#fff' : '#265e80'; }
            if (route.name == 'Leaderboard') { iconName = 'podium'; var iconColor = (focused) ? '#fff' : '#265e80'; }
            if (route.name == 'Settings') { iconName = 'cog'; var iconColor = (focused) ? '#fff' : '#265e80'; }
            return <Ionicons name={iconName} size={30} color={iconColor} />;
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#265e80',
          tabBarStyle: { backgroundColor: '#917f54' }
        })}
      >
        <Tab.Screen name="Home" component={NavMeme} options={{ headerShown: false }} />
        <Tab.Screen name="My Creation" component={NavMeme2} options={{ headerShown: false }} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      </Tab.Navigator>
    )
  }

  getnamadepan() {
    return this.state.namadepan
    // console.log(global.namadepan)
  }
  getnamabelakang() {
    return this.state.namabelakang
    // console.log(global.namadepan)
  }
  getavatar() {
    return this.state.avatar
    // console.log(global.namadepan)
  }
  getid() {
    return this.state.id
    // console.log(global.namadepan)
  }

  render() {
    if (!this.state.islogin) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Create Account" component={Register}
              options={{
                title: '',
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#f1dd96',
                }
              }} />
          </Stack.Navigator>
        </NavigationContainer>);
    } else {
      { global.namadepan = this.getnamadepan() }
      { global.namabelakang = this.getnamabelakang() }
      { global.avatar = this.getavatar() }
      { global.id = this.getid() }
      return (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName=" "
            screenOptions={({ route }) => ({
              drawerIcon: ({ focused }) => {
                var iconName;
                if (route.name == 'Home') { iconName = 'home'; var iconColor = (focused) ? 'blue' : 'gray'; }
                if (route.name == 'My Creation') { iconName = 'happy'; var iconColor = (focused) ? 'blue' : 'gray'; }
                if (route.name == 'Leaderboard') { iconName = 'podium'; var iconColor = (focused) ? 'blue' : 'gray'; }
                if (route.name == 'Settings') { iconName = 'cog'; var iconColor = (focused) ? 'blue' : 'gray'; }
                return <Ionicons name={iconName} size={30} color={iconColor} />;
              },
              tabBarActiveTintColor: 'blue',
              tabBarInactiveTintColor: 'gray',
            })}
            drawerContent={props => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen
              name="Home"
              component={this.TabNav}
              options={{
                headerShown: true,
                headerTitle: 'Daily Meme Digest',
                headerStyle: {
                  backgroundColor: '#917f54',
                },
                headerTintColor: '#fff',
                drawerIcon: ({ focused, size }) => (
                  <Ionicons
                    name="home"
                    size={size}
                    color={focused ? 'blue' : 'gray'}
                  />
                )
              }} />
            <Drawer.Screen
              name="My Creation"
              component={MyCreation}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#917f54',
                },
                headerTintColor: '#fff',
              }}
            />
            <Drawer.Screen
              name="Leaderboard"
              component={Leaderboard}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#917f54',
                },
                headerTintColor: '#fff',
              }}
            />
            <Drawer.Screen
              name="Settings"
              component={Settings}
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#917f54',
                },
                headerTintColor: '#fff',
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer >
      )
    }
  }

}

const doLogout = async () => {
  try {
    await AsyncStorage.clear()
    alert('Logged out');
    NativeModules.DevSettings.reload();
  } catch (e) {
  }
}

function CustomDrawerContent(props) {
  return (
    <View style={style.drawer}>
      <DrawerContentScrollView{...props}
        contentContainerStyle={{ backgroundColor: '#265e80', marginTop: -65 }}>
        <View style={style.drawer_header}>
          <Image
            containerStyle={{
              aspectRatio: 1,
              width: '100%',
            }}
            blurRadius={20}
            source={{
              uri:
                global.avatar,
            }}
          />
          <Text style={style.text_drawer_header}>
            <Avatar rounded size={'large'} source={{ uri: global.avatar }} />{'\n'}
            <Text style={{
              fontSize: 16,
              fontWeight: '300',
            }}>{global.namadepan} {global.namabelakang}</Text>{'\n'}
            {global.activeuser}{'\n'}

          </Text>
        </View>
        <View style={style.drawer}>
          <DrawerItemList{...props} />
        </View>
        <FAB
          icon="logout"
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            top: 110,
            borderRadius: 100,
          }}
          mode='elevated'
          onPress={doLogout} />
      </DrawerContentScrollView>
    </View>
  )
}

function NavMeme() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Create Your Meme" component={NewMeme} />
      <Stack.Screen name="Meme Detail" component={Detail} />
    </Stack.Navigator>
  );
}

function NavMeme2() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My Creation" component={MyCreation} options={{ headerShown: false }} />
      <Stack.Screen name="Meme Detail" component={Detail} />
    </Stack.Navigator>
  );
}

