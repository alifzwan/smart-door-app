import { StyleSheet, Text, View, TextInput, Pressable, ActivityIndicator} from 'react-native'
import { useState } from 'react'
import theme from '../../theme/theme'
import { useRoomContext } from '../../utils/RoomContext'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: theme.fontSize.body,
        fontWeight: theme.fontWeights.bold,
        marginBottom: 8,
        color: theme.colors.textSecondary,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: theme.fontSize.body,
        color: theme.colors.textSecondary,
        backgroundColor: '#f9f9f9',
    },
    inputMatric: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: theme.fontSize.body,
        color: theme.colors.textSecondary,
        fontWeight: theme.fontWeights.normal,
        backgroundColor: '#f9f9f9'
    },
    disabledInput: {
        backgroundColor: '#e0e0e0', 
    },
    buttonContainer: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: theme.backgroundColor.secondary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        elevation: 5,
        width: '60%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSize.subheading,
    },
})

const Detail = () => {
    const [name, setName] = useState('')
    const [reason, setReason] = useState('')
    const { studentId, selectedRoom, selectedDate, selectedTimeSlot, setBookedSlots } = useRoomContext()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


    const handleBooking = () => {
        if(name && reason) {
            console.log('Booking Details:', { name, studentId, reason, selectedDate, selectedTimeSlot })
            setLoading(true)
            
            setBookedSlots(prevSlots => ({
                ...prevSlots,
                [selectedDate]: [...(prevSlots[selectedDate] || []), selectedTimeSlot]
            }))

            setTimeout(() => { 
                navigate('/booking')
                setLoading(false) 
            }, 1500); 
        } else {
            console.log('Please fill in all the fields')
        }
    }
  return (
    <View style={styles.container}>
    <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Enter your name"
        />
    </View>
    <View style={styles.inputContainer}>
        <Text style={styles.label}>Matric Number</Text>
        <TextInput
            value={studentId}
            style={[styles.inputMatric, styles.disabledInput]}
            editable={false} // Make this field non-editable
        />
    </View>
    <View style={styles.inputContainer}>
        <Text style={styles.label}>Reason For Booking</Text>
        <TextInput
            value={reason}
            onChangeText={setReason}
            style={styles.input}
            placeholder="Enter the reason for booking"
        />
    </View>

    <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleBooking} disabled={loading}>
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ): (
                <Text style={styles.buttonText}>Book</Text>
            )}
        </Pressable>
    </View>
</View>
  )
}

export default Detail

