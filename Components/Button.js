import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'


const Button = (props) => {
  return (
    <View>
        <TouchableOpacity
            style = {styles.button}
            onPress = {props.handlePress}>
            <Text style = {styles.Text}>{props.title}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create(
    {
        Text:
        {
          textTransform:"none",
          color: "white",
          fontSize: 15,
        },
        button:
        {
          width: 120,
          height: 50,
          borderWidth: 3,
          backgroundColor: "#3A5B4B",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
          marginVertical:10,
          marginHorizontal:10,
        }
    }
)

export default Button