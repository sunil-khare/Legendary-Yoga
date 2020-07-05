import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Toast, {DURATION} from 'react-native-easy-toast'
import Slider from "@react-native-community/slider"
import SQLite from 'react-native-sqlite-storage'
var db;
var Sound = require('react-native-sound');
const img_pause = require('../assets/images/ui_pause.png');
const img_play = require('../assets/images/ui_play.png');
export default class Page7Screen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playState: 'paused', //playing, paused
            playState1: 'paused',
            playState2: 'paused',
            playSeconds: 0,
            duration: 0,
            playSeconds1: 0,
            duration1: 0,
            playSeconds2: 0,
            duration2: 0,
            flag: false,
            flagDisplay: "none",
            display: "none",
            x:0,
            y:0,
            bookmark:[],
            chapterName :"The Legend of Shiva, Kali and the Demon Raktabija"
        }
        this.sliderEditing = false;
        this.sliderEditing1 = false;
        this.sliderEditing2 = false;
        const unsubscribe1 = this.props.navigation.addListener('blur', () => {
            this.componentWillUnmount()

        })
        const unsubscribe2 = this.props.navigation.addListener('focus', () => {
            this.componentDidMount()
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


    componentWillUnmount() {
        if (this.sound) {
            this.sound.pause();
            this.setState({ playState: 'paused' });
        }
        if (this.sound1) {
            this.sound1.pause();
            this.setState({ playState1: 'paused' });
        }
        if (this.sound2) {
            this.sound2.pause();
            this.setState({ playState2: 'paused' });
        }
        if (this.timeout) {
            clearInterval(this.timeout);
        }
    }

    componentDidMount() {


        // this.play();

        this.timeout = setInterval(() => {
            if (this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing) {
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    this.setState({ playSeconds: seconds });
                })
            }
            else if (this.sound1 && this.sound1.isLoaded() && this.state.playState1 == 'playing' && !this.sliderEditing1) {
                this.sound1.getCurrentTime((seconds1, isPlaying) => {
                    this.setState({ playSeconds1: seconds1 });
                })
            }
            else if (this.sound2 && this.sound2.isLoaded() && this.state.playState2 == 'playing' && !this.sliderEditing2) {
                this.sound2.getCurrentTime((seconds2, isPlaying) => {
                    this.setState({ playSeconds2: seconds2 });
                })
            }
        }, 100);
    }

    play = async () => {
        this.refs.toast.show('Please Wait...');
        if (this.sound1) {
            this.pause1()
        }
        if (this.sound2) {
            this.pause2();
        }
        if (this.sound) {
            this.sound.play(this.playComplete);
            this.setState({ playState: 'playing' });
        } else {
            const filepath = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a6_1.mp3";
            console.log('[Play]', filepath);

            this.sound = new Sound(filepath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({ playState: 'paused' });
                } else {
                    this.setState({ playState: 'playing', duration: this.sound.getDuration() });
                    this.sound.play(this.playComplete);
                }
            });
        }


    }
    play1 = async () => {
        this.refs.toast.show('Please Wait...');
        if (this.sound) {
            this.pause()
        }
        if (this.sound2) {
            this.pause2();
        }
        if (this.sound1) {
            this.sound1.play(this.playComplete);
            this.setState({ playState1: 'playing' });
        } else {
            const filepath1 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a6_2.mp3";
            console.log('[Play]', filepath1);

            this.sound1 = new Sound(filepath1, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({ playState1: 'paused' });
                } else {
                    this.setState({ playState1: 'playing', duration1: this.sound1.getDuration() });
                    this.sound1.play(this.playComplete);
                }
            });
        }
    }
    play2 = async () => {
        this.refs.toast.show('Please Wait...');
        if (this.sound1) {
            this.pause1()
        }
        if (this.sound) {
            this.pause();
        }
        if (this.sound2) {
            this.sound2.play(this.playComplete);
            this.setState({ playState2: 'playing' });
        } else {
            const filepath2 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/shiva_story6_3.mp3";
            console.log('[Play]', filepath2);

            this.sound2 = new Sound(filepath2, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({ playState2: 'paused' });
                } else {
                    this.setState({ playState2: 'playing', duration2: this.sound2.getDuration() });
                    this.sound2.play(this.playComplete);
                }
            });
        }
    }
    playComplete = (success) => {
        if (this.sound) {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            this.setState({ playState: 'paused', playSeconds: 0 });
            this.sound.setCurrentTime(0);
        }
    }
    pause = () => {
        if (this.sound) {
            this.sound.pause();
        }

        this.setState({ playState: 'paused' });
    }
    pause1 = () => {
        if (this.sound1) {
            this.sound1.pause();
        }

        this.setState({ playState1: 'paused' });
    }
    pause2 = () => {
        if (this.sound2) {
            this.sound2.pause();
        }

        this.setState({ playState2: 'paused' });
    }
    onSliderEditStart = () => {
        this.sliderEditing = true;
    }
    onSliderEditEnd = () => {
        this.sliderEditing = false;
    }
    onSliderEditing = value => {
        if (this.sound) {
            this.sound.setCurrentTime(value);
            this.setState({ playSeconds: value });
        }
    }

    getAudioTimeString(seconds) {
        const h = parseInt(seconds / (60 * 60));
        const m = parseInt(seconds % (60 * 60) / 60);
        const s = parseInt(seconds % 60);

        return ((m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
    }

    onSliderEditStart1 = () => {
        this.sliderEditing1 = true;
    }
    onSliderEditEnd1 = () => {
        this.sliderEditing1 = false;
    }
    onSliderEditing1 = value => {
        if (this.sound1) {
            this.sound1.setCurrentTime(value);
            this.setState({ playSeconds1: value });
        }
    }


    onSliderEditStart2 = () => {
        this.sliderEditing = true;
    }
    onSliderEditEnd2 = () => {
        this.sliderEditing = false;
    }
    onSliderEditing2 = value => {
        if (this.sound2) {
            this.sound2.setCurrentTime(value);
            this.setState({ playSeconds2: value });
        }
    }
    render() {
        const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
        const durationString = this.getAudioTimeString(this.state.duration);

        const currentTimeString1 = this.getAudioTimeString(this.state.playSeconds1);
        const durationString1 = this.getAudioTimeString(this.state.duration1);

        const currentTimeString2 = this.getAudioTimeString(this.state.playSeconds2);
        const durationString2 = this.getAudioTimeString(this.state.duration2);
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
                {/* <ToolbarView/> */}
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ display: this.state.display }}>
                        <TouchableOpacity style={style.butonViewLeft} onPress={() => this.props.navigation.navigate('The Legend of Matsyendra (Twist)')}>
                            <MaterialIcons name="chevron-left" size={30} color="white"></MaterialIcons>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.butonViewRight} onPress={() => this.props.navigation.navigate('Acknowledgements')}>
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
                                    THE LEGEND OF SHIVA, KALI AND THE DEMON RAKTABIJA
                            </Text>
                                <Text style={{ fontSize: 18, textAlign: "center", paddingTop: "2%", fontWeight: "bold" }}>
                                    THE SUCCESS OF SURRENDER
                            </Text>
                                <View style={{ alignItems: "center", paddingTop: "15%" }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/corpse.png" }} style={{ width: 300, height: 550 }} />
                                    <Text style={{ fontSize: 20, paddingTop: "15%", fontWeight: "bold" }}>
                                        SHAVASANA - शवासन {"\n"}
                                    </Text>
                                    <Text style={{ fontWeight: "bold",fontSize:11 }}>
                                        SHAVASANA in Sanskrit
                                </Text>
                                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginTop: 10 }}>
                                        <View style={{ marginVertical: 5, padding: 5, marginHorizontal: 0, flexDirection: 'row' }}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString}</Text>
                                            <Slider
                                                onTouchStart={this.onSliderEditStart}
                                                onTouchEnd={this.onSliderEditEnd}
                                                onValueChange={this.onSliderEditing}
                                                value={this.state.playSeconds} maximumValue={this.state.duration} maximumTrackTintColor='white' minimumTrackTintColor='white' thumbTintColor='white'
                                                style={{ paddingLeft: 120 }} />
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{durationString}</Text>

                                            {this.state.playState == 'playing' &&
                                                <TouchableOpacity onPress={this.pause} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_pause} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}
                                            {this.state.playState == 'paused' &&
                                                <TouchableOpacity onPress={this.play} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_play} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}
                                        </View>
                                    </View>
                                    <Text style={{ fontWeight: "bold", paddingTop: 30,fontSize:11 }}>
                                        How to say SHAVASANA in Sanskrit:
                                </Text>
                                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginTop: 10 }}>
                                        <View style={{ marginVertical: 5, padding: 5, marginHorizontal: 0, flexDirection: 'row' }}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString1}</Text>
                                            <Slider
                                                onTouchStart={this.onSliderEditStart1}
                                                onTouchEnd={this.onSliderEditEnd1}
                                                onValueChange={this.onSliderEditing1}
                                                value={this.state.playSeconds1} maximumValue={this.state.duration1} maximumTrackTintColor='white' minimumTrackTintColor='white' thumbTintColor='white'
                                                style={{ paddingLeft: 120 }} />
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{durationString1}</Text>

                                            {this.state.playState1 == 'playing' &&
                                                <TouchableOpacity onPress={this.pause1} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_pause} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}
                                            {this.state.playState1 == 'paused' &&
                                                <TouchableOpacity onPress={this.play1} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_play} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}

                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 20, paddingTop: "15%", fontWeight: "bold", textAlign: "center" }}>
                                        (SHAVA-शव-CORPSE) {"\n"}
                                    </Text>

                                    <Text style={style.textView}>
                                        {"\t\t\t"}(It's important to note here that this pose name can be spellt with or without the H after the first S, in this book I've written it as SHAVASANA rather than SAVASANA since I feel alot of the time it's mis pronounced with out the SH sound){"\n\n"}
                                    </Text>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/image72.jpg" }} style={{ width: 300, height: 450 }} />
                                    <Text style={style.textView}>
                                        {"\n\n\t\t\t"}There once was a demon (asura) named Raktabija – which, from Sanskrit, translates to “blood seed” in English – who had a magical power that whenever his blood dropped on holy ground, more of him would spring forth from that drop of blood. Essentially, his blood would create more of him, and those spawned clones would contain the same power as the original.{"\n"}

                                        {"\t\t\t"}The demon tricked the gods into coming down to face him, to fight him on Earth, and they did. All of heaven arrived on Earth, the whole pantheon in all their shining, radiant glory. Gods boasting many arms and many deadly divine weapons attacked Raktabija, and with their divine swords, axes, discs, and more, they cut him into pieces and made short work of him. But the great blood puddle left by Raktabija began to bubble and foam, and from that bubble poured out hundreds of new Raktabijas. But even this was no problem for the gods, and they cut the hundred Raktabijas to pieces as well, leaving a near-lake of blood. From that lake of blood poured out tens of thousands of Raktabijas, and the gods cut them down as well, and so the cycle continued.{"\n\n"}
                                    </Text>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/image73.png" }} style={{ width: 300, height: 150 }} />
                                    <Text style={style.textView}>
                                        {"\n\n\t\t\t"}Eventually, the gods had cut down and multiplied so many Raktabijas that there was an uncountable army, a swarm of red-horned, angry devils, and the gods were outnumbered and overpowered. Even the gods, with all their might and holy weapons, could not stop this army, and they were soon losing the battle.{"\n"}

                                        {"\t\t\t"}It was at that point that they called forth one of their most fearsome warriors, Kali. Kali sprang forth from the heart of Durga, the primal female goddess, as a terrifying sight, with wild hair and glowing red eyes, a long tongue, fangs, and a belt of severed hands and a necklace of severed heads. Kali was not just one of their best warriors but one of their brightest, and she assessed the situation right away and began to cut off the heads of the Raktabijas and drink their blood with her long tongue, catching any rogue blood drops before they could hit the holy ground. By cutting off the heads, drinking the demonic blood, and not letting any fall on the ground, she could prevent new demons from being born.{"\n"}


                                    </Text>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/image74.png" }} style={{ width: 300, height: 350 }} />

                                    <Text style={style.textView}>
                                        {"\n\n\t\t\t"}With each demon she slayed, she grew in power and eventually was moving so swiftly that she had killed and consumed all the demons. But this came with a dangerous side effect. She had ingested so much of the demonic blood that she became possessed with bloodlust, and began to kill the gods as well. The gods were terrified now because if they could not defeat the infinite army of Raktabijas, they definitely could not defeat Kali. They were out of options, and decided to call Shiva, the God of Yoga, which was something they had not thought of until that moment.{"\n"}

                                        {"\t\t\t"}Shiva arrived and surveyed the battlefield, at once realizing with his great wisdom that violence would not solve this dilemma. Thus he laid down on his back in corpse pose, Shavasana, as an act of surrender.{"\n"}

                                    </Text>

                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/image275.png" }} style={{ width: 300, height: 250 }} />
                                    <Text style={style.textView}>
                                        {"\n\n\t\t\t"}Kali saw this at first as an act of cowardice, and she stood on him with her weapons drawn back, ready to destroy him. But she paused, for you see, Kali was made from the light of Durga, and so was Shiva’s wife, Parvati. Although they are at different ends of the spectrum, they are made from the same light. Pieces of each other exist in the other – so the pieces of Parvati that love Shiva exist in Kali – and although Kali was possessed with demonic hate and violence, love is always stronger than hate. Those particles of love exploded in defiance against the hate in Kali’s blood, and the love burned so bright that it caught the demonic blood on fire. The fire raged throughout Kali’s body, burning out her demonic blood and purifying her in the same instant.{"\n\n"}

                                        <Text style={{ fontWeight: "bold" }}>
                                            {"\t\t\t"}Representation in the body:{"\n\n"}
                                        </Text>
                                        {"\t\t\t"}When we take Shavasana, we surrender just like Shiva did- realizing that sometimes the best solution and most helpful act is not to act at all. Surrendering can be one of the hardest things to do especially in the world where live in where our lives can be constant struggles and mini conflicts. How amazing is it to have a safe, supported place to be able to just totally let go and surrender to time, to the present moment to our breath.{"\n\n"}

                                        <Text style={{ fontWeight: "bold" }}>
                                            {"\t\t\t"}Feel the story in your body:{"\n"}
                                        </Text>
                                    </Text>
                                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginLeft: 20, marginRight: 20 }}>
                                        <View style={{ marginVertical: 5, padding: 5, marginHorizontal: 0, flexDirection: 'row' }}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString2}</Text>
                                            <Slider
                                                onTouchStart={this.onSliderEditStart2}
                                                onTouchEnd={this.onSliderEditEnd2}
                                                onValueChange={this.onSliderEditing2}
                                                value={this.state.playSeconds2} maximumValue={this.state.duration2} maximumTrackTintColor='white' minimumTrackTintColor='white' thumbTintColor='white'
                                                style={{ paddingLeft: 120 }} />
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{durationString2}</Text>

                                            {this.state.playState2 == 'playing' &&
                                                <TouchableOpacity onPress={this.pause2} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_pause} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}
                                            {this.state.playState2 == 'paused' &&
                                                <TouchableOpacity onPress={this.play2} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_play} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}

                                        </View>
                                    </View>
                                    <Text style={style.textView}>
                                        <Text style={{ fontWeight: "bold" }}>
                                            {"\t\t\t"}Moral:{"\n"}

                                        </Text>
                                        {"\t\t\t"}We live in a world that tends to use violence as a solution to the problem of violence, which results in more violence. While sometimes we must fight against the tides of fate, there are other times when we must surrender to them, allowing them to take us. The tricky part is knowing when to fight and when to surrender.{"\n"}

                                    </Text>

                                </View>

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
        fontWeight: "bold",
        textAlign: "center"
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