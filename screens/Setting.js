import React from 'react'
import {View,Text,SafeAreaView, Button} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

export default class SettingScreen extends React.Component{
    static fontSize;
    constructor(props){
        super(props)
         this.state = {
            fontSize:15
         }
        
    }
    applyChanges(){
        SettingScreen.fontSize=this.state.fontSize;
        this.props.navigation.navigate('Introduction');
    }

    render(){

        return(
            <SafeAreaView>
           <View style={{padding:10,alignItems:"center",borderColor:"black",borderBottomWidth:1}}>
               <Text style={{fontSize:this.fontSize}}>Settings</Text>
           </View>
           <View style={{flexDirection:"column",padding:10,alignItems:"flex-start",borderColor:"black",borderBottomWidth:1}}>
           <Text style={{fontSize:20}}>Enter Font Size:</Text>
           <TextInput defaultValue="15" keyboardType="phone-pad" onChangeText={(text)=>this.setState({fontSize:text})}placeholder="Enter Font Size Here" style={{borderColor:"gray",borderWidth:1,borderRadius:10,height:35,width:"100%"}}></TextInput>
            <Text style={{fontSize:20,marginTop:20}}> Font Size : <Text style={{fontWeight:"bold"}}>{this.state.fontSize} px</Text></Text>
           </View>
           <View style={{padding:10}}>
           <Button onPress={()=>this.applyChanges()} title={"Apply"}></Button>
           </View>
           </SafeAreaView>
        )
    }
}