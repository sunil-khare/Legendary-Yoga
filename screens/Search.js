import React from 'react'
import {View,StyleSheet,Text, TouchableOpacity} from 'react-native'
import {Button} from 'react-native-elements';
import Autocomplete from 'react-native-autocomplete-input';
import LinearGradient from 'react-native-linear-gradient';
import SQLite from 'react-native-sqlite-storage';
var db;
export default class SearchScreen extends React.Component{

constructor(props){
    super(props)
    this.state = {
        chapters : ['Introduction','The Legent of Garuda (Eagle)','The Legend of Hanuman (Monkey)','The Legend of Virabhadra (Warrior)','The Legend of Nataraj (Dancer)','The Legend of Matsyendra (Twist)','The Legend of Shiva, Kali and the Demon Raktabija','Acnkowledgements','Credits','Contacts','Behind the Scenes'],
        chapters1:[],
        searchValue:""
    }

    const unsubscribe1 = this.props.navigation.addListener('focus',()=>{
      this.setState({searchValue:""})
      this.getNotes()
  })
  this.db = SQLite.openDatabase({ name: 'my.db', location: 'Library' }, () => {
            
  }, () => {

  });
}
getNotes(){

  this.setState({chapters1:[]})
  this.db.transaction((tx) => {
    // tx.executeSql("CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, contents TEXT)", [], (res) => {
    //     console.log("TAble Created")
    // }, (err) => {
    //     console.log("Table Not Created", err);
    // })
    this.state.chapters.forEach((element)=>{
      this.state.chapters1.push(element);
    })
    tx.executeSql("SELECT * FROM notes", [], (rx, tx) => {

        for (let i = 0; i < tx.rows.length; i++) {

          this.state.chapters1.push(tx.rows.item(i).title)
          this.state.chapters1.push(tx.rows.item(i).contents)

        }
        console.log()
    }, err => {
        console.log(err);
    })
})
}
findFilm(searchValue) {
    //method called everytime when we change the value of the input
    if (searchValue === '') {
      //if the query is null then return blank
      return [];
    }
 
    const { chapters1 } = this.state
    try{
      const regex = new RegExp(`${searchValue.trim()}`, 'i')
      //return the filtered film array according the query from the input
      return chapters1.filter(chapters => chapters.search(regex) >= 0);
    }catch(ex){
      return chapters1
    }
    //making a case insensitive regular expression to get similar value from the film json
  
  }
    
search(){
    if(this.state.searchValue == this.state.chapters1[0]){
      this.props.navigation.navigate('Introduction');
    }
    else if(this.state.searchValue == this.state.chapters1[1]){
      this.props.navigation.navigate('The Legent of Garuda (Eagle)');
    }
    else if(this.state.searchValue == this.state.chapters1[2]){
      this.props.navigation.navigate('The Legend of Hanuman (Monkey)');
    }
    else if(this.state.searchValue == this.state.chapters1[3]){
      this.props.navigation.navigate('The Legend of Virabhadra (Warrior)');
    }
    else if(this.state.searchValue == this.state.chapters1[4]){
      this.props.navigation.navigate('The Legend of Nataraj (Dancer)');
    }
    else if(this.state.searchValue == this.state.chapters1[5]){
      this.props.navigation.navigate('The Legend of Matsyendra (Twist)');
    }
    else if(this.state.searchValue == this.state.chapters1[6]){
      this.props.navigation.navigate('The Legend of Shiva, Kali and the Demon Raktabija');
    }
    else if(this.state.searchValue == this.state.chapters1[7]){
      this.props.navigation.navigate('Acnkowledgements');
    }
    else if(this.state.searchValue == this.state.chapters1[8]){
      this.props.navigation.navigate('Credits');
    }
    else if(this.state.searchValue == this.state.chapters1[9]){
      this.props.navigation.navigate('Contacts');
    }
    else if(this.state.searchValue == this.state.chapters1[10]){
      this.props.navigation.navigate('Behind the Scenes');
    }else{
      this.props.navigation.navigate('Notes');
    }
}
    render(){

    const { searchValue } = this.state;
    const chapters = this.findFilm(searchValue);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    
        return(

        <View style={styles.container}>

                <LinearGradient colors={['#996EAD',"#4ca2cd"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{alignItems:'flex-start',marginTop:0,padding:15,paddingLeft:10}}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{fontSize:19,flex:1,color:"white"}}>Search</Text>
                    </View>
                </LinearGradient>
                <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                containerStyle={styles.autocompleteContainer}
                //data to show in suggestion
                data={chapters.length === 1 && comp(searchValue, chapters[0]) ? [] : chapters}
                //default value if you want to set something in input
                defaultValue={searchValue}
                /*onchange of the text changing the state of the query which will trigger
                the findFilm method to show the suggestions*/
                onChangeText={text => this.setState({ searchValue: text, })}
                placeholder="Enter the Chapter title"
                renderItem={({ item }) => (
                    //you can change the view you want to show in suggestion from here

                    <TouchableOpacity onPress={() => this.setState({ searchValue: item })}>
                    <Text style={styles.itemText}>
                        {item}
                    </Text>
                    </TouchableOpacity>
                )}
                />
                <View style={styles.descriptionContainer}>
                  <Button title="Search" onPress={()=>this.search()}></Button>
                </View>
               
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5FCFF',
      flex: 1,
      padding: 0,
      marginTop: 0,
      borderRadius:10
    },
    autocompleteContainer: {
      marginTop:20,
      margin:20,
      
    },
    descriptionContainer: {
      margin:20,
      justifyContent: 'center',
      borderRadius:10
    },
    itemText: {
      fontSize: 15,
      paddingTop: 5,
      paddingBottom: 5,
      margin: 2,
      borderRadius:10
    },
  });