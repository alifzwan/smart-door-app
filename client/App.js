import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/Main';
import { NativeRouter } from 'react-router-native';
import Constants from 'expo-constants';

export default function App() {
  console.log("Constants:", Constants.expoConfig);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NativeRouter>
        <Main />  
      </NativeRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
