import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import Main from './src/Main'
import { NativeRouter } from 'react-router-native'
import Constants from 'expo-constants'
import { useFonts } from 'expo-font'

export default function App() {
  // Load the Helvetica-World font
  let [fontsLoaded] = useFonts({
    'Helvetica-World': require('./assets/Helvetica.ttf'), // Ensure the path is correct
  })

  

  console.log("Constants:", Constants.expoConfig)

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NativeRouter>
        <Main />
      </NativeRouter>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
