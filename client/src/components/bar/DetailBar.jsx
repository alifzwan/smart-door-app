import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useNavigate, Link } from 'react-router-native'
import * as theme from '../../theme/theme'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Center the content horizontally
        paddingVertical: 10, // Add some vertical padding for better spacing
        position: 'relative', // Needed for the absolute positioning of the back button
    },
    backButton: {
      position: 'absolute', // Position it absolutely within the container
      left: 10, // Position it on the left side with some margin
      flexDirection: 'row',
      alignItems: 'center', // Center the arrow icon vertically with the text
    },
    backText: {
      marginLeft: 5,
      fontSize: theme.fontSize.subheading,
      fontWeight: theme.fontWeights.bold,
      textAlign: 'center',
      fontFamily: 'Helvetica-World'
    }
})

const DetailBar = () => {
  const navigate = useNavigate()
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigate(-1)} style={styles.backButton}>
        <AntDesign name="arrowleft" size={20} color="black" />
      </Pressable>

      <Text style={styles.backText}>Detail</Text>
    </View>
  )
}

export default DetailBar
