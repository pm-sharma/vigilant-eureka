import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView, StyleSheet
} from 'react-native';

const data = require('../Integration/data.json') 

const Delete = () => {
    const [searchText, setSearchText] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    
    return (
        <SafeAreaView style={styles.background}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                
            </ScrollView>
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
    }
});

export default Delete;
