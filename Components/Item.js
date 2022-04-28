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

      <View style={{flexDirection: "column"}}>
        <TouchableOpacity onPress = {resultDetail} style = {styles.button}>
          <Text style = {styles.buttonText}>Detail</Text>
        </TouchableOpacity>
  
      </View>

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
        fontSize: 15,
        marginHorizontal: 12
      },
      Id:{
        fontSize: 15,
        fontWeight: "bold",
        color:"green",
        marginHorizontal: 5
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
      },
      buttonText:{
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:10,
        fontSize:12,
        color:"white"
      },
})