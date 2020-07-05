import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator,Image, Alert, ScrollView } from 'react-native'
import Slider from "@react-native-community/slider"
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';
import Toast, {DURATION} from 'react-native-easy-toast'
import SQLite from 'react-native-sqlite-storage'
var Sound = require('react-native-sound');
const img_pause = require('../assets/images/ui_pause.png');
const img_play = require('../assets/images/ui_play.png');
var db;
export default class Page2Screen extends React.Component {
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
            flagDisplay: "flex",
            fontSize: 0,
            display: "none",
            indcator:false,
            x:0,
            y:0,
            bookmark:[],
            chapterName :"The Legent of Garuda (Eagle)"

        }
        this.sliderEditing = false;
        this.sliderEditing1 = false;
        this.sliderEditing2 = false;
        
        const unsubscribe1 = this.props.navigation.addListener('blur', () => {
            this.component1()

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
            tx.executeSql("CREATE TABLE IF NOT EXISTS bookmarks(id INTEGER PRIMARY KEY AUTOINCREMENT,xValue TEXT, yValue TEXT)", [], (res) => {
                console.log("TAble Created")
            }, (err) => {
                console.log("Table Not Created", err);
            })
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

        // if (this.state.flag) {
        //     this.setState({ flagDisplay: "flex" })
        //     this.setState({ flag: false })
        // } else {
        //     this.setState({ flagDisplay: "flex" })
        //     this.setState({ flag: true })
        // }
        // console.log(this.state.bookmark)
    }

    component1() {

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
            this.setState({ playState: 'playing', });
        } else {
            const filepath = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a_1.mp3";
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
        if (this.sound2) {
            this.pause2()
        }
        if (this.sound) {
            this.pause();
        }
        if (this.sound1) {
            this.sound1.play(this.playComplete);
            this.setState({ playState1: 'playing' });
        } else {
            const filepath1 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a_2.mp3";
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
            const filepath2 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/garuda_story_3.mp3";
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
                        <TouchableOpacity style={style.butonViewLeft} onPress={() => this.props.navigation.navigate('Introduction')}>
                            <MaterialIcons name="chevron-left" size={30} color="white"></MaterialIcons>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.butonViewRight} onPress={() => this.props.navigation.navigate('The Legend of Hanuman (Monkey)')}>
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
                                    <TouchableOpacity style={{ flexDirection: "row", paddingLeft: 15 }} onPress={() => this.props.navigation.navigate("Edit")}>
                                        <MaterialIcons name="edit" size={25} color="white" style={{ paddingLeft: 0 }}></MaterialIcons>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ right: 0, alignItems: "center", paddingLeft: 5 }} onPress={() => this.flagSet()}>
                                        <Entypo name="bookmark" size={25} color="white" style={{ paddingLeft: 5 }}></Entypo>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>

                    <ScrollView style={style.scrollView} onScroll={(event)=>{
                        this.setState({y:event.nativeEvent.contentOffset.y,x:event.nativeEvent.contentOffset.x})
                        // console.log(event.nativeEvent.contentOffset.y)
                        // console.log(event.nativeEvent.contentOffset.x)
                    }}>

                    
                        {
                                this.state.bookmark.map((i,index)=>{
                                    // console.log(i);
                                return(
                                        <View style={{position:"absolute",top:i,left:this.state.x}} key={index}>
                                            <TouchableOpacity onLongPress={()=>this.deleteFlag(i)} style={{padding:5}}>
                                            <Entypo name="bookmark" size={40} color="#7d5a5a" style={{ paddingLeft: 0, display: "flex"}}></Entypo>
                                            </TouchableOpacity>
                                        
                                        </View>)
                                })
                            
                        }
                        <View>
                            {/* Heading */}

                            <View>

                                <View style={{ flex: 1, alignItems: "center" }}>
                                    <Text style={style.text}>
                                        THE LEGEND OF GARUDA
                                        </Text>
                                    <Text style={{ fontSize: 18, textAlign: "center", paddingTop: "2%", fontWeight: "bold" }}>
                                        THE BIRD OF A THOUSAND SUPERNOVAS
                            </Text>
                                </View>

                                <View style={{ alignItems: "center", paddingTop: "8%" }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/garudaemblem.jpg" }} style={{ width: 270, height: 150}} />
                                    <Text style={{ fontSize: 18, paddingTop: "15%", fontWeight: "bold" }}>
                                        GARUDASANA – गरुडासन
                                    </Text>
                                    <Text style={{ fontWeight: "bold",fontSize:11 }}>
                                        {"\n"} GARUDASANA IN SANSKRIT:
                                    </Text>
                                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginTop: 10 }}>
                                        <View style={{ marginVertical: 5, padding: 5, marginHorizontal: 0, flexDirection: 'row' }}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString}</Text>
                                            <Slider
                                                onTouchStart={this.onSliderEditStart}
                                                onTouchEnd={this.onSliderEditEnd}
                                                onValueChange={this.onSliderEditing}
                                                value={this.state.playSeconds} maximumValue={this.state.duration} maximumTrackTintColor='white' minimumTrackTintColor='white' thumbTintColor='white'
                                                style={{ paddingLeft: "35%" }} />
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
                                        How to say GARUDASANA in Sanskrit:
                        </Text>
                                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginTop: 10 }}>
                                        <View style={{ marginVertical: 5, padding: 5, marginHorizontal: 0, flexDirection: 'row' }}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString1}</Text>
                                            <Slider
                                                onTouchStart={this.onSliderEditStart1}
                                                onTouchEnd={this.onSliderEditEnd1}
                                                onValueChange={this.onSliderEditing1}
                                                value={this.state.playSeconds1} maximumValue={this.state.duration1} maximumTrackTintColor='white' minimumTrackTintColor='white' thumbTintColor='white'
                                                style={{ paddingLeft: "35%" }} />
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
                                </View>
                                <View>
                                    <Text style={style.textView}>
                                        {"\n\t\t\t"}When we hear this pose in English, we typically hear it as Eagle Pose.
                        But one quick glance at the shape of this pose leaves some questions as to
                        how it could resemble an eagle. In reality, the pose is not named after an eagle,
                         but is instead named after Garuda, the great bird deity of Hinduism. Now, that would
                          be a bit of a mouthful to fit into a pose name – Greatbirddeityofhinduismasana – so
                           over time, yoga practitioners in the United States came to call it “Eagle Pose,” a
                           name that retains its relevancy. In the U.S., the eagle represents national identity, pride,
                        and martial prowess; Garuda represents these same things in India.
                        </Text>
                                    <View style={{ alignItems: "center", paddingBottom: 30, paddingTop: 30 }}>
                                        < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/256dither.gif" }} style={{ width: 270, height: 150 }} />
                                    </View>
                                    <Text style={style.textView}>
                                        The shape of the pose, however, does not translate well from one nation to the other, as I’m sure you’ve
                                        never seen an eagle resting on one leg with the other wrapped around it, and its wings wrapped
                                        around its body. The shape of the pose, and even the transition of the pose, is actually deeply
                                        entwined with Garuda’s birth story, and so to understand this pose we must go back to his
                         beginnings and even earlier than that.{"\n"}
                                        {"\t\t\t"}Kashyapa, a great and powerful sage and forefather,
                         and grandsire to all the animal species, had two wives whom he loved very much – so much so
                         that he wanted to honour each one with a wish. The first wife, Kadru,
                         wished for a thousand sons, and so Kashyapa nodded and told her she would give birth to the
                         Naga, a race of sentient snake people. The second wife, Vinata, knew that she didn’t want a
                         thousand sons and so decided to ask for just two – but asked that her two sons have the power
                         of a thousand sons (suns). Kashyapa nodded at this and told her that her offspring would bear
                         the power of the sun itself.{"\n"}

                                        {"\t\t\t"} Great things take a great deal of time to develop, and so it is even truer for the offspring
                        in this story. Five hundred years after Kadru made her wish, her thousand eggs began to hatch,
                         and, just as predicted, what came forth were the Naga. Vinata, curious to see what she would
                         have, decided to hatch one of her eggs early. She cracked it open, but this would prove to be
                         a grievous mistake on her end. Inside her egg was a half-man, half-bird, disfigured creature with only
                          the upper half of his body fully formed and smallish wings for his lower half. The enraged
                          creature flew from his shattered egg home with his little leg wings and cursed his mother for
                          hatching him early.{"\n"}

                                        {"\t\t\t"} “You’ve cursed me with your impatience and so I curse you. One day you’ll be enslaved by one you love.”{"\n"}

                                        {"\t\t\t"} With that declaration, her son flew away to make his way in the world.{"\n"}

                        Vinata, horribly embarrassed by the whole ordeal, vowed not hatch the second
                        egg no matter what, and so she began to wait. The years passed, the decades
                         passed, and even the centuries passed until the power of a thousand suns
                         couldn’t be held inside the egg anymore.{""}
                                    </Text>
                                    <View style={{ alignItems: "center", paddingTop: 10, paddingBottom: 30 }}>
                                        < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/garudamanycolours.gif" }} style={{ width: 300, height: 245 }} />
                                    </View>
                                    <Text style={style.textView}>
                                        {"\t\t\t"} It cracked... and then shattered. What issued forth was a supernova of flames and light, as two giant,
                         fiery wings spread out so big and wide it was if they could touch the sides of the universe.
                        </Text>
                                    <View style={{ alignItems: "center", paddingTop: 30, paddingBottom: 30 }}>
                                        < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/image2.jpeg" }} style={{ width: 300, height: 200 }} />
                                    </View>
                                    <Text style={style.textView}>
                                        {"\t\t\t"} Naturally, this would be a terrifying thing to behold in the night sky, and the whole Earth
                        cried out in terror, “Oh my God.” Even the gods themselves cried out, “Oh my me.... Whoever
                         you are, please contain your fire and make yourself small.”{"\n"}

                                        {"\t\t\t"} The great, fiery bird god heard their cries and, out of compassion
                       and reason, shrunk his body up and took a mortal form.
                        </Text>
                                    <View style={{ alignItems: "center", paddingTop: 30, paddingBottom: 30 }}>
                                        < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/mortalis.jpg" }} style={{ width: 300, height: 250 }} />
                                    </View>
                                    <Text style={style.textView}>
                                        {"\t\t\t"} Now, not everyone was terrified of this display of power. In fact, the Naga wanted this power for
                            themselves, but they knew they could never have the power of a god. But they thought that maybe,
                            if they couldn’t have the power of a god, that perhaps they might live as long as a god. The gods
                            drink a special elixir called Amrita, and drinking it regularly allows them immortality. Such a
                            valuable gift requires the world’s most aggressive security system, guarded not just by the gods
                            themselves. The Amrita is surrounded by a force field of flames hotter than the sun, and beyond
                            that another force field of spinning swords and blades. And, if that wasn’t enough, behind all
                            of that lies two magical king cobras. One bite from these cobras would render anyone, god or
                            mortal, dead. The Naga, knowing they couldn’t get through such a security system, devised a
                            plan to trick Garuda into getting the Amrita for them. (This is where the curse from earlier,
                            “You’ve cursed me with your impatience and so I curse you. One day you’ll be enslaved by one
                            you love,” comes into play.) The Naga and Kadru devised a deceptive bet, and enslaved Garuda’s
                            mother, Vinata, holding her captive and asking for the Amrita as ransom. Garuda, seeing no
                            other option but to play along, flew to where the Amrita was being kept. It was guarded by
                            the very gods themselves in all their wrath, and their weaponry was out and ready to meet
                            Garuda when he arrived.Instead of outright engaging them in battle, he unleashed his divine
                            wingspan and the blinding light caused the gods to cover their eyes. As they did, Garuda
                            was able to fly past them. He spit out water from the holy Ganga River, dousing and
                            extinguishing the flames of the first force field. He then shrank his body up and squeezed
                            through the spinning blades and swords of the second force field. When the two deadly
                            magical king cobras lunged for him, he blinded them by opening his wings and buffeting
                            sand into their eyes, then attacked them from the sides and defeated them. With the
                            Amrita in tow, Garuda flew away – it had all unfolded so quickly that the guards barely
                            had time to wipe their eyes before they realized Garuda and the nectar were gone.{"\n"}

                                        {"\t\t\t"} Upon returning to the Naga, Garuda threw the Amrita down before them and
                            it spilled out on the grass. The Naga began to drool at the sight of the
                            powerful elixir of power before them. The Naga released Garuda’s mother,
                            but before they could pounce on the Amrita, Garuda implored them to perform
                            ablutions before feasting on such a divine elixir. The Naga, not forgetting their manners,
                            rushed off to wash up before their feast and, while they were distracted, Garuda made off with
                            the Amrita and his mother.The Naga returned to find the Amrita gone, along with Garuda and his
                            mother, with nothing left but the spillage all over the grass. They sprang on the grass in a
                            frenzy and began to lick the Amrita off the grass, licking so furiously that they all split
                            their tongues in half. From that point forward, the Naga’s descendants, the snakes of the world,
                            would bear split tongues to show the shame of the misdeeds of their ancestors.{"\n"}

                                        {"\t\t\t"}Now since the Naga only got some licks of the Amrita and consumed it
                            in a non-ritualistic, dishonourable way, they didn’t gain full immortality, only
                            a cursed immortality. In this cursed immortality, they would shed their old skin
                            every few years in place of their old lives, and their descendants would bear this
                            mark of shame as well.Garuda returned the Amrita back to the gods, and they forgive
                            him for his actions, even rewarding him with immortality for returning the Amrita to
                            them. In the end, Garuda became the divine mount for Vishnu,
                            flying him around the world as the two of them rescue people from shipwrecks.{"\n"}

                                        {"\t\t\t"} ....Oh, and if you were wondering about Garuda’s older brother, the
                           one who was hatched early and cursed their mother, don’t fret. His name was Aruna,
                           and he became the charioteer for the sun itself, Surya.{"\n\n"}

                                        <Text style={{ fontWeight: "bold" }}>
                                            {"\t\t\t"} Representation in the body:{"\n"}
                                        </Text>

                                        {"\t\t\t"}When we take Garudasana, we are the cosmic egg of Garuda
                            himself, squeezing and compressing everything into the centerline of
                            the body, all the power and density of a thousand suns, until the
                            pressure can’t be contained anymore. At that point, our “egg” explodes
                            and we rise up and spread out our arms like Garuda’s fiery wings,
                            infinitely wide apart, as we touch our wings to the sides of the universe.
                            Just like Garuda, we are compassionate and humble, and so we wrap our bodies
                            up in a humble mortal form as we transition to the other side. Like the Phoenix,
                            another fiery bird of myth, when we start the other side of Garudasana, the story
                            begins from the start: We are remade back into the cosmic egg to relive the birth story again.{"\n"}

                                        {"\t\t\t"}Garuda is a unique pose where the story is resembled not just in the pose
                            itself but also in the transition of the pose. Some key points here to really bring
                            the story to life in your practice or teaching is to focus on the compression of the
                            legs and arms in the front, imagining the gravitational pull of a thousand suns between
                            the knees and elbows pulling ever stronger and stronger. Conversely, you can also imagine
                            the combustive, explosive, and expansive power of a thousand suns in the back of the body,
                            predominantly between the shoulder blades. Then, as the body transitions to the other side, explode the arms
                            out to the sides and imagine them as fiery wings touching the sides of the universe.{"\n\n"}
                                        <Text style={{ fontWeight: "bold" }}>
                                            {"\t\t\t"}Feel the story in your body:{"\n"}
                                        </Text>
                                    </Text>
                                    <View style={{ alignItems: "center", paddingTop: "0%" }}>
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
                                    </View>
                                    <Text style={style.textView}>
                                        <Text style={{ fontWeight: "bold" }}>
                                            {"\t\t\t"} Moral:{"\n"}
                                        </Text>
                                        {"\t\t\t"}The story of Garuda is all about when we should be humble and
                            when we should shine – and by shine, I mean when are we our biggest and
                            our brightest. In Garuda’s story, he shines from the moment he’s born.
                            He becomes a great and terrifying supernova in the sky and scares
                            everyone, even the gods. This wasn’t the right time for him to shine,
                            but it’s hard to fault Garuda for his ignorance since he was just a
                            newborn. Later on, when his mother is in trouble, he shines again to
                            blind the ones guarding the Amrita so that he doesn’t have to kill them.
                            This is a great example of when to shine.{"\n"}

                                        {"\t\t\t"}We shine like Garuda when we help people not just to say,
                            “Here I am,” but when we shine out of purpose and compassion. At other
                            times, we can be humble and allow others to shine when they need to.
                        </Text>
                                    <Text style={{ paddingBottom: 40 }}></Text>
                                </View>
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
        backgroundColor: "white",

    },
    text: {
        color: "#161924",
        fontSize: 22,
        paddingTop: "10%",
        fontWeight: "bold"
    },
    textView: {
        padding: 10,
        lineHeight: 21,
        fontSize: 16,
        fontFamily: "sans-serif",
        // color:"gray",
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
    scrollView: {
        marginHorizontal: 1,
        paddingVertical: 20
    },
    flotingButton:{
        borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:40,
       zIndex: 1,
       position: 'absolute',                                          
       top:10,                                                    
       left: 10,
       height:40,
       backgroundColor:'#fff',
       borderRadius:100
    }
})