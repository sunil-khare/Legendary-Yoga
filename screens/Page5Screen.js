import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';
import Slider from "@react-native-community/slider"
import Toast, {DURATION} from 'react-native-easy-toast'
import SQLite from 'react-native-sqlite-storage'
var db;
var Sound = require('react-native-sound');
const img_pause = require('../assets/images/ui_pause.png');
const img_play = require('../assets/images/ui_play.png');
export default class Page5Screen extends React.Component {
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
            chapterName :"The Legend of Nataraj (Dancer)"
        }
        this.sliderEditing = false;
        this.sliderEditing1 = false;
        this.sliderEditing2 = false;
        const unsubscribe1 = this.props.navigation.addListener('blur', () => {
            this.componentWillUnmount1()

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
    componentWillUnmount1() {
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
        
        this.db.transaction((tx) => {
            // tx.executeSql("CREATE TABLE IF NOT EXISTS bookmarks(id INTEGER PRIMARY KEY AUTOINCREMENT,xValue TEXT, yValue TEXT)", [], (res) => {
            //     console.log("TAble Created")
            // }, (err) => {
            //     console.log("Table Not Created", err);
            // })
            this.setState({bookmark:[]})
            tx.executeSql("SELECT * FROM bookmarks WHERE chapterName = ?", [this.state.chapterName], (rx, tx) => {
        
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
            const filepath = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a4_1.mp3";
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
            const filepath1 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a4_2.mp3";
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
            const filepath2 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/nataraja_story4_3.mp3";
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
                        <TouchableOpacity style={style.butonViewLeft} onPress={() => this.props.navigation.navigate('The Legend of Virabhadra (Warrior)')}>
                            <MaterialIcons name="chevron-left" size={30} color="white"></MaterialIcons>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.butonViewRight} onPress={() => this.props.navigation.navigate('The Legend of Matsyendra (Twist)')}>
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

                    <ScrollView style={style.scrollView} onScroll={(event)=>{
                        this.setState({y:event.nativeEvent.contentOffset.y,x:event.nativeEvent.contentOffset.x})
                        // console.log(event.nativeEvent.contentOffset.y)
                        // console.log(event.nativeEvent.contentOffset.x)
                    }}>
                    {
                                this.state.bookmark.map((i,index)=>{
                                    // console.log(i);
                                return(
                                        <View style={{position:"absolute",top:i,left:this.state.x}} key={index} >
                                            <TouchableOpacity onLongPress={()=>this.deleteFlag(i)} style={{padding:5}}>
                                            <Entypo name="bookmark" size={40} color="#7d5a5a" style={{ paddingLeft: 0, display: "flex"}}></Entypo>
                                            </TouchableOpacity>
                                        
                                        </View>)
                                })
                            
                        }
                        <View>
                            {/* Heading */}


                            <View>

                                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                    <Text style={style.text}>
                                        THE LEGEND OF NATARAJA
                            </Text>
                                    <Text style={{ paddingTop: 10,textAlign:"center", paddingLeft: 10, fontSize: 18, fontWeight: "bold" }}>
                                        THE COSMIC DANCE OF LIFE AND DEATH
                                    </Text>
                                </View>
                                <View style={{ alignItems: "center", paddingTop: 40 }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/Dancertiny.png" }} style={style.images} />
                                    <Text style={{ paddingTop: 80, fontSize: 20, fontWeight: "bold" }}>NATARAJASANA - नटराजासन</Text>
                                    <Text style={{ paddingTop: 5, fontSize: 15, fontWeight: "bold",fontSize:11 }}>NATARAJASANA in Sanskrit:</Text>
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

                                    <Text style={{ paddingTop: 30, fontSize: 15, fontWeight: "bold",fontSize:11 }}>How to say NATARAJASANA in Sanskrit: </Text>

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
                                    <Text style={{ paddingTop: 30, fontSize: 20, fontWeight: "bold" }}>(NATA-नट-DANCER RAJA-राजा-</Text>
                                    <Text style={{ paddingTop: 0, fontSize: 20, fontWeight: "bold" }}>LORD)</Text>
                                </View>
                                <Text style={style.textView}>
                                    {"\n\t\t\t"}This is less of a story and more about the symbolism in the figure Nataraja.
                        Nataraja is the cosmic dancer form of Shiva, dancing the universe in and out of existence in every moment.
                        Typically, Nataraja is pictured with a large circle around its body, representing Samsara, which in Sanskrit
                        translates to “wandering,” which is fitting when describing the path of existence.
                         Each of us can view our self as a lone wanderer, meandering through life after life,
                         through tribulation and triumph, and so on.
                        Samsara connotes the endless cycle of birth, death, and rebirth, for all eternity.
                        </Text>
                                <Text style={style.textView}>
                                    {"\t\t\t"}When modern folks think of rebirth, it is often seen as a quaint,
                         reassuring idea that we can come back and experience earthly pleasures again after death,
                          and maybe even see old friends. But the original yogis tended not to view it this way,
                           and usually saw it as quite the opposite. Life can be hard and full of suffering and
                           agony, and even the most charmed life holds many tragedies and pitfalls, something that
                            the original yogis sought to escape. This is where the concept of moksha, or
                            liberation, was developed. It was believed that with certain yogic practices, the yogi
                            could escape this endless rebirth cycle and instead escape the mortal form and find
                            eternal existence in the formless joy of God.
                        That relationship can be found in the Nataraja pose/shape/story.
                        </Text>
                                <Text style={style.textView}>
                                    {"\t\t\t"}When you see the shape of Nataraja, you might notice it has two extra arms than
                        your average human. Each hand represents a very important part of the journey to
                        moksha, and can be viewed as Nataraja guiding the wanderer on their path,
                        with road signs to help them along their journey.
                        </Text>
                                <Text style={style.textView}>
                                    {"\t\t\t"}The first hand holds a drum and represents creation,
                        because a drum creates sound and, more specifically, birth.{"\n\n"}
                                </Text>
                                <View style={{ alignItems: "center" }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/image21.png" }} style={style.images1} />
                                </View>
                                <Text style={style.textView}>
                                    {"\n\n\t\t\t"}The second hand holds fire and represents destruction,
                            because fire destroys what it touches, and, more specifically, death.{"\n\n"}
                                </Text>
                                <View style={{ alignItems: "center" }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/image22.png" }} style={style.images1} />
                                </View>
                                <Text style={style.textView}>
                                    {"\n\n\t\t\t"}These first two hands represent the dualistic nature of birth and death.
                        But the endless cycle that the wanderer goes through between the two can be a
                        terrifying idea. Yes, we might want to come back and live a life again, see an old
                        loved one or experience the future, but what about the concept of unaware rebirth?
                         Reliving a random occurrence of tragedies, tribulations, and triumphs not just once,
                         twice, or a billion times, but in infinite lifetimes, through the collapse of this
                         universe and the birth of the next? To ponder the infinite depth of
                        this idea can be staggering and overwhelming, which is where the next hand comes into play.{"\n"}
                                </Text>
                                <Text style={style.textView}>
                                    {"\t\t\t"}The third hand is an open palm, a reassuring gesture to calm the wanderer
                        upon their realization
                        of the truth of existence as an eternal repeating of births and deaths.{"\n\n"}
                                </Text>
                                <View style={{ alignItems: "center" }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/image23.png" }} style={style.images1} />
                                </View>
                                <Text style={style.textView}>
                                    {"\n\n\t\t\t"}The fourth hand is an elephantine mudra gesture showing us a way out by pointing
                        to a lifted leg/foot, though not in the way that we would point. The elephantine mudra
                        represents the power of an elephant, the power to remove obstacles that stand before us.{"\n\n"}
                                </Text>
                                <View style={{ alignItems: "center" }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/image24.png" }} style={style.images1} />
                                </View>
                                <Text style={style.textView}>
                                    {"\n\n\t\t\t"}The first foot is lifted and represents moksha, because it is no longer weighted
                        with debt and karma. It is weightless. And while it is all well and good that our
                        path can take us to moksha and liberation, how can we achieve such a thing? The second
                        foot holds the answer.{"\n\n"}
                                </Text>
                                <View style={{ alignItems: "center" }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/foot.jpg" }} style={style.images1} />
                                </View>
                                <Text style={style.textView}>
                                    {"\n\n\t\t\t"}The second foot is pressing down on a dwarf and represents the ego,
                        showing that moksha is achieved only by pressing the ego down. The deeper
                        meaning here is that, by pressing down on the ego, we can avoid building karma
                         that needs to be paid off in future rebirths. It encourages us to do good things
                          because that’s why we’re on Earth, to help each other, to be compassionate and create
                           peace, and not to celebrate or revel in those deeds, because that would lead to an
                           egoistic downfall. Bad things happen because we’re human and we make mistakes, and
                           we learn from those mistakes so as not to repeat them. But we should not demonize ourselves for
                        these mistakes, because that would hamper our growth and also lead to an egoistic downfall.{"\n\n"}
                                </Text>
                                <View style={{ alignItems: "center" }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/image25.png" }} style={style.images1} />
                                </View>
                                <Text style={style.textView}>
                                    {"\n\n\t\t\t"}If the religious way of looking at Nataraja is not your cup of tea, you can take a simpler, more relative view:{"\n\n"}
                                    {'\u2022'} The hand with the drum: Good things will happen.{"\n"}
                                    {'\u2022'} The hand with the flame: Bad things will happen.{"\n"}
                                    {'\u2022'} The circle: Good and bad things will happen again {"\t"}and again and again.{"\n"}
                                    {'\u2022'} The reassuring hand: It’s going to be OK.{"\n"}
                                    {'\u2022'} The elephantine mudra: There’s a way out.{"\n"}
                                    {'\u2022'}The lifted leg: Freedom.{"\n"}
                                    {'\u2022'}The foot pressing down: Suppress the ego, don’t {"\t\t"}demonize yourself for your failures, and don’t glorify {"\t\t"}yourself for your good deeds.{"\n"}
                                </Text>
                                <Text style={style.textView}>
                                    <Text style={{ fontWeight: "bold" }}>
                                        Representation in the body:
                            </Text>
                                </Text>
                                <Text style={style.textView}>
                                    {"\t\t\t"}The pose and the shape of Nataraja don’t bear a great deal of resemblance,
                        but the element of opposites are still present: one arm forward and one arm back,
                        one foot down and one foot up, a backward bend and also a forward fold. All these
                        opposites are necessary to hold the pose and make it sing, just as it’s the balance
                        of opposites that makes life. Good things, bad things,
                         creation, and destruction flow around each other and bounce off of each other.{"\n\n"}
                         We attempt to find a middle ground by pressing the ego down. The ego might show up in a student’s Dancer’s Pose in at least two ways:{"\n\n"}
                         Both of those students are heading into an egoistic downfall, so how do they
                         find the middle ground? By kicking (i.e., living) no matter what their stance is. By kicking and kicking
                          because they can, whether their toes are touching the ceiling or are one inch off the ground.{"\n\n"}
                          It’s a delicate balance; a delicate dance.{"\n\n"}
                          A student with a mobile practice might indulge the ego and revel in the body’s proficiency in posture and attempt to showboat in front of other students.{"\n\n"}
                          A student with limited body mobility might feel insecure about their posture and then resolve to either not explore the pose or not enter into it at all.
                        </Text>
                                <Text style={style.textView}>
                                    <Text style={{ fontWeight: "bold" }}>Feel the story in your body:{"\n"}</Text>
                                </Text>
                                <View style={{ alignItems: "center" }}>
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
                                <Text style={{ paddingBottom: 60 }}></Text>
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
        fontWeight: "bold",
        paddingTop:"15%"
    },
    images: {
        width: 310,
        height: 350
    },
    images1: {
        width: 300,
        height: 300
    },
    textView: {
        padding: 10,
        lineHeight: 21,
        fontSize: 15,
        fontFamily: "sans-serif",
        textAlign: "justify"
    },
    menuView: {
        flexDirection: "row",
        position: "absolute",
        flex: 1,
        backgroundColor: 'gray',
        bottom: 0,
        marginBottom: 0,
        paddingLeft: 10,
        padding: 10,
        width: "100%"
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