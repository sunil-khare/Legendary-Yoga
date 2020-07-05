import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Screen extends React.Component {
  render() {
    return (
      <View style={style.container}>
        {/* <ToolbarView/> */}
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ alignItems: 'flex-start', backgroundColor: 'red', marginTop: 5, padding: 10 }}
            onPress={this.props.navigation.openDrawer}>
            <Icon name="bars" size={20} color="#900" style={{ paddingLeft: 5 }}>Menu</Icon>
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={style.text}>
              {this.props.name} Screen
                        </Text>
          </View>
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
    fontSize: 20,
    fontWeight: "500"
  }
})