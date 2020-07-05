import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo'
import WebView from 'react-native-webview';
export default class Page1Screen extends React.Component {
    constructor(props) {
        super()
        this.state = {
            flag: false,
            flagDisplay: "none",
            display: "none"
        }
    }
    flagSet() {
        // alert(this.state.flag)
        if (this.state.flag) {
            this.setState({ flagDisplay: "none" })
            this.setState({ flag: false })
        } else {
            this.setState({ flagDisplay: "flex" })
            this.setState({ flag: true })
        }
    }
    render() {
        return (

            <View style={style.container} onTouchEnd={() => {
                if (this.state.display == "none") {
                    this.setState({ display: "flex" })
                    setTimeout(() => {
                        this.setState({ display: "none" })
                    }, 2000)
                } else {
                    this.setState({ display: "none" })
                }
            }}>
                {/* <ToolbarView/> */}
                <SafeAreaView style={{ flex: 1 }}>

                    <View style={{ display: this.state.display }}>
                        <TouchableOpacity style={style.butonViewLeft} onPress={() => this.props.navigation.navigate('Contacts')}>
                            <MaterialIcons name="chevron-left" size={30} color="white"></MaterialIcons>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={style.flotingButton} onPress={() => this.props.navigation.navigate('Home')}>
                            <MaterialIcons name="home" size={25} color="black"></MaterialIcons>
                        </TouchableOpacity>
                    </View>
                    <View onPress={this.props.navigation.openDrawer} style={{display:"none"}}>
                        <LinearGradient colors={['#996EAD', "#4ca2cd"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ alignItems: 'flex-start', marginTop: 0, padding: 15, paddingLeft: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={this.props.navigation.openDrawer} style={{ flex: 0 }}>
                                    <Icon name="bars" size={25} color="white" style={{ paddingLeft: 5 }}></Icon>
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row", flex: 1 }}>
                                    <Text numberOfLines={1} style={{ flex: 1, paddingLeft: 10, fontSize: 19, fontWeight: "800", color: "white" }}>{this.props.name}</Text>
                                    <TouchableOpacity style={{ flexDirection: "row", paddingLeft: 10 }} onPress={() => this.props.navigation.navigate("Edit")}>
                                        <MaterialIcons name="edit" size={25} color="white" ></MaterialIcons>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ right: 0, alignItems: "center", paddingLeft: 10 }} onPress={() => this.flagSet()}>
                                        <Entypo name="bookmark" size={25} color="white"></Entypo>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                    {this.state.flag ?
                        (<View>
                            <Entypo name="bookmark" size={30} color="#7d5a5a" style={{ paddingLeft: 5, display: this.state.flagDisplay }}></Entypo>
                        </View>)
                        : (<Text></Text>)}
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", height: 10 }}>

                        <WebView
                            style={style.WebViewStyle}
                            source={{ uri: 'https://www.youtube.com/embed/x4dBY2KB2tI' }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}   >

                        </WebView>

                    </View>
                </SafeAreaView>
            </View>
        )
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
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
    },
    WebViewStyle: {
        borderColor: "black",
        width: 350,
        borderWidth: 1
    },
    flotingButton: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        zIndex: 1,
        position: 'absolute',
        top: 10,
        left: 10,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 100
    }
})