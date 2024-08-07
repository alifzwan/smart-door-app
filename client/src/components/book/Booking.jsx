import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import { Calendar } from 'react-native-calendars'
import theme from '../../theme/theme'
import moment from 'moment'
import { useNavigate } from 'react-router-native'
import { useRoomContext } from '../../utils/RoomContext'
import {supabase} from '../../lib/supabase'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
    },
    dateBar: {
        backgroundColor: theme.backgroundColor.secondary,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignItems: 'center',
    },
    dateBarText: {
        color: '#fff',
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSize.subheading,
    },
    calendar: {
        padding: '10px',
        marginBottom: 40,
        borderWidth: 1,
        borderRadius: 10,
    },
    timeSlotContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 10,
        gap: 16,
    },
    timeSlotButton: {
        backgroundColor: '#28a745',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        width: '28%',
        alignItems: 'center',
    },
    timeSlotText: {
        color: '#fff',
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSize.body,
    },
    continueButtonContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    continueButton: {
        backgroundColor: theme.backgroundColor.secondary,
        padding: 15,
        width: '60%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        elevation: 5,
    },
    continueButtonText: {
        color: '#fff',
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSize.subheading,
    },
})

const BookingScreen = () => {
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
    const [loading, setLoading] = useState(true)
    const { bookedSlots, setBookedSlots, setSelectedDate: setContextDate, setSelectedTimeSlot: setContextTimeSlot } = useRoomContext()
    const navigate = useNavigate()

    const timeSlots = [
        '8:00 AM', '9:00 AM', '10:00 AM',
        '11:00 AM', '12:00 PM', '1:00 PM',
        '2:00 PM', '3:00 PM', '4:00 PM',
    ]

    useEffect(() => {
        const fetchBookedSlots = async () => {
            try {
                const { data, error } = await supabase
                .from('bookings')
                .select('date, timeslot, name')
            
                if (error) {
                    console.error('Error fetching booked slots:', error)
                } else {
                    const slots = data.reduce((acc, booking) => {
                        const date = booking.date
                        const timeSlot = booking.timeslot

                        if (!acc[date]) {
                            acc[date] = []
                        }

                        acc[date].push(timeSlot)
                        return acc
                    }, {})

                    setBookedSlots(slots)
                    setLoading(false)
                }
            } catch (error){
                console.error('Error fetching booked slots:', error)
                setLoading(false)
            }
            
        }

        fetchBookedSlots()
    }, [setBookedSlots])

    const getCurrentTimeSlots = () => {
        const currentTime = moment()
        const currentDate = moment().format('YYYY-MM-DD')
    
        return timeSlots.filter(time => {
            const slotTime = moment(time, 'h:mm A')
    
            // If the selected date is today, filter out times that have already passed
            if (selectedDate === currentDate) {
                return slotTime.isAfter(currentTime)
            }
    
            // If the selected date is in the past, show no time slots
            if (moment(selectedDate).isBefore(currentDate)) {
                return false
            }
    
            // If the selected date is in the future, show all time slots
            return true
        })
    }

    const onDayPress = (day) => {
        setSelectedDate(day.dateString)
        setContextDate(day.dateString)
        setSelectedTimeSlot(null) // Reset the selected time slot when a new date is selected
    }

    const handleTimeSlotPress = (time) => {
        setSelectedTimeSlot(time)
        setContextTimeSlot(time)
    }

    const handleContinuePress = () => {
        if (selectedDate && selectedTimeSlot) {
            navigate('/detail')
        } else {
            console.log('Please select a date and time slot')
        }
    }

    return (
        <View style={styles.container}>
            {selectedDate ? (
                <View style={styles.dateBar}>
                    <Text style={styles.dateBarText}>
                        {moment(selectedDate).format('MMMM D, YYYY')}
                    </Text>
                </View>
            ) : (
                <Text style={styles.dateBarText}>Please select a date</Text>
            )}

            <Calendar
                onDayPress={onDayPress}
                style={styles.calendar}
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: 'tomato' },
                }}
                theme={{
                    arrowColor: 'red', 
                    todayTextColor: 'red',
                    textMonthFontWeight: 'bold',
                }}
            />

            <View style={styles.timeSlotContainer}>
                { loading ? (
                    <ActivityIndicator size="large" color={theme.backgroundColor.secondary} />
                ) : ( 
                    getCurrentTimeSlots().map((time, index) => {
                        const isBooked = bookedSlots[selectedDate]?.includes(time)
                        return (
                            <Pressable
                                key={index}
                                style={[
                                    styles.timeSlotButton,
                                    selectedTimeSlot === time && { backgroundColor: 'tomato' },
                                    isBooked && { backgroundColor: selectedTimeSlot === time ? 'tomato' : 'red' },
                                ]}
                                onPress={() => handleTimeSlotPress(time)}
                            >
                                <Text style={styles.timeSlotText}>{time}</Text>
                            </Pressable>
                        )
                    })
                )}
            </View>


            
            <View style={styles.continueButtonContainer}>
                <Pressable style={styles.continueButton} onPress={handleContinuePress}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default BookingScreen
