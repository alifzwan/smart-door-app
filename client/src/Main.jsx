import { View } from 'react-native'
import React from 'react'
import SignIn from './components/signin/SignIn'
import { Routes, Route, Navigate } from 'react-router-native'
import Room from './components/room/Room'
import Lock from './components/lock/Lock'
import Homepage from './components/homepage/Homepage'
import Book from './components/book/Book'
import AppBar from './components/bar/AppBar'
import DateBar from './components/bar/DateBar'
import { RoomProvider } from './utils/RoomContext'

const Main = () => {
  return (
    <RoomProvider>
      <View>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/room" element={<><AppBar /><Room /></>} />
          <Route path="/book" element={<><DateBar /><Book /></>} />
          <Route path="/lock" element={<><AppBar /><Lock /></>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </RoomProvider>
  )
}

export default Main