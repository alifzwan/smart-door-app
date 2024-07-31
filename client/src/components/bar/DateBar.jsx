import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingBottom: 10,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    backText: {
      marginLeft: 5,
      fontSize: theme.fontSize.subheading,
      fontWeight: theme.fontWeights.bold,
    }
})

const DateBar = () => {
    const navigate = useNavigate()
    return (
      <View style={styles.container}>
        <Pressable onPress={() => navigate(-1)} style={styles.backButton}>
          <AntDesign name="arrowleft" size={20} color="black" />
          <Text style={styles.backText}>Select Date</Text>
        </Pressable>
      </View>
    )
}

export default DateBar

