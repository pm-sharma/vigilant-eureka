import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Image, Pressable, SafeAreaView,
    ScrollView, StyleSheet,
    Text, TextInput, TouchableOpacity, View
} from 'react-native';
import Create from '../Crud/Create';
import Edit from '../Crud/Edit';


// const data = require('../Integration/data.json') 

const Home = () => {
    const [searchText, setSearchText] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [editState, setEditState] = useState<{heading: string, description: string, ind: number}>({
        heading: "",
        description: "",
        ind: 0
    })
    const [editMode, setEditMode] = useState(false);
    const [list, setList] = useState<{heading: string, description: string, createdAt: string, pinnedAt: string}[]>([])
    const [filterList, setFilterList] = useState<{heading: string, description: string, createdAt: string, pinnedAt: string}[]>([])


    const searchInList = (searchText: string) =>{
        if(searchText === ""){setFilterList(list);return}
        const res = filterList.filter(obj => Object.values(obj)?.some(val => val?.toLowerCase()?.includes(searchText?.toLowerCase())));
        setFilterList(res);
    }

    const storeData = async() => {
        try {
            if(list.length > 0) {
                await AsyncStorage.setItem('notes', JSON.stringify(list));
            }
        } catch (error) {
            // Error saving data
        }
    }

    useEffect(() => {
        setFilterList(list)
        storeData();
    },[list])

    const getData = async () => {
        try {
            const myArray = await AsyncStorage.getItem('notes');
            if (myArray !== null) {
                setList(JSON.parse(myArray));
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const pinNotes = (ind: number) => {
        const arrCopy = [...list]
        arrCopy[ind]['pinnedAt'] = new Date(new Date()).toLocaleString()
        setList(arrCopy)
    }

    return (
        <SafeAreaView style={styles.background}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>{searchInList(text);setSearchText(text)}}
                        value={searchText}
                        placeholder="Search notes..."
                    />
                </View>
                
                <View style={styles.flexRow}>
                    {filterList?.map((val: any, ind: number)=>{
                        return (
                            <ScrollView key={ind} style={styles.card}>
                                <View>
                                    <TouchableOpacity onPress={()=>{pinNotes(ind)}}>
                                        <Image style={styles.pinnedImage} source={require('../../../assets/pinned.png')} />
                                    </TouchableOpacity>
                                    <Pressable onPress={()=>{setEditState({description: val.description, heading: val.heading, ind: ind});setEditMode(true)}}>
                                        <Text style={styles.heading}>{val.heading}</Text>
                                    </Pressable>
                                        <Text style={styles.description}>{val.description}</Text>
                                </View>
                            </ScrollView>
                    )})}
                </View>
            </ScrollView>
            {editMode && <Edit editState={editState} editMode={editMode} setEditMode={(val: boolean) => {setEditMode(val)}}  list={list} setList={setList} />}
            {modalVisible && <Create modalVisible={modalVisible} setModalVisible={(val: boolean) => {setModalVisible(val)}} list={list} setList={setList}/>}
            <Pressable onPress={()=>{setModalVisible(!modalVisible)}}>
                <Image style={styles.createImage} source={require('../../../assets/plus.png')} />
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'grey',
        padding: 12,
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'white',
    },
    card: {
        backgroundColor: 'yellow',
        borderRadius: 15,
        padding: 10,
        width: '48%',
        height: 200,
        margin: "1%",
        elevation: 5
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 40,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 12,
    },
    pinnedImage: {
        elevation: 1,
        width: 50,
        height: 50,
        position: 'absolute',
        right: -30,
        top: -30,
    },
    createImage: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 80,
        height: 80,
        zIndex: 2,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 50
    }
});

export default Home;
