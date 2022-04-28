import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Item = ({result, navigation }) => {
  
  const resultDetail = () => {
    navigation.navigate("Detail", {result})
  }

  return (

    <View style= {styles.container}>
      <View>
        <Text style={styles.Id}>Id: {result.Id}</Text>
        <Text style={styles.text}>Activity Name: {result.Activity} </Text>
        <Text style={styles.text}>Location: {result.Location}</Text>
        <Text style={styles.text}>Date: {result.Date}</Text>
        <Text style={styles.text}>Time of attending: {result.TimeOfAttendance}</Text>
        <Text style={styles.text}>Name of reporter: {result.ReporterName}</Text>
      </View>

      <TouchableOpacity onPress = {resultDetail} style = {styles.button}>
        <Text style = {{
          alignItems:"center",
          justifyContent:"center",
          paddingHorizontal:20,
          fontSize:12,
          textTransform:"uppercase",
          color:"white"
        }}>Detail</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Item;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        padding: "2%",
        backgroundColor: "#eee",
        borderRadius: 5,
        marginBottom: "5%",
      },
      text: {
        fontSize: 20,
        fontWeight: "bold",
      },
      textTitle: {
        fontSize: 40,
          fontWeight: "bold",
          margin: 15,
      },
      Id:{
        fontSize: 40,
        fontWeight: "bold",
        margin: 15,
        color:"green"
      },
      button: {
        paddingLeft: 2,
        width: 90,
        height: 50,
        borderWidth: 3,
        backgroundColor: "blue",
        fontSize: 250,
        alignItems: "flex-end",
        justifyContent: "center",
        borderRadius: 5,
        marginTop:20,
        marginHorizontal:5,
      }
})