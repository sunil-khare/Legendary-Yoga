import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import Slider from "@react-native-community/slider"
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';
import Toast, {DURATION} from 'react-native-easy-toast'
import SQLite from 'react-native-sqlite-storage'
var db;
var Sound = require('react-native-sound');
const img_pause = require('../assets/images/ui_pause.png');
const img_play = require('../assets/images/ui_play.png');
export default class Page3Screen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playState: 'paused', //playing, paused
            playState1: 'paused',
            playState2: 'paused',
            playState3: 'paused',
            playState4: 'paused',
            playState5: 'paused',
            playState6: 'paused',
            playState7: 'paused',
            playState8: 'paused',
            playState9: 'paused',
            playState10: 'paused',
            playSeconds: 0,
            duration: 0,
            playSeconds1: 0,
            duration1: 0,
            playSeconds2: 0,
            duration2: 0,

            playSeconds3: 0,
            duration3: 0,

            playSeconds4: 0,
            duration4: 0,
            playSeconds5: 0,
            duration5: 0,
            playSeconds6: 0,
            duration6: 0,
            playSeconds7: 0,
            duration7: 0,
            playSeconds8: 0,
            duration8: 0,
            playSeconds9: 0,
            duration9: 0,
            playSeconds10: 0,
            duration10: 0,
            flag: false,
            flagDisplay: "none",
            display: "none",
            x:0,
            y:0,
            bookmark:[],
            chapterName :"The Legend of Hanuman (Monkey)"
        }
        this.sliderEditing = false;
        this.sliderEditing1 = false;
        this.sliderEditing2 = false;
        this.sliderEditing3 = false;
        this.sliderEditing4 = false;
        this.sliderEditing5 = false;
        this.sliderEditing6 = false;
        this.sliderEditing7 = false;
        this.sliderEditing8 = false;
        this.sliderEditing9 = false;
        this.sliderEditing10 = false;

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

        // if (this.state.flag) {
        //     this.setState({ flagDisplay: "flex" })
        //     this.setState({ flag: false })
        // } else {
        //     this.setState({ flagDisplay: "flex" })
        //     this.setState({ flag: true })
        // }
        // console.log(this.state.bookmark)
    }
    componentWillUnmount1() {
        if (this.sound) {
            this.sound.pause()
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
        if (this.sound3) {
            this.sound3.pause();
            this.setState({ playState3: 'paused' });
        }
        if (this.sound4) {
            this.sound4.pause();
            this.setState({ playState4: 'paused' });
        }
        if (this.sound5) {
            this.sound5.pause();
            this.setState({ playState5: 'paused' });
        }
        if (this.sound6) {
            this.sound6.pause();
            this.setState({ playState6: 'paused' });
        }
        if (this.sound7) {
            this.sound7.pause();
            this.setState({ playState7: 'paused' });
        }
        if (this.sound8) {
            this.sound8.pause();
            this.setState({ playState8: 'paused' });
        }

        if (this.sound9) {
            this.sound9.pause();
            this.setState({ playState9: 'paused' });
        }
        if (this.sound10) {
            this.sound10.pause();
            this.setState({ playState10: 'paused' });
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
            else if (this.sound3 && this.sound3.isLoaded() && this.state.playState3 == 'playing' && !this.sliderEditing3) {
                this.sound3.getCurrentTime((seconds3, isPlaying) => {
                    this.setState({ playSeconds3: seconds3 });
                })
            }
            else if (this.sound4 && this.sound4.isLoaded() && this.state.playState4 == 'playing' && !this.sliderEditing4) {
                this.sound4.getCurrentTime((seconds4, isPlaying) => {
                    this.setState({ playSeconds4: seconds4 });
                })
            }
            else if (this.sound5 && this.sound5.isLoaded() && this.state.playState5 == 'playing' && !this.sliderEditing5) {
                this.sound5.getCurrentTime((seconds5, isPlaying) => {
                    this.setState({ playSeconds5: seconds5 });
                })
            }
            else if (this.sound6 && this.sound6.isLoaded() && this.state.playState6 == 'playing' && !this.sliderEditing6) {
                this.sound6.getCurrentTime((seconds6, isPlaying) => {
                    this.setState({ playSeconds6: seconds6 });
                })
            }
            else if (this.sound7 && this.sound7.isLoaded() && this.state.playState7 == 'playing' && !this.sliderEditing7) {
                this.sound7.getCurrentTime((seconds7, isPlaying) => {
                    this.setState({ playSeconds7: seconds7 });
                })
            }
            else if (this.sound8 && this.sound8.isLoaded() && this.state.playState8 == 'playing' && !this.sliderEditing8) {
                this.sound8.getCurrentTime((seconds8, isPlaying) => {
                    this.setState({ playSeconds8: seconds8 });
                })
            }
            else if (this.sound9 && this.sound9.isLoaded() && this.state.playState9 == 'playing' && !this.sliderEditing9) {
                this.sound9.getCurrentTime((seconds9, isPlaying) => {
                    this.setState({ playSeconds9: seconds9 });
                })
            }
            else if (this.sound10 && this.sound10.isLoaded() && this.state.playState10 == 'playing' && !this.sliderEditing10) {
                this.sound10.getCurrentTime((seconds10, isPlaying) => {
                    this.setState({ playSeconds10: seconds10 });
                })
            }
        }, 100);
    }

    play = async () => {
        this.refs.toast.show('Please Wait...');
        if (this.sound10) {
            this.pause10()
        }
        if (this.sound1) {
            this.pause1();
        }
        if (this.sound2) {
            this.pause2()
        }
        if (this.sound3) {
            this.pause3();
        }
        if (this.sound4) {
            this.pause4()
        }
        if (this.sound5) {
            this.pause5();
        }
        if (this.sound6) {
            this.pause6()
        }
        if (this.sound7) {
            this.pause7();
        }
        if (this.sound8) {
            this.pause8()
        }
        if (this.sound9) {
            this.pause9();
        }
        if (this.sound) {
            this.sound.play(this.playComplete);
            this.setState({ playState: 'playing' });
        } else {
            const filepath = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a_4.mp3";
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
        if (this.sound10) {
            this.pause10()
        }
        if (this.sound) {
            this.pause();
        }
        if (this.sound2) {
            this.pause2()
        }
        if (this.sound3) {
            this.pause3();
        }
        if (this.sound4) {
            this.pause4()
        }
        if (this.sound5) {
            this.pause5();
        }
        if (this.sound6) {
            this.pause6()
        }
        if (this.sound7) {
            this.pause7();
        }
        if (this.sound8) {
            this.pause8()
        }
        if (this.sound9) {
            this.pause9();
        }
        if (this.sound1) {
            this.sound1.play(this.playComplete);
            this.setState({ playState1: 'playing' });
        } else {
            const filepath1 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a2_2.mp3";
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
        if (this.sound10) {
            this.pause10()
        }
        if (this.sound1) {
            this.pause1();
        }
        if (this.sound) {
            this.pause()
        }
        if (this.sound3) {
            this.pause3();
        }
        if (this.sound4) {
            this.pause4()
        }
        if (this.sound5) {
            this.pause5();
        }
        if (this.sound6) {
            this.pause6()
        }
        if (this.sound7) {
            this.pause7();
        }
        if (this.sound8) {
            this.pause8()
        }
        if (this.sound9) {
            this.pause9();
        }
        if (this.sound2) {
            this.sound2.play(this.playComplete);
            this.setState({ playState2: 'playing' });
        } else {
            const filepath2 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a2_1.mp3";
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
    play3 = async () => {
        this.refs.toast.show('Please Wait...');
        if (this.sound10) {
            this.pause10()
        }
        if (this.sound1) {
            this.pause1();
        }
        if (this.sound2) {
            this.pause2()
        }
        if (this.sound) {
            this.pause();
        }
        if (this.sound4) {
            this.pause4()
        }
        if (this.sound5) {
            this.pause5();
        }
        if (this.sound6) {
            this.pause6()
        }
        if (this.sound7) {
            this.pause7();
        }
        if (this.sound8) {
            this.pause8()
        }
        if (this.sound9) {
            this.pause9();
        }
        if (this.sound3) {
            this.sound3.play(this.playComplete);
            this.setState({ playState3: 'playing' });
        } else {
            const filepath3 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a2_5.mp3";
            console.log('[Play]', filepath3);

            this.sound3 = new Sound(filepath3, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({ playState3: 'paused' });
                } else {
                    this.setState({ playState3: 'playing', duration3: this.sound3.getDuration() });
                    this.sound3.play(this.playComplete);
                }
            });
        }
    }
    play4 = async () => {
        this.refs.toast.show('Please Wait...');
        if (this.sound10) {
            this.pause10()
        }
        if (this.sound1) {
            this.pause1();
        }
        if (this.sound2) {
            this.pause2()
        }
        if (this.sound3) {
            this.pause3();
        }
        if (this.sound5) {
            this.pause5()
        }
        if (this.sound5) {
            this.pause5();
        }
        if (this.sound6) {
            this.pause6()
        }
        if (this.sound7) {
            this.pause7();
        }
        if (this.sound8) {
            this.pause8()
        }
        if (this.sound9) {
            this.pause9();
        }
        if (this.sound4) {
            this.sound4.play(this.playComplete);
            this.setState({ playState4: 'playing' });
        } else {
            const filepath4 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a2_4.mp3";
            console.log('[Play]', filepath4);

            this.sound4 = new Sound(filepath4, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({ playState4: 'paused' });
                } else {
                    this.setState({ playState4: 'playing', duration4: this.sound4.getDuration() });
                    this.sound4.play(this.playComplete);
                }
            });
        }
    }
    play5 = async () => {
        this.refs.toast.show('Please Wait...');
        if (this.sound10) {
            this.pause10()
        }
        if (this.sound1) {
            this.pause1();
        }
        if (this.sound2) {
            this.pause2()
        }
        if (this.sound3) {
            this.pause3();
        }
        if (this.sound4) {
            this.pause4()
        }
        if (this.sound) {
            this.pause();
        }
        if (this.sound6) {
            this.pause6()
        }
        if (this.sound7) {
            this.pause7();
        }
        if (this.sound8) {
            this.pause8()
        }
        if (this.sound9) {
            this.pause9();
        }
        if (this.sound5) {
            this.sound5.play(this.playComplete);
            this.setState({ playState5: 'playing' });
        } else {
            const filepath5 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a2_6.mp3";
            console.log('[Play]', filepath5);

            this.sound5 = new Sound(filepath5, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({ playState5: 'paused' });
                } else {
                    this.setState({ playState5: 'playing', duration5: this.sound5.getDuration() });
                    this.sound5.play(this.playComplete);
                }
            });
        }
    }
    play6 = async () => {
        this.refs.toast.show('Please Wait...');
        if (this.sound10) {
            this.pause10()
        }
        if (this.sound1) {
            this.pause1();
        }
        if (this.sound2) {
            this.pause2()
        }
        if (this.sound3) {
            this.pause3();
        }
        if (this.sound4) {
            this.pause4()
        }
        if (this.sound5) {
            this.pause5();
        }
        if (this.sound) {
            this.pause()
        }
        if (this.sound7) {
            this.pause7();
        }
        if (this.sound8) {
            this.pause8()
        }
        if (this.sound9) {
            this.pause9();
        }
        if (this.sound6) {
            this.sound6.play(this.playComplete);
            this.setState({ playState6: 'playing' });
        } else {
            const filepath6 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a2_7.mp3";
            console.log('[Play]', filepath6);

            this.sound6 = new Sound(filepath6, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({ playState6: 'paused' });
                } else {
                    this.setState({ playState6: 'playing', duration6: this.sound6.getDuration() });
                    this.sound6.play(this.playComplete);
                }
            });
        }
    }
    play7 = async () => {
        this.refs.toast.show('Please Wait...');
        if (this.sound10) {
            this.pause10()
        }
        if (this.sound1) {
            this.pause1();
        }
        if (this.sound2) {
            this.pause2()
        }
        if (this.sound3) {
            this.pause3();
        }
        if (this.sound4) {
            this.pause4()
        }
        if (this.sound5) {
            this.pause5();
        }
        if (this.sound6) {
            this.pause6()
        }
        if (this.sound) {
            this.pause();
        }
        if (this.sound8) {
            this.pause8()
        }
        if (this.sound9) {
            this.pause9();
        }
        if (this.sound7) {
            this.sound7.play(this.playComplete);
            this.setState({ playState7: 'playing' });
        } else {
            const filepath7 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a2_8.mp3";
            console.log('[Play]', filepath7);

            this.sound7 = new Sound(filepath7, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({ playState7: 'paused' });
                } else {
                    this.setState({ playState7: 'playing', duration7: this.sound7.getDuration() });
                    this.sound7.play(this.playComplete);
                }
            });
        }
    }
    play8 = async () => {
        this.refs.toast.show('Please Wait...');
        if (this.sound10) {
            this.pause10()
        }
        if (this.sound1) {
            this.pause1();
        }
        if (this.sound2) {
            this.pause2()
        }
        if (this.sound3) {
            this.pause3();
        }
        if (this.sound4) {
            this.pause4()
        }
        if (this.sound5) {
            this.pause5();
        }
        if (this.sound6) {
            this.pause6()
        }
        if (this.sound7) {
            this.pause7();
        }
        if (this.sound) {
            this.pause()
        }
        if (this.sound9) {
            this.pause9();
        }
        if (this.sound8) {
            this.sound8.play(this.playComplete);
            this.setState({ playState8: 'playing' });
        } else {
            const filepath8 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a2_9.mp3";
            console.log('[Play]', filepath8);

            this.sound8 = new Sound(filepath8, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({ playState8: 'paused' });
                } else {
                    this.setState({ playState8: 'playing', duration8: this.sound8.getDuration() });
                    this.sound8.play(this.playComplete);
                }
            });
        }
    }
    play9 = async () => {
        this.refs.toast.show('Please Wait...');
        if (this.sound10) {
            this.pause10()
        }
        if (this.sound1) {
            this.pause1();
        }
        if (this.sound2) {
            this.pause2()
        }
        if (this.sound3) {
            this.pause3();
        }
        if (this.sound4) {
            this.pause4()
        }
        if (this.sound5) {
            this.pause5();
        }
        if (this.sound6) {
            this.pause6()
        }
        if (this.sound7) {
            this.pause7();
        }
        if (this.sound8) {
            this.pause8()
        }
        if (this.sound) {
            this.pause();
        }
        if (this.sound9) {
            this.sound9.play(this.playComplete);
            this.setState({ playState9: 'playing' });
        } else {
            const filepath9 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/a2_10.mp3";
            console.log('[Play]', filepath9);

            this.sound9 = new Sound(filepath9, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({ playState9: 'paused' });
                } else {
                    this.setState({ playState9: 'playing', duration9: this.sound9.getDuration() });
                    this.sound9.play(this.playComplete);
                }
            });
        }
    }
    play10 = async () => {
        this.refs.toast.show('Please Wait...');
        if (this.sound) {
            this.pause()
        }
        if (this.sound1) {
            this.pause1();
        }
        if (this.sound2) {
            this.pause2()
        }
        if (this.sound3) {
            this.pause3();
        }
        if (this.sound4) {
            this.pause4()
        }
        if (this.sound5) {
            this.pause5();
        }
        if (this.sound6) {
            this.pause6()
        }
        if (this.sound7) {
            this.pause7();
        }
        if (this.sound8) {
            this.pause8()
        }
        if (this.sound9) {
            this.pause9();
        }
        if (this.sound10) {
            this.sound10.play(this.playComplete);
            this.setState({ playState10: 'playing' });
        } else {
            const filepath10 = "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/raw/hanuman_story2_3.mp3";
            console.log('[Play]', filepath10);

            this.sound10 = new Sound(filepath10, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({ playState10: 'paused' });
                } else {
                    this.setState({ playState10: 'playing', duration10: this.sound10.getDuration() });
                    this.sound10.play(this.playComplete);
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
    pause3 = () => {
        if (this.sound3) {
            this.sound3.pause();
        }

        this.setState({ playState3: 'paused' });
    }
    pause4 = () => {
        if (this.sound4) {
            this.sound4.pause();
        }

        this.setState({ playState4: 'paused' });
    }
    pause5 = () => {
        if (this.sound5) {
            this.sound5.pause();
        }

        this.setState({ playState5: 'paused' });
    }
    pause6 = () => {
        if (this.sound6) {
            this.sound6.pause();
        }

        this.setState({ playState6: 'paused' });
    }
    pause7 = () => {
        if (this.sound7) {
            this.sound7.pause();
        }

        this.setState({ playState7: 'paused' });
    }
    pause8 = () => {
        if (this.sound8) {
            this.sound8.pause();
        }

        this.setState({ playState8: 'paused' });
    }
    pause9 = () => {
        if (this.sound9) {
            this.sound9.pause();
        }

        this.setState({ playState9: 'paused' });
    }
    pause10 = () => {
        if (this.sound10) {
            this.sound10.pause();
        }

        this.setState({ playState10: 'paused' });
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
        this.sliderEditing2 = true;
    }
    onSliderEditEnd2 = () => {
        this.sliderEditing2 = false;
    }
    onSliderEditing2 = value => {
        if (this.sound2) {
            this.sound2.setCurrentTime(value);
            this.setState({ playSeconds2: value });
        }
    }

    onSliderEditStart3 = () => {
        this.sliderEditing3 = true;
    }
    onSliderEditEnd3 = () => {
        this.sliderEditing3 = false;
    }
    onSliderEditing3 = value => {
        if (this.sound3) {
            this.sound3.setCurrentTime(value);
            this.setState({ playSeconds3: value });
        }
    }
    onSliderEditStart4 = () => {
        this.sliderEditing4 = true;
    }
    onSliderEditEnd4 = () => {
        this.sliderEditing4 = false;
    }
    onSliderEditing4 = value => {
        if (this.sound4) {
            this.sound4.setCurrentTime(value);
            this.setState({ playSeconds4: value });
        }
    }
    onSliderEditStart5 = () => {
        this.sliderEditing5 = true;
    }
    onSliderEditEnd5 = () => {
        this.sliderEditing5 = false;
    }
    onSliderEditing5 = value => {
        if (this.sound5) {
            this.sound5.setCurrentTime(value);
            this.setState({ playSeconds5: value });
        }
    }
    onSliderEditStart6 = () => {
        this.sliderEditing6 = true;
    }
    onSliderEditEnd6 = () => {
        this.sliderEditing6 = false;
    }
    onSliderEditing6 = value => {
        if (this.sound6) {
            this.sound6.setCurrentTime(value);
            this.setState({ playSeconds6: value });
        }
    }
    onSliderEditStart7 = () => {
        this.sliderEditing7 = true;
    }
    onSliderEditEnd7 = () => {
        this.sliderEditing7 = false;
    }
    onSliderEditing7 = value => {
        if (this.sound7) {
            this.sound7.setCurrentTime(value);
            this.setState({ playSeconds7: value });
        }
    }
    onSliderEditStart8 = () => {
        this.sliderEditing8 = true;
    }
    onSliderEditEnd8 = () => {
        this.sliderEditing8 = false;
    }
    onSliderEditing8 = value => {
        if (this.sound8) {
            this.sound8.setCurrentTime(value);
            this.setState({ playSeconds8: value });
        }
    }
    onSliderEditStart9 = () => {
        this.sliderEditing9 = true;
    }
    onSliderEditEnd9 = () => {
        this.sliderEditing9 = false;
    }
    onSliderEditing9 = value => {
        if (this.sound9) {
            this.sound9.setCurrentTime(value);
            this.setState({ playSeconds9: value });
        }
    }
    onSliderEditStart10 = () => {
        this.sliderEditing10 = true;
    }
    onSliderEditEnd10 = () => {
        this.sliderEditing10 = false;
    }
    onSliderEditing10 = value => {
        if (this.sound10) {
            this.sound10.setCurrentTime(value);
            this.setState({ playSeconds10: value });
        }
    }


    getAudioTimeString(seconds) {
        const h = parseInt(seconds / (60 * 60));
        const m = parseInt(seconds % (60 * 60) / 60);
        const s = parseInt(seconds % 60);

        return ((m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
    }

    render() {
        const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
        const durationString = this.getAudioTimeString(this.state.duration);

        const currentTimeString1 = this.getAudioTimeString(this.state.playSeconds1);
        const durationString1 = this.getAudioTimeString(this.state.duration1);

        const currentTimeString2 = this.getAudioTimeString(this.state.playSeconds2);
        const durationString2 = this.getAudioTimeString(this.state.duration2);

        const currentTimeString3 = this.getAudioTimeString(this.state.playSeconds3);
        const durationString3 = this.getAudioTimeString(this.state.duration3);

        const currentTimeString4 = this.getAudioTimeString(this.state.playSeconds4);
        const durationString4 = this.getAudioTimeString(this.state.duration4);

        const currentTimeString5 = this.getAudioTimeString(this.state.playSeconds5);
        const durationString5 = this.getAudioTimeString(this.state.duration5);

        const currentTimeString6 = this.getAudioTimeString(this.state.playSeconds6);
        const durationString6 = this.getAudioTimeString(this.state.duration6);

        const currentTimeString7 = this.getAudioTimeString(this.state.playSeconds7);
        const durationString7 = this.getAudioTimeString(this.state.duration7);

        const currentTimeString8 = this.getAudioTimeString(this.state.playSeconds8);
        const durationString8 = this.getAudioTimeString(this.state.duration8);

        const currentTimeString9 = this.getAudioTimeString(this.state.playSeconds9);
        const durationString9 = this.getAudioTimeString(this.state.duration9);

        const currentTimeString10 = this.getAudioTimeString(this.state.playSeconds10);
        const durationString10 = this.getAudioTimeString(this.state.duration10);
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
                        <TouchableOpacity style={style.butonViewLeft} onPress={() => this.props.navigation.navigate('The Legent of Garuda (Eagle)')}>
                            <MaterialIcons name="chevron-left" size={30} color="white"></MaterialIcons>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.butonViewRight} onPress={() => this.props.navigation.navigate('The Legend of Virabhadra (Warrior)')}>
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
                                    <TouchableOpacity style={{ flexDirection: "row", paddingLeft: 10 }} onPress={() => this.props.navigation.navigate("Edit", { ScreenName: "The Legend of Hanuman (Monkey)" })}>
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
                                    THE LEGEND OF HANUMAN
                                </Text>
                                <Text style={{ fontSize: 18, textAlign: "center", paddingTop: "2%", fontWeight: "bold" }}>
                                    THE GREATEST SUPERHERO WHO EVER LIVED
                                </Text>
                                <View style={{ alignItems: "center", paddingTop: "15%" }}>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/hanumanflyingflattynoglow.gif" }} style={{ width: 300, height: 450 }} />

                                    <Text style={{ fontSize: 20, paddingTop: "15%", fontWeight: "bold", textAlign: "center" }}>
                                        VANARASANA-ANJANEYASANA- ARDHAHANUMANASANA or PUNGHUHANUMANASANA - HANUMANASANA - PURNAHANUMANASANA
                                    </Text>
                                    <Text style={style.textView}>
                                        {"\n\t\t\t"}The following five poses represent the journey of the greatest superhero who has ever
                                    lived. It’s no coincidence that ordering these poses in anatomical order also allows
                                    the story to play out in chronological order. The story starts with a description of
                                    the hero’s people, then recounts his birth, his downfall,
                                    the beginnings of his path toward redemption, and his full redemption at the end.
                                    </Text>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/image3_2.png" }} style={{ width: 300, height: 300 }} />
                                    <Text style={{ fontSize: 22, paddingTop: "15%", fontWeight: "bold" }}>
                                        VANARASANA - वनरासन
                                    </Text>
                                    <Text style={{ fontWeight: "bold",fontSize:11 }}>
                                        {"\n"} VANARASANA in Sanskrit:
                                    </Text>

                                    {/* 1 */}
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
                                        How to say VANARASANA in Sanskrit:
                                        </Text>
                                    {/* 2 */}
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
                                    <Text style={{ fontSize: 22, paddingTop: "10%", fontWeight: "bold", textAlign: "center" }}>
                                        (VANA-वन-Jungle, NARA-नर-Man)
                                        </Text>

                                    <Text style={style.textView}>
                                        {"\n\t\t\t"} The Vanara were an ancient mythological, sentient, monkey-like warrior race that
                                        lived in south India. They were birthed by the actual gods themselves to form a
                                        powerful army that could destroy demonic forces, and so, for this purpose, the
                                        Vanara were gifted with strength, courage, and agility. The Vanara tend to appear
                                        mostly in one story, and are often depicted fearlessly lunging forward into battle.
                                        </Text>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/vanarasena2-1571347730-1.gif" }} style={{ width: 300, height: 300 }} />
                                    <Text style={style.textView}>
                                        {"\n\t\t\t"}They were birthed by the actual gods themselves to form a powerful army that could
                                        destroy demonic forces, and so, for this purpose, the Vanara were gifted with strength,
                                        courage, and agility. The Vanara tend to appear
                                        mostly in one story, and are often depicted fearlessly lunging forward into battle.{"\n\n"}
                                    </Text>

                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/vanarsena.jpg" }} style={{ width: 300, height: 200, paddingTop: 30 }} />

                                    <Text style={{ fontSize: 20, paddingTop: "20%", fontWeight: "bold" }}>
                                        ANJANEYASANA - अञ्जनेयासन
                                            </Text>
                                    <Text style={{ fontWeight: "bold",fontSize:11 }}>
                                        {"\n"} ANJANEYASANA in Sanskrit:
                                            </Text>
                                    {/* 3 */}
                                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginTop: 10 }}>
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
                                    <Text style={{ fontWeight: "bold", paddingTop: 30 ,fontSize:11}}>
                                        How to say ANJANEYASANA in Sanskrit
                                            </Text>
                                    {/* 4 */}
                                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginTop: 10 }}>
                                        <View style={{ marginVertical: 5, padding: 5, marginHorizontal: 0, flexDirection: 'row' }}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString3}</Text>
                                            <Slider
                                                onTouchStart={this.onSliderEditStart3}
                                                onTouchEnd={this.onSliderEditEnd3}
                                                onValueChange={this.onSliderEditing3}
                                                value={this.state.playSeconds3} maximumValue={this.state.duration3} maximumTrackTintColor='white' minimumTrackTintColor='white' thumbTintColor='white'
                                                style={{ paddingLeft: 120 }} />
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{durationString3}</Text>

                                            {this.state.playState3 == 'playing' &&
                                                <TouchableOpacity onPress={this.pause3} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_pause} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}
                                            {this.state.playState3 == 'paused' &&
                                                <TouchableOpacity onPress={this.play3} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_play} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}

                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 20, paddingTop: "10%", fontWeight: "bold", textAlign: "center" }}>
                                        (ANJANEYA-अञ्जनेया-Son of ANJANI)
                                            </Text>
                                    <Text style={style.textView}>
                                        {"\t\t\t"} The Vanara were also the race of the greatest superhero who ever lived,
                                            Hanuman, although this wasn’t always his name. Originally, he was called
                                            Anjaneya, which simply means son of Anjani, his mother,
                                            a powerful Vanara woman. His father was Vayu, or Praana, the wind itself.{"\n\n"}

                                        {"\t\t\t"} With such powerful parents, Anjaneya was born with some superpowers already.
                                            Only moments after his birth, Anjaneya looked up at the sky and saw the sun, and,
                                            thinking it was a mango, flew into the sky and tried to eat it. On his way, he came
                                            across a Vedic planet called Rahu, in relationship with the moon. Anjaneya, not one to
                                            be delayed or restrained, kicked Rahu out of his way and sent Rahu spinning through the
                                            solar system. Rahu complained to the chief of the gods, Indra,
                                            about the cosmic flying baby monkey and chided him on how to run a solar system.{"\n\n"}
                                    </Text>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/image34.jpeg" }} style={{ width: 330, height: 250 }} />
                                    <Text style={style.textView}>
                                        {"\n"} Indra, maybe feeling a bit pressured by this feedback, decided to fix the situation
                                            in a drastic but quick way. Indra, like Zeus, tended to fix problems with his main
                                            weapon, the thunderbolt, so Indra dropped a thunderbolt on baby Anjaneya, hitting him
                                            right in the jaw (hanu - हनु),
                                            which left a scar (mant - मन्त) – thus giving Anjaneya his most famous name, Hanuman.
                                            </Text>

                                    <Text style={{ fontSize: 22, paddingTop: "20%", fontWeight: "bold", textAlign: "center" }}>
                                        ARDHAHANUMANASANA - अर्धहनुमनसन
                                            </Text>
                                    <Text style={{ fontWeight: "bold" ,fontSize:11}}>
                                        {"\n"} ARDHAHANUMANANSANA in Sanskrit:
                                            </Text>
                                    {/* 5 */}
                                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginTop: 10 }}>
                                        <View style={{ marginVertical: 5, padding: 5, marginHorizontal: 0, flexDirection: 'row' }}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString4}</Text>
                                            <Slider
                                                onTouchStart={this.onSliderEditStart4}
                                                onTouchEnd={this.onSliderEditEnd4}
                                                onValueChange={this.onSliderEditing4}
                                                value={this.state.playSeconds4} maximumValue={this.state.duration4} maximumTrackTintColor='white' minimumTrackTintColor='white' thumbTintColor='white'
                                                style={{ paddingLeft: 120 }} />
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{durationString4}</Text>

                                            {this.state.playState4 == 'playing' &&
                                                <TouchableOpacity onPress={this.pause4} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_pause} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}
                                            {this.state.playState4 == 'paused' &&
                                                <TouchableOpacity onPress={this.play4} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_play} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}

                                        </View>
                                    </View>
                                    <Text style={{ fontWeight: "bold", paddingTop: 30,fontSize:11 }}>
                                        How to say ARDHAHANUMANASANA in Sanskrit:
                                            </Text>
                                    {/* 6 */}
                                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginTop: 10 }}>
                                        <View style={{ marginVertical: 5, padding: 5, marginHorizontal: 0, flexDirection: 'row' }}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString5}</Text>
                                            <Slider
                                                onTouchStart={this.onSliderEditStart5}
                                                onTouchEnd={this.onSliderEditEnd5}
                                                onValueChange={this.onSliderEditing5}
                                                value={this.state.playSeconds5} maximumValue={this.state.duration5} maximumTrackTintColor='white' minimumTrackTintColor='white' thumbTintColor='white'
                                                style={{ paddingLeft: 120 }} />
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{durationString5}</Text>

                                            {this.state.playState5 == 'playing' &&
                                                <TouchableOpacity onPress={this.pause5} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_pause} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}
                                            {this.state.playState5 == 'paused' &&
                                                <TouchableOpacity onPress={this.play5} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_play} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}

                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 20, paddingTop: "15%", fontWeight: "bold", textAlign: "center" }}>
                                        (ARDHA-अर्ध-Half, हनुमन-HANU-Jaw, MAN(MANTE)-मन-SCAR/DISFIGUREMENT)
                                            </Text>
                                    <Text style={style.textView}>
                                        {"\t\t\t"} In being struck by Indra’s thunderbolt, Hanuman was rendered unconscious and began
                                            to plummet to the earth. He landed hard but was still holding onto his life by a thread.
                                            His father, the wind god, Vayu, witnessed this horrible act and gasped in pure shock.
                                            In doing so, he sucked all the air out of Earth. This,
                                            of course, caused great calamity as people began to choke and gag; they were suffocating.{"\n"}

                                        {"\t\t\t"} The gods realized the seriousness of the situation and began to give baby Hanuman many
                                            powers in an attempt to appease the wind god. But Indra, realizing his own error in
                                            overcorrecting a problem, stepped in to offer advice. He told the gods that giving
                                            Hanuman too much power would result in disaster – that with all the power they had
                                            given him, he’d eat the sun, the Earth, and perhaps them as well. So the gods resolved
                                            that Hanuman’s powers would come at a price: He would not be able to access their
                                            potential until he realized his true purpose. With that caveat, they woke Hanuman up.
                                            As they did, Vayu let out a big sigh and all the air of Earth flowed again and the people were able to breathe.{"\n"}
                                    </Text>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/image35.png" }} style={{ width: 330, height: 250 }} />

                                    <Text style={{ fontSize: 20, paddingTop: "20%", fontWeight: "bold" }}>
                                        HANUMANASANA - हनुमनसन
                                            </Text>
                                    <Text style={{ fontWeight: "bold",fontSize:11,paddingTop:10 }}>
                                        HANUMANASANA in Sanskrit:
                                            </Text>
                                    {/* 7 */}
                                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginTop: 10 }}>
                                        <View style={{ marginVertical: 5, padding: 5, marginHorizontal: 0, flexDirection: 'row' }}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString6}</Text>
                                            <Slider
                                                onTouchStart={this.onSliderEditStart6}
                                                onTouchEnd={this.onSliderEditEnd6}
                                                onValueChange={this.onSliderEditing6}
                                                value={this.state.playSeconds6} maximumValue={this.state.duration6} maximumTrackTintColor='white' minimumTrackTintColor='white' thumbTintColor='white'
                                                style={{ paddingLeft: 120 }} />
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{durationString6}</Text>

                                            {this.state.playState6 == 'playing' &&
                                                <TouchableOpacity onPress={this.pause6} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_pause} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}
                                            {this.state.playState6 == 'paused' &&
                                                <TouchableOpacity onPress={this.play6} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_play} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}

                                        </View>
                                    </View>
                                    <Text style={{ fontWeight: "bold", paddingTop: 30,fontSize:11 }}>
                                        How to say HANUMANASANA in Sanskrit:
                                            </Text>
                                    {/* 8 */}
                                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginTop: 10 }}>
                                        <View style={{ marginVertical: 5, padding: 5, marginHorizontal: 0, flexDirection: 'row' }}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString7}</Text>
                                            <Slider
                                                onTouchStart={this.onSliderEditStart7}
                                                onTouchEnd={this.onSliderEditEnd7}
                                                onValueChange={this.onSliderEditing7}
                                                value={this.state.playSeconds7} maximumValue={this.state.duration7} maximumTrackTintColor='white' minimumTrackTintColor='white' thumbTintColor='white'
                                                style={{ paddingLeft: 120 }} />
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{durationString7}</Text>

                                            {this.state.playState7 == 'playing' &&
                                                <TouchableOpacity onPress={this.pause7} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_pause} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}
                                            {this.state.playState7 == 'paused' &&
                                                <TouchableOpacity onPress={this.play7} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_play} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}

                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 20, paddingTop: "10%", fontWeight: "bold", textAlign: "center" }}>
                                        (हनुमन-HANU-Jaw, MAN(MANTE)-मन-SCAR/DISFIGUREMENT)
                                            </Text>
                                    <Text style={style.textView}>
                                        {"\n\t\t\t"} Many years later, Hanuman was minding his own business in the forests of his
                                            home when he came across two young princes, Prince Rama and his brother, Prince
                                            Lakshman. Hanuman learned that Prince Rama’s princess, Princess Sita, had been
                                            kidnapped and the two brothers
                                            were on a mission to get her back. However, the princes were exiled and had no army.{"\n"}

                                        {"\t\t\t"} The princess had been kidnapped by an evil demon king, King Ravana, who was a
                                            fearsome monster with 10 heads who lived on the island of Lanka. (Perhaps that
                                            name sounds familiar, as in present-day Sri Lanka. But note that “sri” means great,
                                            and so, back in Hanuman’s time, Lanka wasn’t so great.
                                            It was covered in demons and was a hellish place. Not a great place for vacation.){"\n"}

                                        {"\t\t\t"} After relaying the details of the princess’s capture, Prince Rama asked Hanuman if he would help them.
                                            Hanuman replied, “Yes, I’ll help you,” and in doing so, he began to realize his purpose
                                            and therein his power. Prince Rama, excited about the good news, asked the monkey man
                                            his name, and Hanuman responded in a booming voice.{"\n"}

                                        {"\t\t\t"}“My name is Hanuman, Son of the Wind!”{"\n"}

                                        {"\t\t\t"}In uttering that phrase, Hanuman grew 200 feet tall in front of
                                            the princes, who thought they’d just had the best stroke of luck in the world.{"\n"}

                                        {"\t\t\t"}Now sometimes, Hanuman is referred to as the king or chief of the monkeys,
                                            but in reality that title goes to his friend Sugriva, whom, with some convincing and
                                            favors from Prince Rama, allowed his army of monkey warriors and forest creatures to
                                            join the princes’ mission. Now they had an army
                                            made of monkeys, bears, and even squirrels marching down through India to the ocean.{"\n"}

                                        {"\t\t\t"}When they reached the ocean, the monkeys began to have second thoughts and
                                            some even began to turn away and go home. But Hanuman saw their abandonment and jumped
                                            on a rock to make a great speech, in which he challenged them with a bet: If he could
                                            jump across the ocean to the island,
                                            confirm that the princess was there, and jump back to shore, they would go to war.{"\n"}
                                    </Text>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/hanumanjumpfinal.jpg" }} style={{ width: 290, height: 300 }} />
                                    <Text style={style.textView}>
                                        {"\n\t\t\t"} The Vanara agreed, and Hanuman leapt across the ocean in a single bound.
                                            He confirmed that the princess was indeed being held captive, and he returned
                                            to his friends. They gathered together and formed a massive bridge to the island,
                                            with the monkey warriors and bears carrying large rocks,
                                            and the little squirrels carrying small pebbles, to fill in the gaps.{"\n"}

                                    </Text>

                                    <Text style={{ fontSize: 22, paddingTop: "20%", fontWeight: "bold", textAlign: "center" }}>
                                        PURNAHANUMANASANA - पूर्णहनुमनसन
                                            </Text>
                                    <Text style={{ fontWeight: "bold", paddingTop:10,textAlign: "center",fontSize:11 }}>
                                        PURNAHANUMANASANA in Sanskrit:
                                            </Text>
                                    {/* 9 */}
                                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginTop: 10 }}>
                                        <View style={{ marginVertical: 5, padding: 5, marginHorizontal: 0, flexDirection: 'row' }}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString8}</Text>
                                            <Slider
                                                onTouchStart={this.onSliderEditStart8}
                                                onTouchEnd={this.onSliderEditEnd8}
                                                onValueChange={this.onSliderEditing8}
                                                value={this.state.playSeconds8} maximumValue={this.state.duration} maximumTrackTintColor='white' minimumTrackTintColor='white' thumbTintColor='white'
                                                style={{ paddingLeft: 120 }} />
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{durationString8}</Text>

                                            {this.state.playState8 == 'playing' &&
                                                <TouchableOpacity onPress={this.pause8} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_pause} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}
                                            {this.state.playState8 == 'paused' &&
                                                <TouchableOpacity onPress={this.play8} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_play} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}

                                        </View>
                                    </View>
                                    <Text style={{ fontWeight: "bold", paddingTop: 30,fontSize:11 }}>
                                        How to say PURNAHANUMANASANA in Sanskrit:
                                            </Text>
                                    {/* 10 */}
                                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginTop: 10 }}>
                                        <View style={{ marginVertical: 5, padding: 5, marginHorizontal: 0, flexDirection: 'row' }}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString9}</Text>
                                            <Slider
                                                onTouchStart={this.onSliderEditStart9}
                                                onTouchEnd={this.onSliderEditEnd9}
                                                onValueChange={this.onSliderEditing9}
                                                value={this.state.playSeconds9} maximumValue={this.state.duration9} maximumTrackTintColor='white' minimumTrackTintColor='white' thumbTintColor='white'
                                                style={{ paddingLeft: 120 }} />
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{durationString9}</Text>

                                            {this.state.playState9 == 'playing' &&
                                                <TouchableOpacity onPress={this.pause9} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_pause} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}
                                            {this.state.playState9 == 'paused' &&
                                                <TouchableOpacity onPress={this.play9} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_play} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}

                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 20, paddingTop: "15%", fontWeight: "bold", textAlign: "center" }}>
                                        (पूर्ण-PURNA-Full, हनुमन-HANU-Jaw, MAN(MANTE)-मन-SCAR/DISFIGUREMENT)
                                            </Text>
                                    <Text style={style.textView}>
                                        {"\n\t\t\t"} On the island, an army of demons was waiting, with weapons, fangs, and claws drawn,
                                            bloodthirsty and lascivious. The princes
                                            and their army of woodland creatures engaged in a fearsome battle with the demons.{"\n"}

                                        {"\t\t\t"}During the battle, Prince Lakshman was hit with a poison arrow and was
                                            fatally wounded. To save him, the others needed a special flower from the Himalayas.
                                            Hanuman overheard their dire situation and bounded off, taking flight to the Himalayas.
                                            But in his haste, he forgot to ask what the flower looked like. On the mountain, he
                                            found it filled with different flowers, and since he didn’t know which flower was which,
                                            he feared that the prince was doomed. Distraught, Hanuman began to weep,
                                            saying to himself that he had only wanted to help. He wanted to save the world.{"\n"}

                                        {"\t\t\t"}In uttering those words, Hanuman realized his true potential and his true
                                            purpose: to save the world. With access to his true power, he grew more than a thousand
                                            feet tall and ripped the mountain out of the earth.
                                            He flew back to Lanka, carrying the whole mountain over his head.{"\n\n"}
                                    </Text>
                                    < Image source={{ uri: "http://demo.galiyaraa.in/Galiyaraa_clients/sanjeev/yoga_apk_files/images/hanumanmountainfinal23.jpg" }} style={{ width: 300, height: 420 }} />

                                    <Text style={style.textView}>
                                        {"\n\t\t\t"} Upon reaching Lanka, Hanuman thrust the mountain down on the demon army and the
                                            forces of good rushed over and took the special flowers to make the antidote for
                                            the poison arrows. Therein
                                            Hanuman was able to help the army enough to eventually defeat the evil demon king, Ravana.{"\n\n"}
                                        <Text style={{ fontWeight: "bold" }}>
                                            {"\t\t\t"} Representation in the body:{"\n"}
                                        </Text>
                                        {"\t\t\t"} When we take Vanarasana, we take on the form of a Vanara,
                                           a monkey warrior fearlessly lunging forward into battle, with arms alongside the body,
                                           strong and straight, as if holding two swords, or with the fingers splayed into fierce
                                           monkey claws.{"\n"}

                                        {"\t\t\t"}When we take Anjaneyasana, we take on the form of baby Anjaneya (Hanuman) flying through space to eat the sun, thinking it’s a mango.{"\n"}

                                        {"\t\t\t"}When we take Ardha Hanumansana, or Punghu Hanumanasana, we take the form of a wounded Hanuman, with the scar (mant) fresh on his jaw (hanu).{"\n"}

                                        {"\t\t\t"}When we take Hanumanasana, we are Hanuman with one foot in India and one foot in Lanka, springing forward.{"\n"}

                                        {"\t\t\t"}When we take Purna Hanumanasana, we are Hanuman flying down from the Himalayas with the mountain over his head, bringing the special flowers to save his friends.{"\n"}

                                        <Text style={{ fontWeight: "bold" }}>
                                            {"\t\t\t"} Feel the story in your body:
                                          </Text>
                                    </Text>
                                    {/* 11 */}
                                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'gray', borderRadius: 10, marginTop: 10 }}>
                                        <View style={{ marginVertical: 5, padding: 5, marginHorizontal: 0, flexDirection: 'row' }}>
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString10}</Text>
                                            <Slider
                                                onTouchStart={this.onSliderEditStart10}
                                                onTouchEnd={this.onSliderEditEnd10}
                                                onValueChange={this.onSliderEditing10}
                                                value={this.state.playSeconds10} maximumValue={this.state.duration10} maximumTrackTintColor='white' minimumTrackTintColor='white' thumbTintColor='white'
                                                style={{ paddingLeft: 120 }} />
                                            <Text style={{ color: 'white', alignSelf: 'center' }}>{durationString10}</Text>

                                            {this.state.playState10 == 'playing' &&
                                                <TouchableOpacity onPress={this.pause10} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_pause} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}
                                            {this.state.playState10 == 'paused' &&
                                                <TouchableOpacity onPress={this.play10} style={{ marginHorizontal: 10 }}>
                                                    <Image source={img_play} style={{ width: 20, height: 20 }} />
                                                </TouchableOpacity>}

                                        </View>
                                    </View>

                                    <Text style={style.textView}>
                                        <Text style={{ fontWeight: "bold" }}>
                                            {"\n\t\t\t"} Moral:{"\n"}
                                        </Text>
                                        {"\t\t\t"}The story of Hanuman is about the proper use of power. Great gifts must be
                                            used with great responsibility. When power is not used to help people, there is always
                                            suffering. When we follow our ego and greed, they often lead to our greatest downfalls.
                                            We can see this play out when Hanuman is born and he is so sure of himself. He doesn’t
                                            care about others and follows his greed up into the sky, chasing a mirage.
                                            But, like Icarus, he flies too close to the sun and falls back to Earth.{"\n"}

                                        {"\t\t\t"}It is only when he begins to help people that Hanuman is set on a path to
                                            redemption and ever-increasing strength. It is our purpose to help people, and therein
                                            lies our true power. As Hanuman’s desire to help people grows, so does his power – he
                                            helps Rama and Lakshman and realizes his internal power and purpose; when he wishes to
                                            help the whole world, he becomes strong enough to lift mountains. (This type of power
                                            can be seen in the real world in situations where a
                                            mother might gain near-superhuman strength to save her baby in an emergency situation.){"\n"}

                                        {"\t\t\t"}The Vanarasana sets the stage for this moral by telling of Hanuman’s
                                            great lineage; the Anjaneyasana tells of his birth and his ego; the wounded, or
                                            half, Hanuman tells of his downfall because of that ego; the Hanumanasana is the
                                            beginning of his redemption through
                                            helping people; and the full Hanuman is the greatest representation of this purpose.{"\n"}

                                        {"\t\t\t"}By bringing the mountain with the flowers to the army, Hanuman allowed them to gain a foothold and turn the tide of the war against the demonic army of King Ravana.{"\n\n"}
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
        backgroundColor: "#FFF"
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
    buttonView: {
        position: "absolute",
        left: 0,
        width: 5
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