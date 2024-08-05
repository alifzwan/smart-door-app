import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { useNavigate } from 'react-router-native'
import theme from '../../theme/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { useRoomContext } from '../../utils/RoomContext'
import { supabase } from '../../lib/supabase'


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
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    elevation: 5
  },

  
})

const Homepage = () => {
  const navigate = useNavigate()
  const { studentId } = useRoomContext()

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

      if(error){
        throw error
      }

      setName(data.name)

    } catch (error) {
      console.log('error', error)
    }
  }

  const handlePress = () => {
    navigate('/room')
  }



  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FF512F', '#DD2476']} style={styles.header}>
        <View style={styles.userInfo}>
            <FontAwesome name="user-circle" size={30} color="white" style={{marginRight: 5}}/>
            {name ? (
              <Text style={styles.welcomeText}> Welcome {name}!</Text>
            ) : (
              <ActivityIndicator size="small" color="#fff" />
            )}
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

