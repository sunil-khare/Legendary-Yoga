import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableWithoutFeedback } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: "none"
        }
    }

    render() {
        return (
            // <Animated.View>
            <TouchableWithoutFeedback onPress={() => {
                this.state.display == "none" ? this.setState({ display: "flex" }) : this.setState({ display: "none" })
            }}>

                <View style={style.container}>
                    {/* <ToolbarView/> */}
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={{ display: this.state.display }}>
                            <TouchableOpacity style={style.butonViewRight} onPress={() => this.props.navigation.navigate('Introduction')}>
                                <MaterialIcons name="chevron-right" size={30} color="white"></MaterialIcons>
                            </TouchableOpacity>
                        </View>

                        <View style={{ display: "flex" }}>
                            <TouchableOpacity style={{borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:70,
       position: 'absolute',                                          
       bottom: 10,                                                    
       right: 10,
       height:70,
       backgroundColor:'#fff',
       borderRadius:100}} onPress={() => this.props.navigation.navigate('Introduction')}>
                                <MaterialIcons name="home" size={30} color="black"></MaterialIcons>
                            </TouchableOpacity>
                        </View>


                        <View onPress={this.props.navigation.openDrawer} style={{display:"none"}}>
                            <LinearGradient colors={['#996EAD', "#4ca2cd"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ alignItems: 'flex-start', marginTop: 0, padding: 10, paddingLeft: 10 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity onPress={this.props.navigation.openDrawer} style={{ flex: 0 }}>
                                        <Icon name="bars" size={25} color="white" style={{ paddingLeft: 5 }}></Icon>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: "row", flex: 1 }}>
                                        <Text numberOfLines={1} style={{ flex: 1, paddingLeft: 20, fontSize: 16, fontWeight: "800", color: "white" }}>{this.props.name}</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                        <ScrollView >


                            <View style={{ alignItems: "center", paddingTop: 30 }}>


                                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Introduction')}>
                                        <Image source={{ uri: 'http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/intro2shine.png' }} style={style.images} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("The Legent of Garuda (Eagle)")}>
                                        <Image source={{ uri: 'http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/behindthescednes2.png' }} style={style.images} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("The Legend of Hanuman (Monkey)")}>
                                        <Image source={{ uri: 'http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/Hanuman2.png' }} style={style.images} />
                                    </TouchableOpacity>

                                </View>
                                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("The Legend of Virabhadra (Warrior)")}>
                                        <Image source={{ uri: 'http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/vira2.png' }} style={style.images} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("The Legend of Nataraj (Dancer)")}>
                                        <Image source={{ uri: 'http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/nataraja2.png' }} style={style.images} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("The Legend of Matsyendra (Twist)")}>
                                        <Image source={{ uri: 'http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/matsyendra2.png' }} style={style.images} />
                                    </TouchableOpacity>

                                </View>

                                <View style={{ flexDirection: "row", paddingTop: "2%" }}>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("The Legend of Shiva, Kali and the Demon Raktabija")}>
                                        <Image source={{ uri: 'http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/shiva2.png' }} style={style.images} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Acknowledgements")}>
                                        <Image source={{ uri: 'http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/contactbirbs.png' }} style={style.images} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Credits")}>
                                        <Image source={{ uri: 'http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/vanarasena2.png' }} style={style.images} />
                                    </TouchableOpacity>

                                </View>
                                <View style={{ paddingTop: 10, alignItems: "center" }}>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Contacts")}>
                                        <Image source={{ uri: 'http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/credito2.png' }} style={style.images} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>

                    </SafeAreaView>

                </View>
            </TouchableWithoutFeedback>
            // </Animated.View>
        )
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        width: "100%"
    },
    images: {
        width: 110,
        height: 110,
        alignItems: "flex-start"
    },
    butonViewLeft: {
        zIndex: 1,
        alignSelf: 'flex-start',
        position: 'absolute',
        top: 300,
        left: 5,
        height: 90,
        borderWidth: 0,
        justifyContent: 'center',
        alignContent: 'center',
        width: 30,
        backgroundColor: "gray",
        borderRadius: 5,
        opacity: 0.6,
    },

    butonViewRight: {
        zIndex: 1,
        alignSelf: 'flex-start',
        position: 'absolute',
        top: 300,
        backgroundColor: "gray",
        borderRadius: 5,
        opacity: 0.6,
        right: 5,
        height: 90,
        borderWidth: 0,
        justifyContent: 'center',
        alignContent: 'center',
        width: 30
    }
})