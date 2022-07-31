import React, { useEffect, useState } from 'react';
import {
    Alert, Image, Modal, Pressable, SafeAreaView,
    ScrollView, StyleSheet,
    Text, TextInput, View
} from 'react-native';
import { useDebounce } from '../hooks/useDebounce';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
    editMode: boolean,
    setEditMode: (val: boolean) => void,
    editState: any,
    setList: (val: {heading: string, description: string, createdAt: string, pinnedAt: string}[]) => void;
    list: {heading: string, description: string, createdAt: string, pinnedAt: string}[]
}


const Edit = ({ editMode, setEditMode, editState, setList,list }: IProps) => {
    const [heading, setHeading] = useState<string>(editState.heading)
    const [description, setDescription] = useState<string>(editState.description)
    const debouncedEditHead = useDebounce(heading, 10000);
    const debouncedEditDesc = useDebounce(description, 10000);

    const editNote = (heading: string, description: string)=> {
        if(heading && description){
            const arrCopy = [...list]
            arrCopy[editState?.ind].heading = heading
            arrCopy[editState?.ind].description = description
            setList(arrCopy)
            setEditMode(false)
            removeMode()
        }
    }

    const today = new Date(Date.now());

    useEffect(() => {
        editNote(debouncedEditHead,debouncedEditDesc)
    },[debouncedEditDesc,debouncedEditHead])

    useEffect(()=>{
        setMode()
    }, [])

    const setMode = async() => {
        try{
            await AsyncStorage.setItem('edit', JSON.stringify(editState));
        }catch{

        }
    }

    const removeMode = async() => {
        try{
            await AsyncStorage.removeItem('edit');
        }catch{

        }
    }

    return (
        <SafeAreaView style={styles.background}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={editMode}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setEditMode(!editMode);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable style={{marginLeft: 'auto'}} onPress={() => setEditMode(false)}>
                                <Image style={styles.close} source={require('../../../assets/close.png')} />
                            </Pressable>
                            <Text>{today.toDateString()}</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setHeading(text)}
                                value={heading}
                                placeholder="Enter heading..."
                            />
                            <TextInput
                                style={[styles.input, {height: 100}]}
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={(text) => setDescription(text)}
                                value={description}
                                placeholder="Enter description..."
                            />
                            {/* <Pressable onPress={() => editNote(heading, description)}>
                                <Text style={styles.heading}>Update</Text>
                            </Pressable> */}
                        </View>
                    </View>
                    
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'grey',
        padding: 12,
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        width: '100%',
        backgroundColor: 'grey',
        borderColor: 'black',
        margin: 10
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
        marginTop: 40,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 12,
    },
    close: {
        elevation: 1,
        width: 20,
        height: 20,
        marginLeft: 'auto',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        width: 400,
        height: 400
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 350,
        height: 450
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default Edit;
