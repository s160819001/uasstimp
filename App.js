import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, NativeModules, Alert } from 'react-native';
import { Image, Avatar } from '@rneui/base';
import { FAB } from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '@rneui/base';
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
      islogin: false
    }
    global.giveup = false;
    global.confirmgiveup = false;

    this.cekLogin().then((item) => {
      if (item != null) {
        this.setState(
          this.state = {
            islogin: true
          });
      }
    });
  }

  cekLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      global.activeuser = value;
      console.debug(value);
      //  alert(value);
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
          // tabBarActiveBackgroundColor:'#f1dd96',
          // tabBarInactiveBackgroundColor:'#917f54',
          tabBarStyle:{backgroundColor:'#917f54'}
        })}
      >
        <Tab.Screen name="Home" component={NavMeme} options={{ headerShown: false }} />
        <Tab.Screen name="My Creation" component={MyCreation} options={{ headerShown: false }} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      </Tab.Navigator>
    )
  }

  giveup() {
    global.giveup = true;
    global.confirmgiveup = false;
  }
  cancelgiveup() {
    global.confirmgiveup = false;
  }



  render() {
    if (!this.state.islogin) {
      return (
        <NavigationContainer><Stack.Navigator>
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
      return (
        <NavigationContainer>
          {/* <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={this.DrawerNav}
              options={{
                title: 'Color Mixer',
                headerShown: false,
                headerStyle: {
                  backgroundColor: '#917f54',
                }
              }} />
            <Stack.Screen
              name="ColorMixer"
              component={ColorMixer}
              options={{
                title: 'Color Mixer',
                headerLeft: (props) => (
                  <HeaderBackButton
                    {...props}
                    onPress={() => {
                      Alert.alert(
                        "Warning",
                        "Are you sure you want to give up?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => this.cancelgiveup(),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => this.giveup() }
                        ]
                      );
                      global.confirmgiveup = true;
                    }}
                  />),
                headerStyle: {
                  backgroundColor: '#917f54',
                },
                headerTintColor: '#fff',
              }} />
          </Stack.Navigator> */}
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
            drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home"
              component={this.TabNav}

              options={{
                headerShown: true,
                headerTitle: 'Daily Meme Digest',
                headerStyle: {
                  backgroundColor: '#917f54',
                },
                headerTintColor: '#fff',
                // drawerItemStyle: { height: 0 }
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
                'https://picsum.photos/2048/2048',
            }}
          />

          <Text style={style.text_drawer_header}>
            <Avatar rounded size={'large'} source={{ uri: 'http://placekitten.com/300/300' }} />{'\n'}
            <Text style={{
              fontSize: 16,
              fontWeight: '300',
            }}>dk</Text>{'\n'}
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
      <Stack.Screen name="Meme Detail" component={Detail}/>
    </Stack.Navigator>
  );
}


