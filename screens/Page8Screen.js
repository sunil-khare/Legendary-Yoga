import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage'
var db;
export default class Page8Screen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            flag: false,
            flagDisplay: "none",
            display: "none",
            x:0,
            y:0,
            bookmark:[],
            chapterName :"Acknowledgements"
        }
        const unsubscribe2 = this.props.navigation.addListener('focus', () => {
            this.getFlags()
        })
        this.db = SQLite.openDatabase({ name: 'my.db', location: 'Library' }, ()=>{
            // this.getFlags()
        }, ()=>{
            alert("datanase fail")
        });
    }

    getFlags(){
        this.setState({bookmark:[]})
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
    deleteFlag(id){
        let id1 = ""+id
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
                {/* <ToolbarView/> */}
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ display: this.state.display }}>
                        <TouchableOpacity style={style.butonViewLeft} onPress={() => this.props.navigation.navigate('The Legend of Shiva, Kali and the Demon Raktabija')}>
                            <MaterialIcons name="chevron-left" size={30} color="white"></MaterialIcons>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.butonViewRight} onPress={() => this.props.navigation.navigate('Credits')}>
                            <MaterialIcons name="chevron-right" size={30} color="white"></MaterialIcons>
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


                    <ScrollView onScroll={(event)=>{
                        this.setState({y:event.nativeEvent.contentOffset.y,x:event.nativeEvent.contentOffset.x})
                        // console.log(event.nativeEvent.contentOffset.y)
                        // console.log(event.nativeEvent.contentOffset.x)
                    }}>
                        {
                                this.state.bookmark.map((i,index)=>{
                                    // console.log(i);
                                return(
                                        <View style={{position:"absolute",top:i,left:this.state.x}} >
                                            <TouchableOpacity onLongPress={()=>this.deleteFlag(i)} style={{padding:5}}>
                                            <Entypo name="bookmark" size={40} color="#7d5a5a" style={{ paddingLeft: 0, display: "flex"}}></Entypo>
                                            </TouchableOpacity>
                                        
                                        </View>)
                                })
                            
                        }
                        <View>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Text style={style.text}>
                                    ACKNOWLEDGEMENTS{"\n"}
                                </Text>

                                <Text style={style.textView}>
                                    {"\t\t\t"} This project wouldnt be possible without any of you and first off I’d like to give the biggest thanks to...{"\n\n"}

                                    {"\t\t\t"} ALI SELIM - Dear friend and sweat brother, from LA to Portland to Vegas to LA your welcome smile and friendship always is a massive boon to me. Thank you so much for being a huge part of this.{"\n"}

                                    {"\t\t\t"} SOPHIA SEAN - Sophia having you in class at the east studio is always a welcome treat and I look forward to many more classes with you. Thank you so much for being a huge part of this. {"\n"}
                                </Text>
                                <View style={{ borderBottomColor: "gray", borderBottomWidth: 1 }}></View>
                                <Text style={{ fontSize: 22, textAlign: "center", paddingTop: "10%", fontWeight: "bold" }}>
                                    MASSIVE THANKS TO THESE KICKSTARTERS AND PART OF THE MONKEY WARRIOR ARMY VANARASENA
                            </Text>
                                <View style={{ paddingTop: 20 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/download14.png" }} style={{ width: 300, height: 300 }} />
                                </View>

                                <View style={{ paddingTop: 20 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/download8.jpeg" }} style={{ width: 300, height: 300 }} />
                                </View>

                                <View style={{ paddingTop: 20 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/download5.png" }} style={{ width: 300, height: 300 }} />
                                </View>

                                <View style={{ paddingTop: 20 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/download10.jpeg" }} style={{ width: 300, height: 300 }} />
                                </View>

                                <View style={{ paddingTop: 20 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/download13.jpeg" }} style={{ width: 300, height: 300 }} />
                                </View>

                                <View style={{ paddingTop: 20 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/download6.jpeg" }} style={{ width: 300, height: 300 }} />
                                </View>

                                <View style={{ paddingTop: 20 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/download7.png" }} style={{ width: 300, height: 300 }} />
                                </View>

                                <View style={{ paddingTop: 20 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/download9.jpeg" }} style={{ width: 300, height: 300 }} />
                                </View>

                                <View style={{ paddingTop: 20 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/download2.png" }} style={{ width: 300, height: 300 }} />
                                </View>

                                <View style={{ paddingTop: 20 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/download11.jpeg" }} style={{ width: 300, height: 300 }} />
                                </View>

                                <View style={{ paddingTop: 20 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/download12.png" }} style={{ width: 300, height: 300 }} />
                                </View>

                                <View style={{ paddingTop: 20 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/download1.png" }} style={{ width: 300, height: 300 }} />
                                </View>

                                <View style={{ paddingTop: 20 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/download3.png" }} style={{ width: 300, height: 300 }} />
                                </View>

                                <View style={{ paddingTop: 20 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/download4.jpeg" }} style={{ width: 300, height: 300 }} />
                                </View>

                            </View>
                            <View style={{ paddingTop: 30 }}>
                                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {"\n\n\t"}BIG THANKS TO...
                            </Text>
                                <Text style={{ textAlign: "left", paddingLeft: 20, lineHeight: 25, paddingTop: 30 }}>
                                    PETER SOUTHALL{"\n"}
                            JONAH MOOS{"\n"}
                            IRIS WAGNER{"\n"}
                            LINDA STEWART{"\n"}
                            CONNIE MALUORNI{"\n"}
                            EZMY STAVROFF{"\n"}
                            EDITH PARINAS{"\n"}
                            DANIELA SCHAFER{"\n"}
                            LAUREN DOWLING{"\n"}
                            ANNA RONAI{"\n"}
                            JANET AND FRANK MCKENNA{"\n"}
                            LENA COLEMAN (AKA LENA BABY LEGS COLEMAN, SWEET BABY LENA){"\n"}
                            ANNA YAZDAN{"\n"}
                            LAUREN MICKOW{"\n"}
                            JUSTIN BERNARD{"\n"}
                            TYSON BITTRICH{"\n"}
                            AURA BALAN{"\n"}
                            DR TARYN DEANE{"\n"}
                            MARY HFFERNAN{"\n"}
                            JAMIE AND ANGIE MCKENNA, JACOB, LUCAS, MAYA{"\n"}
                            AMBER COLLINS{"\n"}
                            VICTORIA AVILA{"\n"}
                            ANITA VASAN{"\n"}
                            EMILY C MORWEN{"\n"}
                            JESSICA FERGUSON{"\n"}
                            JULIE MULLIGAN{"\n"}
                            MAURA COSTELLO{"\n"}
                            VICTORIA SINOPOLI{"\n"}
                            ANGELIE MICHAUD{"\n"}
                            VICTOR ARCHULETA{"\n"}
                            HILLAIRE CAMPBELL{"\n"}
                            LOUISE MCLEOD{"\n"}
                            CORINNE LEVERT{"\n"}
                            KERRI MURPHY PHILLIPS{"\n"}
                            LAURA THOMAS{"\n"}
                            KATE MCLEOD{"\n"}
                            KATIE YOUNG HOLMES{"\n"}
                            DR. KARTHI K AMBATI{"\n"}
                            HANSPAL JOHAR{"\n"}
                            KARL COTTENIE{"\n"}
                            BEKA ROOT{"\n"}
                            ZACHARY WELCH{"\n"}
                            VIV PIEON{"\n"}
                            ALLISON MUNSHAW{"\n"}
                            JANE HOWELL AKA JUNGLE JANE{"\n"}
                            MATT COPPENS{"\n"}
                            LINAS{"\n"}
                            CAITLIN JANE HUGHES{"\n"}
                            SARA ARSENAULT{"\n"}
                            HEATHER CALLAHAN{"\n"}
                            JACQUELIN DEL VASTO{"\n"}
                            MEGHAN MACNEIL{"\n"}
                            JULIE{"\n"}
                            JILL FERRAS{"\n"}
                            JO VAN GRONIGEN{"\n"}
                            LUCY RAINSFORD{"\n"}
                            KELLY{"\n"}
                            CHRISTY XIE{"\n"}
                            CHRISTINA LIN{"\n"}
                            MATT DAVEY{"\n"}
                            KAT NANTZ{"\n"}
                            KAMI FASAN{"\n"}
                            DARRYL BROWN{"\n"}
                            LAURENE SOUBRIER{"\n"}
                            NICOLE YOUNG{"\n"}
                            RODNEY PIEON{"\n"}
                            HALEY SPENNATO{"\n"}
                            DIVYA IYENGAR{"\n"}
                            STEPHANIE TREMBLAY (X-LEGS){"\n"}
                            SEAN PORTER{"\n"}
                            DANA KOSTELECKY{"\n"}
                            NICK MISPOULIER{"\n"}
                            DANIELLE JESCHKE{"\n"}
                            CAROLYN STEVENS{"\n"}
                            PRAMOD ISRANI{"\n"}
                            CHELSEY RAE{"\n"}
                            LISA{"\n"}
                            LISA PERUSSE{"\n"}
                            ZANDER LYNCH{"\n"}
                            KAYLEE MISENER{"\n"}
                            LUCY NGUYEN{"\n"}
                            DEBORAH{"\n"}
                            ANDREA PALICHUK{"\n"}
                            ERIKA BUSCH{"\n"}
                            CARLEIGH{"\n"}
                            FLIP{"\n"}
                            LIZZIE ROSE KRAMER{"\n"}
                            CARLY CANNATA{"\n"}
                            THE CREATIVE FUND BY BACKER KIT{"\n\n"}
                                </Text>
                                <Text style={{ paddingBottom: 40 }}></Text>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>

        )
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    text: {
        color: "#161924",
        fontSize: 22,
        paddingTop: "15%",
        fontWeight: "bold"
    },
    textView: {
        padding: 10,
        lineHeight: 21,
        fontSize: 15,
        fontFamily: "sans-serif",
        textAlign: "justify"

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