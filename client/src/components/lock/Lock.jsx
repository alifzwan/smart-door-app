import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { lockRoom, unlockRoom } from '../../services/arduino'

import * as theme from '../../theme/theme'
import AppBar from '../bar/AppBar'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    body: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10
    },
    headerText: {
        color: theme.colors.textSecondary,
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSize.heading,
    },
    bodyText: {
        color: theme.colors.textSecondary,
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSize.subheading,
        marginBottom: 20,
    },
    button: {
        backgroundColor: theme.backgroundColor.secondary,
        padding: 20,
        width: '80%',
        height: 60,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    buttonText:{
        color: theme.colors.textPrimary,
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSize.subheading
    }

})

const Lock = () => {

    const handleLock = async () => {
        try {
            await lockRoom()
            Alert.alert('Success', 'Room locked Successfully')
        }catch(error) {
            Alert.alert('Error', 'Failed to lock the room' )
        }
    }

    const handleUnlock = async () => {
        try {
            await unlockRoom()
            Alert.alert('Success', 'Room unlocked Successfully')
        } catch(error) {
            Alert.alert('Error', 'Failed to unlock the room')
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome name="user-circle" size={30} color="black" style={styles.icon}/>
                <Text style={styles.headerText}>Hi, Alif Zakwan</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>Unlock or Lock room</Text>
                <Pressable style={styles.button} onPress={handleLock}>
                    <Text style={styles.buttonText}>
                        Lock
                    </Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleUnlock}>
                    <Text style={styles.buttonText}>
                    Unlock
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Lock
