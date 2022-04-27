import { View, FlatList, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import * as SQLite from "expo-sqlite"
import Item from '../Components/Item'

const database = SQLite.openDatabase("dbName", 2.0)

const Result = ({navigation}) => {
    const [activity, setActivity] = useState("")
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [timeOfAttendance, setTimeOfAttendance] = useState("");
    const [reporterName, setReporterName] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
        getResult();
    }, [])

    const getData = () => {
        try {
            database.transaction((tx) => {
              console.log(123);
              tx.executeSql("SELECT Activity, Location, Date, TimeOfAttendance, ReporterName FROM DATABASE;", [], (tx, result) => {
                console.log(JSON.stringify(result.rows));
                var len = result.rows.length;
                console.log(len);
                if (len > 0) {  
                  const resultActivity= result.rows.item(0).Activity;
                  const resultLocation = result.rows.item(0).Location;
                  const resultDate = result.rows.item(0).Date;
                  const resultTimeOfAttendace = result.rows.item(0).TimeOfAttendance;
                  const resultReporterName = result.rows.item(0).ReporterName;
                  setActivity(resultActivity);
                  setLocation(resultLocation);
                  setDate(resultDate);
                  setTimeOfAttendance(resultTimeOfAttendace);
                  setReporterName(resultReporterName);
                }
              });
            });
          } catch (error) {
            console.log(error);
          }
    }

    const getResult = () => {
        try {
          database.transaction((tx) => {
            tx.executeSql("SELECT * FROM DATABASE", [], (tx, result) => {
              var len = result.rows.length;
              console.log(JSON.stringify(result.rows));
              for (let i = 0; i < len; i++) {
                let row = result.rows.item(i);
                setData((prevState) => [
                  ...prevState,
                  {Id: row.Id, Activity: row.Activity, Location: row.Location, Date: row.Date, TimeOfAttendance: row.TimeOfAttendance, ReporterName: row.ReporterName },
                ]);
              }
            });
          });
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.Id)}
        renderItem={({ item }) => (
          <Item result={item} navigation={navigation} />
        )}
      />
    </View>
    )
}

export default Result
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
  });