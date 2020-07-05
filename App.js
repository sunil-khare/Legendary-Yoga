import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {createDrawerNavigator,DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native';
import {View,Image,StyleSheet,Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Foundation from 'react-native-vector-icons/Foundation'

 import{
   Page1Screen,
   Page2Screen,
   Page3Screen,
   Page4Screen,
   Page5Screen,
   Page6Screen,
   Page7Screen,
   Page8Screen,
   Page9Screen,
   Page10Screen,
   Page11Screen,
   HomeScreen,
   MediaScreen,
   SettingScreen,
   SearchScreen,
   NotesScreen,
   EditScreen,
   ImageViewScreen
 } from "./screens";

const DrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}  >
<View style={StyleSheet.flatten([styles.stack])}>


        <View style={{flex:1,flexDirection:"row",backgroundColor:"black"}}>
        <Image source={{uri:'http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/logo_icon.jpeg'}}  style={{marginLeft:5,height:120,width:80}}/>
          <View>
          <Text style={{color:"white",fontSize:20,marginTop:30,paddingLeft:5}}>Legendary Yoga 2020</Text>
          <Text style={{color:"white",fontSize:12,marginTop:2,paddingLeft:5}}>Robiwan McKennobi</Text>
          </View>
          
             
        </View>
        <View style={{backgroundColor:"gray",padding:10}} >
            <Text style={{color:"white",fontSize:17,textAlign:"center"}}>Table of Content</Text>
          </View>
          <DrawerItem
            label="Home"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Home')}
          />
           <DrawerItem
            label="Introduction"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Introduction')}
          />
           <DrawerItem
            label="The Legent of Garuda (Eagle)"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('The Legent of Garuda (Eagle)')}
          />
          <DrawerItem
            label="The Legend of Hanuman (Monkey)"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('The Legend of Hanuman (Monkey)')}
          />
          <DrawerItem
            label="The Legend of Virabhadra (Warrior)"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('The Legend of Virabhadra (Warrior)')}
          />
          <DrawerItem
            label="The Legend of Nataraj (Dancer)"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('The Legend of Nataraj (Dancer)')}
          />
          <DrawerItem
            label="The Legend of Matsyendra (Twist)"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('The Legend of Matsyendra (Twist)')}
          />
          <DrawerItem
            label="The Legend of Shiva, Kali and the Demon Raktabija"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('The Legend of Shiva, Kali and the Demon Raktabija')}
          />
          <DrawerItem
            label="Acknowledgements"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Acknowledgements')}
          />
          <DrawerItem
            label="Credits"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Credits')}
          />
           <DrawerItem
            label="Contacts"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Contacts')}
          />
          <DrawerItem
            label="Behind the Scenes"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Behind the Scenes')}
          />
</View>
    </DrawerContentScrollView>
  );
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MyStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Media" component={MediaScreen}  />
      <Stack.Screen name="ImageView" component={ImageViewScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator drawerStyle={styles.drawerStyles}
    drawerContent={props => {
      return <DrawerContent {...props} />;
    }}
  >
    <Drawer.Screen name="Home" component={HomeScreen}  />
    <Drawer.Screen name="Introduction" component={Page1Screen}  />
    <Drawer.Screen name="The Legent of Garuda (Eagle)" component={Page2Screen} />
    <Drawer.Screen name="The Legend of Hanuman (Monkey)" component={Page3Screen}   />
    <Drawer.Screen name="The Legend of Virabhadra (Warrior)" component={Page4Screen}  />
    <Drawer.Screen name="The Legend of Nataraj (Dancer)" component={Page5Screen}  />
    <Drawer.Screen name="The Legend of Matsyendra (Twist)" component={Page6Screen}  />
    <Drawer.Screen name="The Legend of Shiva, Kali and the Demon Raktabija" component={Page7Screen}  />
    <Drawer.Screen name="Acknowledgements" component={Page8Screen}  />
    <Drawer.Screen name="Credits" component={Page9Screen} />
    <Drawer.Screen name="Contacts" component={Page10Screen}  />
    <Drawer.Screen name="Behind the Scenes" component={Page11Screen}  />
    <Drawer.Screen name="Edit" component={EditScreen}  />
    
  </Drawer.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Chapters" component={MyDrawer} options={{
          tabBarLabel: 'Chapters',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bars" color={color} size={size} />
          ),
        }}  />
      <Tab.Screen name="Media" component={MyStack} options={{
          tabBarLabel: 'Media',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="perm-media" color={color} size={size}></MaterialIcons>
          ),
        }} />
       <Tab.Screen name="Notes" component={NotesScreen} options={{
          tabBarLabel: 'Notes',
          tabBarIcon: ({ color, size }) => (
            <Foundation name="clipboard-notes" color={color} size={size}></Foundation>
          ),
        }} />
        <Tab.Screen name="Search" component={SearchScreen}  options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size}></Icon>
          ),
        }} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
     {/* <MyTabs/> */}
     <MyDrawer/>
      </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 100.32,
    elevation: 5,
    overflow: 'scroll',
    borderWidth: 1,
  },
  drawerStyles: { flex: 1, width: '85%', backgroundColor: '#3b3a3a' },
  drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: { color: 'white', marginLeft: 0, },
  avatar: {
    borderRadius: 60,
    marginBottom: 0,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
});