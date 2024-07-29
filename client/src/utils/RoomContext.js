import React, { createContext, useContext, useState } from 'react';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [studentId, setStudentId] = useState(null)

    return (
        <RoomContext.Provider value={{ selectedRoom, setSelectedRoom, studentId, setStudentId }}>
            {children}
        </RoomContext.Provider>
    );
};

export const useRoomContext = () => useContext(RoomContext)