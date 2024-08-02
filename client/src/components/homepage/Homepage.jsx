import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { useNavigate } from 'react-router-native'
import theme from '../../theme/theme'
import { LinearGradient } from 'expo-linear-gradient'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    padding: 20,
    height: '100%'
  },
  header: {
    width: '100%',
    backgroundColor: theme.backgroundColor.secondary,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth:1
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    color: '#fff',
    fontWeight: theme.fontWeights.bold,
    fontSize: 18,
  },
  buttonContainer:{
    flex: 1,
    gap: 50,
    padding: 20,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  buttonLog: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonAccess: {
    backgroundColor: theme.backgroundColor.secondary,
    height: '220px',
    width: '100%',
    padding: 20,
    gap: 10,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonLogout: {
    backgroundColor: theme.backgroundColor.secondary,
    width: '40%',
    padding: 20,
    marginVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },

  
})

const Homepage = () => {
  const navigate = useNavigate()

  const handlePress = () => {
    navigate('/room')
  }


  return (
    <View style={styles.container}>
      <LinearGradient colors={['#C70039', '#FF5733']} style={styles.header}>
        <View style={styles.userInfo}>
            <FontAwesome name="user-circle" size={30} color="white" style={{marginRight: 5}}/>
            <Text style={styles.welcomeText}>Hi, Alif Zakwan</Text>
        </View>
      </LinearGradient>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonAccess} onPress={() => navigate("/room")}>
          <Text style={styles.buttonText}>Room Access</Text>
          <Ionicons name="lock-open-outline" size={24} color="#fff" />
        </Pressable>

        <Pressable style={styles.buttonAccess} onPress={() => navigate("/book")}>
          <Text style={styles.buttonText}>Booking</Text>
          <Ionicons name="book-outline" size={24} color="#fff" />
        </Pressable>


        <Pressable style={styles.buttonLogout} onPress={() => navigate("/")}>
          <Text style={styles.buttonLog}>Logout</Text>
          <Ionicons name="log-out" size={24} color="#fff" />
        </Pressable>
      </View>
    </View>
  )
}

export default Homepage

