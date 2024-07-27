import React, { createContext, useState } from 'react';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [selectedRoom, setSelectedRoom] = useState(null);

    return (
        <RoomContext.Provider value={{ selectedRoom, setSelectedRoom }}>
            {children}
        </RoomContext.Provider>
    );
};