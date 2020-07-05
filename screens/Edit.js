import React from 'react'
import { View, Text, TextInput, SafeAreaView, Button, Picker } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import LinearGradient from 'react-native-linear-gradient';
import Toast, {DURATION} from 'react-native-easy-toast'
var db;
export default class EditScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            contents: "",
            value: ""
        }
        const unsubscribe1 = this.props.navigation.addListener('focus', () => {
            // alert("HEllo")
            this.setState({ title: "", contents: "" })

        })

        function successcb() {
            // alert("dataBase Open")
            // console.log("Database is ready")
            // alert("Database is ready")
        }
        function errorcb() {
            alert("datanase fail")
        }
        this.db = SQLite.openDatabase({ name: 'my.db', location: 'Library' }, successcb, errorcb);
    }


    saveNotes() {
        if (this.state.contents != "" && this.state.title != "" && this.state.value != "") {
            console.log(this.state.value)
            this.db.transaction((tx) => {
                tx.executeSql("CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY AUTOINCREMENT,chapterName TEXT, title TEXT, contents TEXT)", [], (res) => {
                    console.log("TAble Created")
                    // alert("Table Created!")
                }, (err) => {
                    console.log("Table Not Created", err);
                })

                tx.executeSql("INSERT INTO notes(chapterName,title,contents) values(?,?,?)", ["" + this.state.value + "", "" + this.state.title + "", "" + this.state.contents + ""], (rx, tx) => {
                    console.log("Inserted");
                    // alert("Notes Created!")
                    
                    this.setState({ title: "", contents: "" })
                }, (err) => {
                    console.log("Not Inserted", err)
                })
            })

            this.refs.toast.show('Notes Saved!');
            this.props.navigation.navigate(this.state.value)
        } else {
            this.refs.toast.show('Please fill all field!');
            // alert("");
        }
    }
    setSelectedValue(value) {
        this.setState({ value: value })
    }

    render() {
        return (
            <SafeAreaView>
                <Toast ref="toast"
                    position='bottom'
                    opacity={0.8}
                />
                <LinearGradient colors={['#996EAD', "#4ca2cd"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ alignItems: 'flex-start', marginTop: 0, padding: 15, paddingLeft: 10 }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 19, color: "white" }}>
                            Write Notes
                            </Text>
                    </View>
                </LinearGradient>

                <Text style={{ margin: 10, marginBottom: 0 }}>Please Select Chapter Name:</Text>
                <View style={{ borderColor: "gray", borderWidth: 1, padding: 1, margin: 10, marginBottom: 0, borderRadius: 10 }}>

                    <Picker
                        selectedValue={this.state.value}

                        style={{ height: 50, borderColor: "gray" }}
                        onValueChange={(itemValue, itemIndex) => this.setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="--------Select Chapter-------" value="" />
                        <Picker.Item label="Introduction" value="Introduction" />
                        <Picker.Item label="The Legent of Garuda (Eagle)" value="The Legent of Garuda (Eagle)" />
                        <Picker.Item label="The Legend of Hanuman (Monkey)" value="The Legend of Hanuman (Monkey)" />
                        <Picker.Item label="The Legend of Virabhadra (Warrior)" value="The Legend of Virabhadra (Warrior)" />
                        <Picker.Item label="The Legend of Nataraj (Dancer)" value="The Legend of Nataraj (Dancer)" />
                        <Picker.Item label="The Legend of Matsyendra (Twist)" value="The Legend of Matsyendra (Twist)" />
                        <Picker.Item label="The Legend of Shiva, Kali and the Demon Raktabija" value="The Legend of Shiva, Kali and the Demon Raktabija" />
                        <Picker.Item label="Acnkowledgements" value="Acnkowledgements" />
                        <Picker.Item label="Credits" value="Credits" />
                        <Picker.Item label="Contacts" value="Contacts" />
                        <Picker.Item label="Behind the Scenes" value="Behind the Scenes" />

                    </Picker>
                </View>
                <View style={{ padding: 10, marginTop: 20 }}>
                    <TextInput placeholder="Title" style={{ borderColor: "gray", borderWidth: 1, borderRadius: 10 }} onChangeText={(text) => this.setState({ title: text })} value={this.state.title}></TextInput>
                </View>
                <View style={{ padding: 10, marginTop: 10 }}>
                    <TextInput multiline={true} placeholder="Content" style={{ borderColor: "gray", borderWidth: 1, borderRadius: 10 }} onChangeText={(text) => this.setState({ contents: text })} value={this.state.contents}></TextInput>
                </View>
                <View style={{ padding: 10 }}>
                    <Button title="Save" onPress={() => this.saveNotes()}></Button>
                </View>
            </SafeAreaView>
        )
    }
}
