import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigate } from 'react-router-native'
import { RoomContext } from '../../utils/RoomContext'
import theme from '../../theme/theme'
import { supabase } from '../../lib/supabase'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        width: '100%',
        backgroundColor: theme.backgroundColor.secondary,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 10
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,

    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    welcomeText: {
        color: '#fff',
        fontWeight: theme.fontWeights.bold,
        fontSize: 18,
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
    },
    button: {
        backgroundColor: theme.backgroundColor.secondary,
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

const Room = () => {
    const navigate = useNavigate()
    const { studentId, selectedRoom, setSelectedRoom } = useContext(RoomContext)
    const [name, setName] = useState('')

    useEffect(() => {
      if(studentId) {
        fetchName()
      }
    }, [studentId])

    const fetchName = async () => {
        try {
            const { data, error } = await supabase
                .from('students')
                .select('name')
                .eq('student_id', studentId)
                .single()
            if(error) {
                throw error
            }

            setName(data.name)
        } catch (error) {
            console.error('Error fetching student name:', error)
        }
    }
    



    const handlePress = (room) => {
        setSelectedRoom(room)
        navigate('/lock')
    }
   
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#FF512F', '#DD2476']} style={styles.header}>
                <View style={styles.userInfo}>
                    <FontAwesome name="user-circle" size={30} color="white" style={{marginRight: 5}}/>
                    {name ? (
                        <Text style={styles.welcomeText}>Hi, {name}</Text>
                    ) : (
                        <ActivityIndicator size="small" color="#fff" />
                    )}
                </View>
                <Text style={styles.welcomeText}>Room Access</Text>
            </LinearGradient>
            
            <View style={styles.buttonContainer}>
                {[1, 2, 3, 4, 5].map((room, index) => (
                    <Pressable key={index} style={styles.button} onPress={() => handlePress(room)}>
                        <Text style={styles.buttonText}>Room {room}</Text>
                        <Ionicons name="arrow-forward" size={24} color="#fff" />
                    </Pressable>
                ))}
                {/* <Pressable style={styles.button} onPress={() => navigate("/")}>
                    <Text style={styles.buttonText}>Logout</Text>
                    <Ionicons name="log-out" size={24} color="#fff" />
                </Pressable> */}
            </View>

            {/* <View style={styles.footer}>
                <Ionicons name="home" size={24} color={theme.colors.textTertiary} />
                <Ionicons name="person" size={24} color={theme.colors.textTertiary} />
                <Ionicons name="settings" size={24} color={theme.colors.textTertiary} />
            </View> */}
        </View>
    );
};

export default Room;
