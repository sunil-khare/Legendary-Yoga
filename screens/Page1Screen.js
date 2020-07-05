import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Toast, { DURATION } from 'react-native-easy-toast'
import SQLite from 'react-native-sqlite-storage'
var db;
export default class Page1Screen extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            flag: false,
            flagDisplay: "none",
            display: "none",
            x: 0,
            y: 0,
            bookmark: [],
            chapterName: "Introduction"
        }

        this.props.navigation.addListener('focus', () => {
            this.getFlags()
        })
        this.db = SQLite.openDatabase({ name: 'my.db', location: 'Library' }, () => {
            // this.getFlags()
        }, () => {
            alert("datanase fail")
        });
    }

    getFlags() {
        this.setState({ bookmark: [] })
        this.db.transaction((tx) => {
            // tx.executeSql("CREATE TABLE IF NOT EXISTS bookmarks(id INTEGER PRIMARY KEY AUTOINCREMENT,xValue TEXT, yValue TEXT)", [], (res) => {
            //     console.log("TAble Created")
            // }, (err) => {
            //     console.log("Table Not Created", err);
            // })
            tx.executeSql("SELECT * FROM bookmarks WHERE chapterName = ?", [this.state.chapterName], (rx, tx) => {
                let y = [];
                // let bookmark = [];
                for (let i = 0; i < tx.rows.length; i++) {

                    // y.push(tx.rows.item(i).y)
                    // console.log(tx.rows.item(i).yValue)
                    this.state.bookmark.push(parseFloat(tx.rows.item(i).yValue))
                }
                // this.setState({ bookmark })
                // console.log("Bookmarks,",this.state.bookmark)
            }, err => {
                console.log(err);
            })
        })
    }
    deleteFlag(id) {
        let id1 = "" + id
        let i = this.state.index;
        this.setState({ visible: false })
        this.db.transaction((tx) => {
            tx.executeSql("DELETE FROM bookmarks where yValue=?", [id1], (res) => {
                console.log("deleted")
                this.getFlags()
            }, err => {
                console.log(err);
            })
            // console.log(NotesScreen.data)
        })
        this.refs.toast.show('Bookmark Deleted!');

    }

    flagSet() {

        // console.log(this.state.y)
        this.state.bookmark.push(this.state.y)

        this.db.transaction((tx) => {
            tx.executeSql("CREATE TABLE IF NOT EXISTS bookmarks(id INTEGER PRIMARY KEY AUTOINCREMENT,chapterName TEXT, xValue TEXT, yValue TEXT)", [], (res) => {
                console.log("TAble Created")

            }, (err) => {
                console.log("Table Not Created", err);
            })

            tx.executeSql("INSERT INTO bookmarks(chapterName,xValue,yValue) values(?,?,?)", ["" + this.state.chapterName + "", "" + this.state.x + "", "" + this.state.y + ""], (rx, tx) => {
                console.log("Inserted");
                // alert("Notes Created!")

            }, (err) => {
                console.log("Not Inserted", err)
            })
        })
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
                <Toast ref="toast"
                    position='bottom'
                    opacity={0.8}
                />
                {/* <Image source={require('../assets/images/logo1.png')} style={style.backgroundImage}/>  */}
                {/* <ToolbarView/> */}
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ display: this.state.display }}>
                        <TouchableOpacity style={style.butonViewLeft} onPress={() => this.props.navigation.navigate('Home')}>

                            <MaterialIcons name="chevron-left" size={30} color="white"></MaterialIcons>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.butonViewRight} onPress={() => this.props.navigation.navigate('The Legent of Garuda (Eagle)')}>
                            <View style={{ opacity: 20 }}>
                                <MaterialIcons name="chevron-right" size={30} color="white"></MaterialIcons>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={style.flotingButton} onPress={() => this.props.navigation.navigate('Home')}>
                            <MaterialIcons name="home" size={25} color="black"></MaterialIcons>
                        </TouchableOpacity>
                    </View>

                    {/* HEADER START */}
                    <View onPress={this.props.navigation.openDrawer} style={{ display: "none" }}>
                        <LinearGradient colors={['#996EAD', "#4ca2cd"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ alignItems: 'flex-start', marginTop: 0, padding: 15, paddingLeft: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={this.props.navigation.openDrawer} style={{ flex: 0 }}>
                                    <Icon name="bars" size={25} color="white" style={{ paddingLeft: 5 }}></Icon>
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row", flex: 1, padding: 0 }}>
                                    <Text numberOfLines={1} style={{ flex: 1, paddingLeft: 10, fontSize: 19, fontWeight: "800", color: "white" }}>{this.props.name}</Text>
                                    <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => this.props.navigation.navigate("Edit")}>
                                        <MaterialIcons name="edit" size={25} color="white"></MaterialIcons>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ right: 0, alignItems: "center", paddingLeft: 10 }} onPress={() => this.flagSet()}>
                                        <Entypo name="bookmark" size={25} color="white" ></Entypo>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                    {/* MAIN CONTENTS */}

                    {/* Flag  */}
                    <ScrollView style={style.scrollView} onScroll={(event) => {
                        this.setState({ y: event.nativeEvent.contentOffset.y, x: event.nativeEvent.contentOffset.x })
                        // console.log(event.nativeEvent.contentOffset.y)
                        // console.log(event.nativeEvent.contentOffset.x)
                    }}>
                        {
                            this.state.bookmark.map((i, index) => {
                                // console.log(i);
                                return (
                                    <View style={{ position: "absolute", top: i, left: this.state.x }} key={index}>
                                        <TouchableOpacity onLongPress={() => this.deleteFlag(index)} style={{ padding: 5 }}>
                                            <Entypo name="bookmark" size={40} color="#7d5a5a" style={{ paddingLeft: 0, display: "flex" }}></Entypo>
                                        </TouchableOpacity>

                                    </View>)
                            })

                        }
                        <View>
                            {/* Heading */}
                            <View>
                                <View style={{ flex: 0, alignItems: "center", justifyContent: "center" }}>
                                    <Text style={style.text}>
                                        INTRODUCTION
                            </Text>
                                </View>

                                <Text style={{ paddingTop: 40, paddingLeft: 40, fontSize: 17 }}>Hello!</Text>
                                <Text style={{ paddingTop: 5, paddingLeft: 40, fontSize: 17 }}>Welcome to Legendary Yoga,</Text>
                                <View style={{ alignItems: "flex-end", paddingTop: 20 }}>
                                    < Image source={{ uri: 'http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/1.png' }} style={style.images} />
                                </View>
                                <Text style={style.textView}>
                                    {"\t\t\t"}This book serves as a collection of stories, myths and legends that stand behind the greatest yoga poses of all time.
                            These legends are born out of the deep well of culture and tradition from India and it's peoples over the last few millenia.
                            The goal of this book is to connect your physical yoga practice with these legends to instill your practice with a legendary quality.
                            Know that many of these legends have alternate versions and histories, in this book I tried to use the version that would most closely resemble the physical shape and meaning of the pose.
                            There is no right or wrong story, just the one that speaks to you the most.
                        </Text>
                                <Text style={style.textView}>
                                    {"\t\t\t"} Storytelling is a uniquely human activity and something that can be found among every people and culture in the world going as far back as our cultural memories can recall.
                        It takes many forms in our modern society from global cinematic blockbusters that rake in billions of dollars to the simple retelling of events when one arrives home from a long day at work and someone says
                        “How was your day?” It goes from the most relative funny storytelling to boost a friend’s spirit to the deep
                        esoteric religious myths and legends that elevate us to transcendent states.
                        Every human being is a storyteller from the loud animated charismatic sprite telling shaggy dog stories in a pub with everyone gathered around in rapt attention to a mother telling her child a calming story before bed and everything in between.
                        Stories allow us to transmit meaning, lessons, connection, inspiration and healing through time and space. In that regard stories themselves are almost like entities or life forms in that they travel person
                        to person and they evolve or change over time as they need to be most readily absorbed.
                        I like to think of these stories or legends here as the same thing, living things that wish to be shared so that they can help people.
                        So feel that these legends are here to help you delve deeper in your
                        practice to connect with something on a deep level beyond just the physicality.
                        </Text>
                                <Text style={{ paddingBottom: 30 }}></Text>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
                {/* </ImageBackground> */}
            </View>

        )
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    text: {
        color: "#161924",
        paddingTop: "10%",
        fontSize: 22,

        fontWeight: "bold"
    },
    scrollView: {
        marginHorizontal: 1,
        paddingVertical: 20
    },
    images: {
        width: 300,
        height: 180
    },
    textView: {
        padding: 10,
        lineHeight: 21,
        fontSize: 16,
        fontFamily: "Times New Roman",
        textAlign: "justify",

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