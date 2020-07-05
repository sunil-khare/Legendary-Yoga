import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo'
import Slider from "@react-native-community/slider"
import Toast, {DURATION} from 'react-native-easy-toast'
import SQLite from 'react-native-sqlite-storage'
var db;
var Sound = require('react-native-sound');
const img_pause = require('../assets/images/ui_pause.png');
const img_play = require('../assets/images/ui_play.png');
export default class Page6Screen extends React.Component {

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
            chapterName :"The Legend of Matsyendra (Twist)"
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
            const filepath = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a5_1.mp3";
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
            const filepath1 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a5_3.mp3";
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
            const filepath2 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/matsyendra_story5_2.mp3";
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
                        <TouchableOpacity style={style.butonViewLeft} onPress={() => this.props.navigation.navigate('The Legend of Nataraj (Dancer)')}>
                            <MaterialIcons name="chevron-left" size={30} color="white"></MaterialIcons>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.butonViewRight} onPress={() => this.props.navigation.navigate('The Legend of Shiva, Kali and the Demon Raktabija')}>
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
                    <ScrollView style={style.scrollView} onScroll={(event)=>{
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
                            {/* Heading */}
                            <View style={{ flex: 1, alignItems: "center" }}>
                                <Text style={style.text}>
                                    THE LEGEND OF MATSYENDRA
                            </Text>
                                <Text style={{ fontSize: 18, textAlign: "center", paddingTop: "3%", fontWeight: "bold" }}>
                                    TWIST TO TRANSFORM
                            </Text>
                            </View>
                            <View style={{ alignItems: "center", paddingTop: "10%" }}>
                                < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/fishsmall.png" }} style={{ width: 330, height: 415 }} />



                                <Text style={{ fontWeight: "bold", paddingTop: 40 ,fontSize:11}}>
                                    ARDHAMATSYENDRASANA in Sanskrit:
                                </Text>
                                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginTop: 10 }}>
                                    <View style={{ marginVertical: 5, padding: 5, marginHorizontal: 0, flexDirection: 'row' }}>
                                        <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString}</Text>
                                        <Slider
                                            onTouchStart={this.onSliderEditStart}
                                            // onTouchMove={() => console.log('onTouchMove')}
                                            onTouchEnd={this.onSliderEditEnd}
                                            // onTouchEndCapture={() => console.log('onTouchEndCapture')}
                                            // onTouchCancel={() => console.log('onTouchCancel')}
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
                                    How to see ARDHAMATSYENDRASANA in Sanskrit:
                                </Text>
                                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginTop: 10 }}>
                                    <View style={{ marginVertical: 5, padding: 5, marginHorizontal: 0, flexDirection: 'row' }}>
                                        <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString1}</Text>
                                        <Slider
                                            onTouchStart={this.onSliderEditStart1}
                                            // onTouchMove={() => console.log('onTouchMove')}
                                            onTouchEnd={this.onSliderEditEnd1}
                                            // onTouchEndCapture={() => console.log('onTouchEndCapture')}
                                            // onTouchCancel={() => console.log('onTouchCancel')}
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
                                <Text style={{ textAlign: "center", padding: 2, fontSize: 20, fontWeight: "bold" }}>
                                    {"\n"}MATSYENDRASANA - अर्धमत्स्येन्द्रासन
                                </Text>
                                <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
                                    (MATSYA-मत्स्य-Fish INDRA-इन्द्र-LORD {"\n"} MATSYENDRA-अर्धमत्स्येन्द्र-LORD OF THE FISHES){"\n"}
                                </Text>
                                <Text style={style.textView}>
                                    {"\t\t\t"}This story relates to the origin and history of Hatha yoga, and is part myth, part spotty history. Disclaimer -
                                    <Text style={{ fontStyle: "italic" }}>(Typically, the farther back in history you go, the more fantastical myth seems to seep into the storytelling. But this is even the case with the relatively recent histories of famous yogis within the last 100 years – even their stories are heavily mixed with myth. So going back 1000 years we are steeped with deep deep myth, as we wade into these murky waters of the past know that there are few records and there isn't much we can be sure of for who/what/where/when This story deals with the founding of Hatha Yoga as A Mythological Legend but the real history has often conflicting sources){"\n"}</Text>

                                    {"\t\t\t"}Most students at your average yoga studio have seen the word “hatha” (pronounced ha-tah – there is no “th” sound in Sanskrit), and most students casually associate Hatha yoga with traditional or non-stylistic yoga. But the word “hatha,” which means forceful, was intended to delineate physical yoga practices from nonphysical practices. We might not think of our physical yoga practice as forceful, but when the ancient schools of yoga centered on chanting, singing, dancing, or meditation, a rigorous physical practice of asanas was seen as forceful by comparison.{"\n"}

                                    {"\t\t\t"}Roughly a thousand years ago, Shiva, the God of Yoga, was in deep meditation on the meaning of yoga while on top of a mountain. It was then that he discovered Hatha yoga (physical yoga), and he was so overjoyed at his discovery that he wanted to share it with his wife, Parvati. He found her near a stream and began to tell her all about this wonderful system of yoga – the yoga poses themselves, the pranayama, the cleansing acts, and more – but Parvati was not interested. She pretended to listen, but it turns out there was someone who was genuinely interested in what Shiva was sharing – a fish who had been swimming by them at the time. The fish twisted its body to hear about the yoga, and was able to absorb massive quantities of the information being imparted by the God of Yoga into his small fishy form. The attentive student impressed Shiva – so much so that Shiva blessed the fish on its third eye.{"\n"}

                                    {"\t\t\t"}This is where the story has been divided into multiple versions.{"\n"}

                                    {"\t\t\t"}One version is that when Shiva touched the fish’s third eye, the fish instantly transformed into a man, wearing orange robes and known as Matsyendra.{"\n"}



                                </Text>
                                < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/matsyendra3.gif" }} style={{ width: 300, height: 250 }} />
                                <Text style={style.textView}>
                                    {"\n\t\t\t"} Another version says that when Shiva touched the fish’s third eye, the fish became visibly ill and vomited the man Matsyendra out in front of him, manifesting him into reality from the fish’s blessed nature.{"\n"}

                                    {"\t\t\t"}Yet another version, and possibly my favourite, says that when Shiva touched the fish’s third eye, nothing happened, and the fish swam away and lived out its little fishy life. But when that fish died, instead of being reborn as another fish or a frog or a toad, it was reborn as a baby boy. This little boy remembered when he was a fish, and remembered the time he had met Shiva and the god had taught him all about yoga. Those lessons remained in the boy’s mind and spirit. The boy grew up to found the Hatha Yoga School, and from him come all the modern schools of Hatha yoga: Ashtanga, Sivananda, Modo, Iyengar, and many others.{"\n"}

                                    {"\t\t\t"}Now, we can look at that version of the myth in two ways. It might be true, and if it is, that’s mind-blowing because it means that, not only is God real, but they do yoga! The other way to look at it is that the myth is not true, and the young boy was merely that, with a big imagination.{"\n"}

                                    {"\t\t\t"}Strange as it sounds, though, I like to believe the second one, because it shows us that if we dont limit ourselves in what is possible and what is 'real' we can achieve some amazing huge things. If this whole yoga world came out at least in part of a little boy who had a big imagination then that's worth investing in child's imagination and not limiting them. {"\n\n"}
                                    <Text style={{ fontWeight: "bold" }}>
                                        {"\t\t\t"}Representation in the body:{"\n"}
                                    </Text>
                                    {"\t\t\t"}When we take Ardha Matsyendrasana, we pretend we are the fish turning to learn and to listen to Shiva, opening ourselves up to wisdom. We might also pretend that we are the fish transforming into a man, leaving the old fish life behind and moving toward new paths and better choices.{"\n"}

                                    {"\t\t\t"}Another way to look at the pose is that a twist is the simplest act of conscious transformation – we twist our bodies away from what we don’t want and toward what we do want.{"\n\n"}

                                    <Text style={{ fontWeight: "bold" }}>
                                        {"\t\t\t"} Feel the story in your body:
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
                                        {"\n\t\t\t"} Moral: {"\n"}
                                    </Text>
                                    {"\t\t\t"}The transformation and lessons of yoga are not just for the rich and divine; they are also for the lowest of us stuck in murky waters. As long as we are willing to put in the time to learn, we may be transformed into the highest form of ourselves mentally, physically, and emotionally.{"\n"}

                                    {"\t\t\t"} A regular yoga practice has an interesting way of transforming us, turning us away from the things we don’t need, that don’t fulfill us, and turning us toward the things that do. It does this by giving us a deep sense of awareness, not just of our bodies but also of our lives. It lets us see through the mists of confusion so that we can fully see what is serving us and what isn’t. Though deep down we always know what is serving us and what isn’t, yoga helps bring it to the surface. {"\n"}

                                </Text>
                            </View>

                            <Text style={{ paddingBottom: 40 }}></Text>
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
        backgroundColor: "#FFFF"
    },
    text: {
        color: "#161924",
        fontSize: 22,
        fontWeight: "bold",
        paddingTop: "15%"
    },
    textView: {
        padding: 10,
        lineHeight: 21,
        fontSize: 15,
        alignItems: "center",
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