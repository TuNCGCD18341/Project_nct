import React, {useEffect, useState} from 'react'
import Button from '../Components/Button'
import * as SQlite from "expo-sqlite"
import DatePicker from 'react-native-datepicker'
import { View, Text, Alert, TextInput, StyleSheet, ScrollView } from 'react-native'

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
      if (activity.length === 0) {
        Alert.alert("Please enter activity name.");
      }
      else if (date.length === 0){
        Alert.alert("Please enter date.")
      } 
      else if (reporterName.length === 0){
        Alert.alert("Please enter reporter's name.")
      }
      else {
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
        <ScrollView>
            <View style={styles.body}>
            <Text style={styles.title}>Home</Text>
            <TextInput
              style={styles.input}
              placeholder="Activity Name (Required)"
              onChangeText={(value) => setActivity(value)}
              value={activity}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              onChangeText={(value) => setLocation(value)}
              value={location}
            />
          <DatePicker
            style={styles.datePicker}
            date={date}
            mode="date"
            placeholder="Date(Required)"
            format="DD-MM-YYYY"
            minDate="01-01-2015"
            maxDate="01-01-2025"
            customStyles={{
              dateInput: {
                marginLeft: 36,
                fontSize: 20,
              },
              dateIcon: {
                position: 'relative',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          />
          <TextInput
              style={styles.input}
              placeholder="Time of Attending"
              onChangeText={(value) => setTimeOfAttendance(value)}
              value = {timeOfAttendance}
            />
            <TextInput
              style={styles.input}
              placeholder="Reporter Name (Required)"
              onChangeText={(value) => setReporterName(value)}
              value={reporterName}
            />              
            <Button title="Submit" handlePress={submit}/>
            <View style = {{flexDirection:"row"}}>
              <Button title="Show All" handlePress ={showResult} />
              <Button title="Search" handlePress = {search} />

            </View>
          </View>
        </ScrollView>
        )
}

const styles = StyleSheet.create({
    body: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
      margin: 15,
    },
    datePicker: {
      alignItems: "center",
      justifyContent:"center",
      height:60,
      width: 370,
      fontSize:20,
    },
    input: {
      borderWidth: 1,
      height: 50,
      width: 300,
      borderRadius: 5,
      textAlign: "center",
      fontSize: 15,
      padding: 10,
      marginBottom: 10,
      marginTop: 10,
    },
  });

export default Home