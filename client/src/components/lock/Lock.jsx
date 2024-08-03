import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import {useState, useEffect, useContext} from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { lockRoom, unlockRoom, getStatus } from '../../services/arduino'
import theme from '../../theme/theme'
import AppBar from '../bar/AppBar'
import Room from '../room/Room'
import { RoomContext, useRoomContext } from '../../utils/RoomContext';
import { supabase } from '../../lib/supabase'
import moment from 'moment-timezone';
import { LinearGradient } from 'expo-linear-gradient'




const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBox: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 80,
    },
    statusText: {
        color: '#fff',
        fontWeight: theme.fontWeights.bold,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    timestampText: {
        color: '#fff',
        fontWeight: theme.fontWeights.normal,
        fontFamily: 'Helvetica-World',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,

    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 80,
    },
    button: {
        backgroundColor: theme.backgroundColor.secondary,
        padding: 15,
        width: '100%',
        height: 60,
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    buttonText: {
        color: theme.colors.textPrimary,
        fontWeight: theme.fontWeights.bold,
        fontSize: 18,
        fontFamily: 'Helvetica-World',

    },

})

const Lock = () => {
    
    const [status, setStatus] = useState({ status: '', timestamp: ''});
    const { selectedRoom } = useContext(RoomContext)
    const { studentId } = useRoomContext() // Get the student ID from the context

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
            const timestamp = moment().tz('Asia/Kuala_Lumpur').format('YYYY-MM-DD HH:mm') // Get the current timestamp in Kuala Lumpur timezone
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
           <LinearGradient colors={['#FF512F', '#DD2476']} style={styles.linearGradient}>
                <Text style={styles.statusText}>
                    <FontAwesome name="user-circle" size={30} color="#fff" /> Hi Alif Zakwan!
                </Text>
                <Text style={styles.statusText}>
                    Room {selectedRoom} is {status.status}
                </Text>
                <Text style={styles.timestampText}>
                    {status.timestamp ? new Date(status.timestamp).toLocaleString() : ''}
                </Text>
            </LinearGradient>
                
            <View style={styles.buttonContainer}>
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



