import React, { createContext, useContext, useState } from 'react';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [studentId, setStudentId] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
    const [bookedSlots, setBookedSlots] = useState({})


    return (
        <RoomContext.Provider 
            value={{ 
                selectedRoom,
                setSelectedRoom,
                studentId,
                setStudentId,
                selectedDate,
                setSelectedDate,
                selectedTimeSlot,
                setSelectedTimeSlot,
                bookedSlots,
                setBookedSlots 
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};

export const useRoomContext = () => useContext(RoomContext)