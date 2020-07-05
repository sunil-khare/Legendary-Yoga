import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import data from './ImageView';
export default class MediaScreen extends React.Component {
    render() {
        return (
            <ScrollView>

                <View style={styles.container}>
                    {data.url.map((image, index) => {
                        return (
                            <TouchableOpacity key={index}>
                                <View style={{ borderBottomColor: "gray", borderBottomWidth: 1, paddingBottom: 10, flexDirection: "row", paddingTop: 10, padding: 20 }}>
                                    <Image source={{ uri: image.source }} style={styles.image} />
                                    <Text numberOfLines={1} style={{ textAlignVertical: "center", paddingLeft: 10, width: "60%", fontSize: 20, color: "gray" }}>{image.type}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>

            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: 125,
        height: 125,
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1
    },
})