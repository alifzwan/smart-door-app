import React, { useContext } from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigate } from 'react-router-native'
import { RoomContext } from '../../utils/RoomContext'
import theme from '../../theme/theme'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    // footer: {
    //     width: '100%',
    //     padding: 10,
    //     flexDirection: 'row',
    //     justifyContent: 'space-around',
    //     backgroundColor: '#fff',
    //     borderTopWidth: 1,
    //     borderColor: '#ddd',
    // },
});

const Room = () => {
    const navigate = useNavigate()
    const { setSelectedRoom } = useContext(RoomContext)

    const handlePress = (room) => {
        setSelectedRoom(room)
        navigate('/lock')
    }
   
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#C70039', '#FF5733']} style={styles.header}>
                <View style={styles.userInfo}>
                    <FontAwesome name="user-circle" size={30} color="white" style={{marginRight: 5}}/>
                    <Text style={styles.welcomeText}>Hi, Alif Zakwan</Text>
                </View>
                <Text style={styles.welcomeText}>Room Access</Text>
            </LinearGradient>
            
            <View style={styles.buttonContainer}>
                {[1, 2, 3, 4, 5, 6].map((room, index) => (
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
