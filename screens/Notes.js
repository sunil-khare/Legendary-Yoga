import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Button, ImageBackground } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import SQLite from 'react-native-sqlite-storage';
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';
import LinearGradient from 'react-native-linear-gradient';
import Toast, { DURATION } from 'react-native-easy-toast'
import Entypo from 'react-native-vector-icons/Entypo'
var db;
export default class NotesScreen extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            cont: [],
            visible: false,
            visible1: false,
            index: 0,
            edit: false,
            data: "",
            title: "",
            chapterName: "",
            val: 1,
            chapterName1: [],
            chapterName2: [],
            active:0
        }
     
        const unsubscribe1 = this.props.navigation.addListener('focus', () => {
            this.getNotes()
            this.getFlags()
            this.setState({val:1})
        })
        this.db = SQLite.openDatabase({ name: 'my.db', location: 'Library' }, () => {
            
        }, () => {

        });
        this.getNotes()
        this.getFlags()
    }

    getNotes() {
       
        this.db.transaction((tx) => {
            // tx.executeSql("CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, contents TEXT)", [], (res) => {
            //     console.log("TAble Created")
            // }, (err) => {
            //     console.log("Table Not Created", err);
            // })
            tx.executeSql("SELECT * FROM notes", [], (rx, tx) => {
                let title = [];
                let contents = [];
                let id = []
                let cont = [];
                let chapterName = [];
                for (let i = 0; i < tx.rows.length; i++) {

                    title.push(tx.rows.item(i).title)
                    chapterName.push(tx.rows.item(i).chapterName)
                    id.push(tx.rows.item(i).id);
                    contents.push(tx.rows.item(i).contents)
                    cont.push({ id: id, title: title, contents: contents, chapterName: chapterName })
                }
                this.setState({ cont })
            }, err => {
                console.log(err);
            })
        })
    }
    openDialog(i, data, title) {
        this.setState({ visible: true, index: i, data: data, title: title })
    }
    deleteNotes(i, data, title) {
        this.setState({ visible: true, index: i, data: data, title: title })
        // this.setState({visible:false,visible1:true}) 
    }
    editNotes(i, data, title) {
        // alert("Edit")
        this.setState({ edit: true, index: i, data: data, title: title })
    }
    updateNotes() {

        let i = this.state.data;
        let id = this.state.index
        console.log(i)
        console.log(id)
        this.db.transaction((tx) => {
            tx.executeSql("UPDATE notes SET contents=? WHERE id=?", [i, id], (res) => {
                console.log("Updated")
            }, err => {
                console.log(err);
            })
            // console.log(NotesScreen.data)
        })
        // alert("Updated!")
        this.refs.toast.show('Notes Updated!');
        this.setState({ edit: false })
        this.getNotes()
    }
    deleteNotes1() {
        let i = this.state.index;
        this.setState({ visible: false })
        this.db.transaction((tx) => {
            tx.executeSql("DELETE FROM notes where id=?", [i], (res) => {
                // console.log("deleted")
            }, err => {
                console.log(err);
            })
            // console.log(NotesScreen.data)
        })
        this.refs.toast.show('Notes Deleted!');
        this.getNotes();
    }
    cancel() {
        this.setState({ edit: false })
    }
    goBack(chapterName) {
        // console.log(chapterName)
        this.props.navigation.navigate(chapterName);
    }

    getFlags() {
        // console.log("BoAftwer okmarks,",this.state.bookmark)
        this.db.transaction((tx) => {
            // tx.executeSql("CREATE TABLE IF NOT EXISTS bookmarks(id INTEGER PRIMARY KEY AUTOINCREMENT,xValue TEXT, yValue TEXT)", [], (res) => {
            //     console.log("TAble Created")
            // }, (err) => {
            //     console.log("Table Not Created", err);
            // })
            this.setState({chapterName1:[],chapterName2:[]})
            tx.executeSql("SELECT * FROM bookmarks", [], (rx, tx) => {
                let y = [];
                for (let i = 0; i < tx.rows.length; i++) {
                    this.state.chapterName1.push(tx.rows.item(i).chapterName);
                }
                for (var value of this.state.chapterName1) {
                    if (this.state.chapterName2.indexOf(value) === -1) {
                        this.state.chapterName2.push(value);
                    }
                }
                // this.setState({ bookmark })
            }, err => {
                console.log(err);
            })
        })
    }



    renderElement() {
        if (this.state.val == 1) {
            
            return (<ScrollView style={{backgroundColor:"#ccc"}}>
                <View style={{ padding: 10, alignItems: "center" }}>

                    {/* Second Dialog */}
                    <Dialog
                        visible={this.state.visible}
                        dialogTitle={<DialogTitle title="Options" />}
                        onTouchOutside={() => {
                            this.setState({ visible: false });
                        }}
                    >
                        <DialogContent>
                            <View style={{ paddingTop: 10 }}>
                                <Text style={{ fontSize: 20 }}>
                                    You want to delete Notes?
                   </Text>
                                <View style={{ flexDirection: "row" }}>


                                    <View style={{ paddingTop: 30, padding: 10, flex: 1 }}>
                                        <Button title="No" style={{ paddingRight: 20 }} onPress={() => this.setState({ visible: false })} ></Button>

                                    </View>
                                    <View style={{ paddingTop: 30, padding: 10, flex: 1 }}>
                                        <Button title="Yes" onPress={() => this.deleteNotes1()}></Button>
                                    </View>
                                </View>
                            </View>
                        </DialogContent>
                    </Dialog>
                </View>
                {

                    this.state.cont.map((u, i) => {
                        // console.log(u.title)
                        return (
                            <TouchableOpacity onPress={() => { this.goBack(u.chapterName[i]) }} key={i}>

                                <Card title={u.title[i]} containerStyle={{borderRadius:10,backgroundColor:"#e5e5e5",padding:10}} >
                                    {this.state.edit && u.id[i] == this.state.index ?
                                        <View>
                                            <TextInput placeholder="Update Your Notes" style={{ borderWidth: 1, borderColor: "gray", borderRadius: 10, margin: 10 }} onChangeText={(text) => { this.setState({ data: text }) }} value={this.state.data}></TextInput>
                                            <View style={{ flexDirection: "row", flex: 1 }}>
                                                <View style={{ flex: 1, padding: 10 }}>
                                                    <Button title="Update" onPress={() => this.updateNotes()}></Button>
                                                </View>
                                                <View style={{ flex: 1, padding: 10 }}>
                                                    <Button title="Cancel" onPress={() => { this.cancel() }}></Button>
                                                </View>

                                            </View>

                                        </View> :
                                        <View style={{ flexDirection: "row" }}>
                                            <View style={{ flex: 1 }}>
                                                <Text>{u.contents[i]}</Text>
                                            </View>

                                            <View style={{ flexDirection: "row", }}>
                                                <TouchableOpacity onPress={() => { this.editNotes(u.id[i], u.contents[i], u.title[i]) }}>
                                                    <MaterialIcons name="edit" size={20} style={{ padding: 5 }}></MaterialIcons>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => { this.deleteNotes(u.id[i], u.contents[i], u.title[i]) }} key={i}>
                                                    <MaterialIcons name="delete" size={20} style={{ padding: 5 }}></MaterialIcons>
                                                </TouchableOpacity>

                                            </View>
                                        </View>
                                    }
                                </Card>
                            </TouchableOpacity>
                        );
                    })
                }

                <View style={{ marginBottom: 60 }}>

                </View>
            </ScrollView>);
        } else if (this.state.val == 2) {
            return (<ScrollView style={{backgroundColor:"#ccc"}}>

                {this.state.chapterName2.map((element,index) => {
                    return (
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate(element)} key={index}>

                        
                        <View style={styles.mainView}>
                            <View style={styles.headingView}>
                                <Text style={{fontSize:16,color:"#f5f5f5",fontWeight:"bold"}}> {element}</Text>

                            </View>
                            {this.state.chapterName1.map((value,index) => {
                                if (value == element) {
                                    return (
                                        <View style={styles.flagView} key={index}>
                                            <Entypo name="bookmark" size={20} color="black" style={{ paddingLeft: 0, display: "flex" }}></Entypo>
                                    <Text style={{color:"black",fontWeight:"800",fontSize:13}}>Bookmark</Text>
                                            
                                        </View>
                                    )
                                }

                            })
                        }
                        </View>
                        </TouchableOpacity>
                    )
                })

                }
    
            <View style={{marginBottom:100}}></View>
            </ScrollView>)
        }
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>

                <Toast ref="toast"
                    position='bottom'
                    opacity={0.8}
                />
               
                <LinearGradient colors={['#996EAD', "#4ca2cd"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ alignItems: 'flex-start', marginTop: 0, padding: 15, paddingLeft: 10 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 19, flex: 1, color: "white" }}>Notes</Text>
                        {/* <TouchableOpacity onPress={()=>this.UNSAFE_componentWillMount()}>
                            <Foundation name="refresh" size={25} color="white" style={{paddingLeft:5}}></Foundation>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() =>this.getNotes()}>
                            <Foundation name="refresh" size={25} color="white" style={{ paddingLeft: 5 }}></Foundation>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                <View style={{ flexDirection: 'row' }}>
                    {/*To set the FirstScreen*/}
                    <TouchableOpacity
                        style={this.state.active === 0 ? styles.btnActive : styles.btn}
                        onPress={() =>{this.setState({ val: 1,active:0 });}}>
                        <Text style={{color:"#ffff"}}>Notes</Text>
                    </TouchableOpacity>
                    {/*To set the SecondScreen*/}
                    <TouchableOpacity
                        style={this.state.active === 1 ? styles.btnActive : styles.btn}
                        onPress={() =>{ this.setState({ val: 2 ,active:1}); }}>
                        <Text style={{color:"#ffff"}}>Bookmarks</Text>
                    </TouchableOpacity>
                    {/*To set the ThirdScreen*/}

                </View>
                {/* <ImageBackground  style= { styles.backgroundImage } source={require('../assets/images/images.jpg')} > */}
                {this.renderElement()}
                {/* </ImageBackground> */}
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainView: {
        padding: 0,
        // borderColor: "white",
        // borderWidth: 1,
        margin: 10,
        borderRadius: 5
    },
    headingView: {
        padding: 12,
        borderColor: "white",
        borderWidth: 1,
        backgroundColor:"black",
        alignItems: "flex-start",
        opacity:0.7,
        borderRadius:5
    },
    flagView: {
        alignItems: "flex-start",
        paddingLeft: 20,
        paddingTop:10,
        flexDirection:"row"

    },
    backgroundImage:{
        resizeMode: 'stretch',
        alignSelf: 'stretch',
        width: '100%',
        height: '100%',
        
        opacity: 0.7
    },
    // button: {
    //     flex: 1,
    //     alignItems: 'center',
    //     backgroundColor: '#7d5a5a',
    //     padding: 10,
    //     margin: 0,
    //     borderRightColor:"white",
    //     borderRightWidth:1,
    //     borderLeftColor:"white",
    //     borderLeftWidth:1,
    // },
    btn: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        margin: 0,
        backgroundColor: '#5f6368',
        // opacity:0.7
      },
      btnActive: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#317ad5',
        margin: 0,
        // opacity:0.7
       
      }
})