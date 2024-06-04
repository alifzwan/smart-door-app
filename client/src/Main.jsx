import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SignIn from './components/signin/SignIn'
import { Routes, Route, Navigate } from 'react-router-native'
import Room from './components/room/Room'
import Lock from './components/lock/Lock'
import AppBar from './components/bar/AppBar'

const Main = () => {
  return (
    <View>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/room" element={<Room />} />
          <Route path="/lock" element={<><AppBar /><Lock /></>} />
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
    container:{
    }
})