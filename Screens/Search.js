import React, {useState} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import * as SQLite from "expo-sqlite";
import { TextInput } from 'react-native';
import Button from "../Components/Button";
import Item from './../Components/Item';


const database = SQLite.openDatabase("dbName", 2.0);

const Search = ({navigation}) => {
    const [searchResult, setSearchResult] = useState("")
    const [data, setData] = useState([])

    const getSearch = () => {
        try {
          database.transaction((tx) => {
            tx.executeSql("SELECT * FROM DATABASE WHERE ActivityName LIKE ? ", ['%'+searchResult+'%'], (tx, result) => {
              var len = result.rows.length;
              console.log(JSON.stringify(result.rows));
              for (let i = 0; i < len; i++) {
                let row = result.rows.item(i);
                setData((prevState) => [
                  ...prevState,
                  {Id: row.Id, Activity: row.Activity, Location: row.Location, Date: row.Date, TimeOfAttendance: row.TimeOfAttendance, ReporterName: row.ReporterName},
                ]);
              }
            });
          });
          setData('')
        } catch (error) {
          console.log(error);
        }
      };

    return (
      <View style={styles.container}>
      <Text style = {styles.title}>Search</Text>
      <View style={{ flex: 1, alignItems: 'center'}}>
        <TextInput
        placeholder="Search by Activity Name"
        style={styles.input}
        value = {searchResult}
        onChangeText={(value) => setSearchResult(value)}
        />
        <Button title="Search" handlePress={getSearch}/>
        <View style={styles.container}>
          <FlatList
          data={data}
          keyExtractor={(item) => String(item.Id)}
          renderItem={({ item }) => (
            <ResultItem result={item} navigation={navigation} />
          )}
          />
        </View>
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
      },
      title: {
        fontSize: 25,
        fontWeight: "bold",
        margin: 15,
      },
    input: {
        borderWidth: 1,
        height: 50,
        width: 300,
        borderRadius: 5,
        textAlign: "left",
        fontSize: 15,
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
      },
})

export default Search;