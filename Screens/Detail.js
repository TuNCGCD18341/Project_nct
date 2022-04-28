import * as SQLite from "expo-sqlite";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import DeprecatedStyleSheetPropType from "react-native/Libraries/DeprecatedPropTypes/DeprecatedStyleSheetPropType";
import Button from "../Components/Button";

const database = SQLite.openDatabase("dbName", 2.0)

const Detail = ({route, navigation}) => {
  const { result } = route.params;


  const deleteItem = () => {
    try {
      database.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM DATABASE WHERE id = ?",
          [result.Id],
          (tx, result) => {
            Alert.alert("Deleted!!!");
            navigation.navigate("Home");
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.body}>
    <View
    style = {{
    justifyContent:"center",
    marginBottom: 150
    }}>
    <Text
    style = {{
    fontSize: 40,
    fontWeight: "bold",
    margin: 15,
    }} >Detail</Text>
    </View>
    <View>
        <Text style = {styles.title}>Detail</Text>
      </View>
      <Text style = {styles.text}>ActivityName: {result.Activity}</Text>
      <Text style = {styles.text}>Location: {result.Location}</Text>
      <Text style = {styles.text}>Date: {result.Date}</Text>
      <Text style = {styles.text}>Time of Attending: {result.TimeOfAttendance}</Text>
      <Text style = {styles.text}>Name of Reporter: {result.ReporterName}</Text>
      <Button title="DELETE" handlePress = {deleteItem}/>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 15,
  },
  body: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  text:{
    fontSize:15,
    justifyContent:"flex-start",
    marginLeft: 25,
  }
});

export default Detail