import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import Slider from "@react-native-community/slider"
import Toast, {DURATION} from 'react-native-easy-toast'
import SQLite from 'react-native-sqlite-storage'
var db;
var Sound = require('react-native-sound');
const img_pause = require('../assets/images/ui_pause.png');
const img_play = require('../assets/images/ui_play.png');
export default class Page4Screen extends React.Component {
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
            chapterName :"The Legend of Virabhadra (Warrior)"
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
            const filepath = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a3_1.mp3";
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
            const filepath1 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a3_2.mp3";
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
            const filepath2 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/virabhadra_story3_3.mp3";
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
                        <TouchableOpacity style={style.butonViewLeft} onPress={() => this.props.navigation.navigate('The Legend of Hanuman (Monkey)')}>
                            <MaterialIcons name="chevron-left" size={30} color="white"></MaterialIcons>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.butonViewRight} onPress={() => this.props.navigation.navigate('The Legend of Nataraj (Dancer)')}>
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
                                        <View style={{position:"absolute",top:i,left:this.state.x}} key={index}>
                                            <TouchableOpacity onLongPress={()=>this.deleteFlag(i)} style={{padding:5}}>
                                            <Entypo name="bookmark" size={40} color="#7d5a5a" style={{ paddingLeft: 0, display: "flex"}}></Entypo>
                                            </TouchableOpacity>
                                        
                                        </View>)
                                })
                            
                        }
                        <View>
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Text style={style.text}>
                                    THE LEGEND OF VIRABHADRA
                            </Text>
                                <Text style={{ fontSize: 18, textAlign: "center", paddingTop: "2%", fontWeight: "bold" }}>
                                    THE INTERNAL BATTLEFIELD
                                </Text>
                                <View style={{ paddingTop: 50 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/ShivaVira41.png" }} style={{ width: 300, height: 400 }} />
                                </View>
                                <Text style={{ fontSize: 20, paddingTop: "15%", fontWeight: "bold" }}>
                                    VIRABHADRASANA - वीरभद्रासन
                                </Text>
                                <Text style={{ fontWeight: "bold",fontSize:11 }}>
                                    {"\n"} VIRABHADRASANA in Sanskrit:
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
                                    How to say VIRABHADRASANA in Sanskrit:
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
                                <Text style={{ fontSize: 21, paddingTop: "15%", fontWeight: "bold", textAlign: "center" }}>
                                    VIRABHADRASANA 1,2,3+ EXALTED WARRIOR - वीरभद्रासन (VIRA-वीर-HERO/PROTECTOR/GUARDIAN  BHADRA-भद्रा-AUSPICIOUS)
                                </Text>
                                <Text style={style.textView}>
                                    {"\t\t\t"} Virabhadra – {"\n"}

                                    {"\t\t\t"} There are three constants in the universe: birth, death,
                                and the time between the two. Broadly speaking, in Hinduism these
                                three truths are represented by three entities, or gods: Brahma,
                                the God of Creation; Vishnu, the God of Maintaining, or Perseverance;
                                and Shiva, the God of Destruction and Change. These three truths of the
                                universe are natural, part of existence, and something we practice to accept.
                                The first two are easy to practice and accept, but the third is something that is
                                always more difficult. This story is all about what happens when we can’t accept
                                destruction or change, when we push against that natural truth of the universe and
                                it pushes back with a vengeance. {"\n"}

                                    {"\t\t\t"}The story begins with Shiva, the manifestation of destruction and change
                                in the universe. Since yoga can be about destruction (e.g., destroying old habits and
                                ways of living that aren’t serving us), Shiva is also the God of Yoga. Shiva is the
                                quintessential yogi and looks the part. But that doesn’t mean he’s running around in
                                Lululemon, with a yoga mat on his back and his hair in a scrunchie – but perhaps that’s
                                what the modern manifestation would look like. No, instead Shiva is often depicted as
                                being clad in a tiger skin loincloth, wild, with long dreadlocks and ashen, grayish blue
                                skin, since he rubs the ashes of the dead into his skin to remind him that everyone
                                eventually turns to ash. (Interestingly enough, it’s rumored that Shiva only began this
                                practice after the events of the story you’re about to read.) Being the original yogi,
                                Shiva was also a renunciant,
                                meaning he had renounced and given up worldly things like a job, family, wife, etc.{"\n"}

                                    {"\t\t\t"}This is how he had existed until the day he saw the most beautiful woman
                                in the whole universe. Her beauty was so radiant and overwhelming that Shiva gave up
                                the “giving up” – he gave up the life of renouncing. The woman’s name was Sati, and when
                                Sati told her father, Daksha (a great and mighty king), whom she was to marry, he was enraged. But
                                nonetheless, he accepted the marriage, setting his mind to breaking up and dissolving it. {"\n"}

                                    {"\t\t\t"}So Daksha threw a huge party to which he invited all of heaven and all
                                the gods – more specifically, he invited all the things he wanted in his life: Brahma
                                (creation) and Vishnu (maintenance), but not Shiva (change). Remember, though, that
                                while change/destruction might be difficult to invite or accept in our life,
                                when we push it away, it pushes back with a vengeance.{"\n"}

                                    {"\t\t\t"}When Sati arrived at the party, she was enraged that her husband and love
                                of her life, Shiva, had not been invited. But Daksha disrespected
                                her and mocked her, causing Sati to kill herself on a sacrificial fire (yagna).{"\n"}
                                </Text>
                                < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/Virabhadrasana1.png" }} style={{ width: 300, height: 350 }} />
                                <Text style={style.textView}>
                                    {"\n\t\t\t"} When Sati died, Shiva was in a deep meditation, so deep that he felt Sati’s
                                death as if it was his own. That shook him to the core, and even as the god of change,
                                he could not accept this change, this loss. Overcome with grief and rage, Shiva began to
                                pull out his dreadlocks and throw them to the ground, almost as though he was tearing
                                his own painful emotions from his body. His dreadlocks exploded into a giant vengeful,
                                wrathful being named Virabhadra. Virabhadra appeared as a terrifying and towering being
                                with eight arms, each holding a deadly weapon, sharp tusks or fangs, glowing red eyes,
                                and great flames billowing
                                from his head. He was Shiva’s rage and wrath personified into a single entity.{"\n"}

                                    {"\t\t\t"}Virabhadra left at once to seek revenge for what had befallen Shiva and his deceased wife.
                                He arrived at Daksha’s party and made his presence known by announcing:{"\n"}

                                    {"\t\t\t"}“Know that I am come to destroy the sacrifice of Daksha, and that I am called Vírabhadra, the issue of the wrath of Rudra (Shiva).”{"\n"}


                                </Text>

                                < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/Virabhadrasana2.png" }} style={{ width: 315, height: 250 }} />

                                <Text style={style.textView}>
                                    {"\n\t\t\t"}With that proclamation, Virabhadra, like a wrathful tornado of limbs and fearsome deadly weapons, engaged in combat with all of the party guests, which included some of the most powerful Hindu gods. The gods put up a great fight, but none could withstand the unrelenting rage and destruction of Virabhadra. All of them retreated or surrendered.{"\n"}

                                    {"\t\t\t"}Virabhadra then spotted Daksha, and, with one swoop of his sword, decapitated him.{"\n"}


                                </Text>

                                < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/JayaVirabhadrasana.png" }} style={{ width: 315, height: 250 }} />
                                <Text style={style.textView}>
                                    {"\n\t\t\t"}In an act of exaltation and victory, Virabhadra lifted Daksha’s head up in the air, as an offering to Shiva. He then took the head and placed it in the yagna, the sacrificial fire, destroying it and turning it to ash.{"\n"}

                                </Text>
                                < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/Virabhadrasana3.png" }} style={{ width: 320, height: 180 }} />

                                <Text style={style.textView}>
                                    {"\n\t\t\t"}Shiva showed up after the carnage and mayhem to a scene of death and destruction caused by his emotions. He tried to make things right, healing the injured and even taking the head from a sacrificed goat and placing it on Daksha’s body. Daksha came back to life and asked for forgiveness, which Shiva gave him.{"\n"}

                                    {"\t\t\t"}Later, Sati was reborn as Parvati, the Goddess of Love, and she and Shiva live happily ever after.{"\n"}

                                    <Text style={{ fontWeight: "bold" }}>
                                        {"\n\t\t\t"} Representation in the body:{"\n"}
                                    </Text>

                                    {"\t\t\t"}When we take Warrior one, or Virabhadrasana 1, we are Virabhadra exploding out of the earth and growing tall. The legs are in the earth, the mountains; the arms are in the sky. Each finger represents an arm bearing a deadly weapon.{"\n"}

                                    {"\t\t\t"}When we take Warrior two, or Virabhadrasana 2, we are Virabhadra in the field of battle, chaos enveloping everyone at the party, and cutting off the head of Daksha.{"\n"}

                                    {"\t\t\t"}When we take Exalted warrior, or Jai Virabhadrasana, we are lifting Daksha’s head up in victory.{"\n"}

                                    {"\t\t\t"}When we take Warrior 3, or Virabhadrasana 3, we are Virabhadra dropping Daksha’s head into the fire.{"\n"}

                                    <Text style={{ fontWeight: "bold" }}>
                                        {"\t\t\t"} Feel the story in your body:{"\n"}
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
                                        {"\n\t\t\t"} Moral:{"\n"}
                                    </Text>
                                    {"\t\t\t"}The story of Virabhadra is a cautionary tale of what can happen when we are not present in our lives and not able to accept the natural course of the universe, specifically the element of change. When we are not aware of our emotions and our feelings, they can control us, and our own “Virabhadra” comes out to do as it pleases. We’re often then left to apologize and pick up the pieces.{"\n"}

                                    {"\t\t\t"}Yoga allows us to notice not just our physical body and its minute changes, but our emotional body too. The more we can feel something, the more we can control it.{"\n"}

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
        backgroundColor: "#FFF"
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