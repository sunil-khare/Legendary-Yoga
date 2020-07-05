import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage'
var db;
export default class Page9Screen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            flag: false,
            flagDisplay: "none",
            display: "none",
            x:0,
            y:0,
            bookmark:[],
            chapterName :"Credits"
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
                        <TouchableOpacity style={style.butonViewLeft} onPress={() => this.props.navigation.navigate('Acknowledgements')}>
                            <MaterialIcons name="chevron-left" size={30} color="white"></MaterialIcons>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.butonViewRight} onPress={() => this.props.navigation.navigate('Contacts')}>
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
                                        <Entypo name="bookmark" size={25} color="white" ></Entypo>
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
                                    CREDITS
                            </Text>
                                <Text style={style.textView}>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {"\t\t\t"} Finally I wanted to give the deepest and most heartfelt thanks and gratitude to those who worked on this book. I’m proud to say that everyone who worked on this book is involved in the Modo Yoga Community in some way.{"\n\n"}
                                    </Text>

                                    {"\t\t\t"}The Illustrator<Text style={{ fontWeight: "bold" }}> Sophie Morin </Text>is a dear friend of mine and amazing Modo Teacher from Halifax. She poured her heart and soul and many hours into these beautiful illustrations and on top of that she had the patience to deal with all of my corrections and changes. She really outdid herself and her work through these beautiful illustrations really brought these Legends and stories to full living colour.{"\n\n"}

                                    {"\t\t\t"}The Historical and Cultural Consultant <Text style={{ fontWeight: "bold" }}>Vikram Jeet Singh</Text> is a dear brother of the Modo community and long time, well loved teacher amongst the toronto yoga community. On top of that he shares his love of yoga history in Yoga Teacher Trainings around the world. My deep love of these stories and especially Hanuman is reflected in his heart and it’s why I knew he would be perfect for this job.{"\n\n"}

                                    {"\t\t\t"}The Editor and constant voice of reason at the LA Modo Studios, a dear friend and lovely Modo teacher<Text style={{ fontWeight: "bold" }}> Laura E Franzini</Text>. Her work and love in helping new authors get their work finalized, polished and published made it at once apparent she’d be perfect for this project. {"\n\n"}

                                    {"\t\t\t"}Lastly we come to me, the author. I would like to take the least credit because in the end these are not my stories as I did not invent them nor do I claim to own them. More over they are the property to all the people’s of the earth that can hear them and absorb them. The stories themselves are living entities that travel from person to person in a bid to help us, inspire us and heal us. In this mission I think of myself as merely a vessel to help the stories be told. I can mostly be found hunched over my computer, reading stories or writing stories and I want to give undying gratitude and love to my wife<Text style={{ fontWeight: "bold" }}> Gabi</Text> for putting up with my story obsession.{"\n\n"}
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
        paddingBottom:"5%",
        fontWeight: "500",
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