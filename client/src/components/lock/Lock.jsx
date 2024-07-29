import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import {useState, useEffect, useContext} from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { lockRoom, unlockRoom, getStatus } from '../../services/arduino'

import * as theme from '../../theme/theme'
import AppBar from '../bar/AppBar'
import Room from '../room/Room'
import { RoomContext, useRoomContext } from '../../utils/RoomContext';
import { supabase } from '../../lib/supabase'
import moment from 'moment-timezone';



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
    
    const [status, setStatus] = useState({ status: '', timestamp: ''});
    const { selectedRoom } = useContext(RoomContext)
    const { studentId } = useRoomContext()

    useEffect(() => {
        updateStatus();
    }, []);

    const handleLock = async () => {
        try {
            const response = await lockRoom()
            setStatus(response)
            await handleAction('lock')
            console.log('Success', 'Room locked Successfully')
        }catch(error) {
            console.log('Error', 'Failed to lock the room' )
        }
    }

    const handleUnlock = async () => {
        try {
            const response = await unlockRoom()
            setStatus(response)
            await handleAction('unlock')
            console.log('Success', 'Room unlocked Successfully')
        } catch(error) {
            console.log('Error', 'Failed to unlock the room')
        }
    }

    const updateStatus = async () => {
        try {
            const currentStatus = await getStatus();
            setStatus(currentStatus);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch status');
        }
    };

    const handleAction = async ( action ) => {
        try {
            const timestamp = moment().tz('Asia/Kuala_Lumpur').format('YYYY-MM-DD HH:mm');
            const { error } = await supabase
                .from('student_actions')
                .insert([{ student_id: studentId, action, timestamp: timestamp }])

            if(error){
                throw error
            }

        } catch (error){
            console.error('Error inserting action:', error)
        }

    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome name="user-circle" size={30} color="black" style={styles.icon}/>
                <Text style={styles.headerText}>Hi, Alif Zakwan</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.body}>
                    <Text>
                        {status.status && (
                            <Text style={styles.bodyText}>
                                Room {selectedRoom} is <Text style={{ color: 'red' }}>{status.status}</Text>
                            </Text>
                        )}
                    </Text>
                </View>

                <View style={styles.body}>
                    <Text>
                        {status.timestamp && (
                            <Text style={styles.bodyText}>
                                Time: {new Date(status.timestamp).toLocaleString()}
                            </Text>
                        )}
                    </Text>
                </View>
                
                
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



