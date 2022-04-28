import { View, Text, Alert, TextInput, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import Button from '../Components/Button'
import * as SQlite from "expo-sqlite"
import Search from './Search'

const database = SQlite.openDatabase("dbName", 2.0)

const Home = ({navigation}) => {
    const [activity, setActivity] = useState("")
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [timeOfAttendance, setTimeOfAttendance] = useState("");
    const [reporterName, setReporterName] = useState("");

    useEffect(() =>{
        createTable();
    }, []);
    
    const submit = () => {
        if (activity.length === 0 || location.length === 0 || date.length === 0 
            || timeOfAttendance.length === 0|| reporterName.length === 0) {
            Alert.alert("Warning !!! Please enter inputs !!!");
          } else {
            try {
              database.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO DATABASE (Activity, Location, Date, TimeOfAttendance, ReporterName) VALUES (?,?,?,?,?);",
                  [activity, location, date, timeOfAttendance, reporterName],
                  (tx, results) => {
                    console.log(results.rowsAffected);
                  }
                );
              });
              Alert.alert("Input Entered")
              navigation.navigate("Result");
            } catch (error) {
              console.log(error);
            }
          }
    };

    const showResult = () =>{
        navigation.navigate("Result");
    };

    const search = () => {
      navigation.navigate("Search");
    }

    const createTable = () => {
        database.transaction((tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS DATABASE(Id INTEGER PRIMARY KEY AUTOINCREMENT, Activity TEXT, Location TEXT, Date TEXT, TimeOfAttendance TEXT, ReporterName TEXT);"
          );
        });
      };
      return (
        <View style={styles.body}>
          <Text style={styles.text}>Home</Text>
          <TextInput
            style={styles.input}
            placeholder="Activity Name"
            onChangeText={(value) => setActivity(value)}
            value={activity}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            onChangeText={(value) => setLocation(value)}
            value={location}
          />
           <TextInput
            style={styles.input}
            placeholder="Date"
            onChangeText={(value) => setDate(value)}
            value={date}
          />
           <TextInput
            style={styles.input}
            placeholder="Time of attending"
            onChangeText={(value) => setTimeOfAttendance(value)}
            value={timeOfAttendance}
          />
           <TextInput
            style={styles.input}
            placeholder="Name of Reporter"
            onChangeText={(value) => setReporterName(value)}
            value={reporterName}
          />
          <View style = {{flexDirection:"row"}}>
          <Button title="Show All" handlePress ={showResult} />
          <Button title="Search" handlePress = {search} />
          <Button title="Submit" handlePress={submit}/>
          </View>
        </View>
        )
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    text: {
      fontSize: 40,
      fontWeight: "bold",
      margin: 15,
    },
    input: {
      borderWidth: 1,
      height: 50,
      width: 300,
      borderRadius: 5,
      textAlign: "center",
      fontSize: 20,
      marginBottom: 10,
      marginTop: 10,
    },
  });

export default Home