import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useNavigate, Link } from 'react-router-native'
import * as theme from '../../theme/theme'
import { Ionicons } from '@expo/vector-icons'


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        paddingBottom: 10,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backText: {
      marginLeft: 5,
      fontSize: theme.fontSize.subheading,
      fontWeight: theme.fontWeights.bold,
    }
})

const AppBar = () => {
  const navigate = useNavigate()
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigate(-1)} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />

        {/* <AntDesign name="arrowleft" size={20} color="black" /> */}
        {/* <Text style={styles.backText}>Back</Text> */}
      </Pressable>
    </View>
  )
}

export default AppBar
