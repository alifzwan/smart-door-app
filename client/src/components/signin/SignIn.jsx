import { StyleSheet, Text, View, Image, TextInput, Pressable, Button, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import * as theme from '../../theme/theme'
import { Ionicons } from '@expo/vector-icons'
import * as yup from 'yup'
import { useFormik } from 'formik' 
import { useNavigate } from 'react-router-native'
import { supabase } from '../../lib/supabase'
import bcrypt from 'react-native-bcrypt'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 55,
        alignItems: 'center',
    },
    image: {
        width: 160,
        height: 251,
        alignSelf: 'center',
        padding: 16
    },
    form: {
        padding: 16,
        flexDirection: 'column'
    },
    label: {
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSize.subheading,
        left: 16,
    },
    input: {
        width: 320,
        height: 60,
        padding: 16,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    passwordContainer: {
        width: '100%',
        position: 'relative',
    },
    passwordInput: {
        paddingRight: 40,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        bottom: 25
    },
    button: {
        width: 320,
        height: 60,
        padding: 16,
        margin: 10,
        backgroundColor: theme.backgroundColor.secondary,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: theme.colors.textPrimary,
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSize.subheading,
    },
    errorText: {
        color: "#d73a4a",
        left: 16,
        marginBottom: 10
    },
    errorInput: {
        borderColor: "#d73a4a"
    },
    loading: {
        marginVertical: 20,
    }
})

const SignIn = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

     
    const initialValues = {
        student_id: '',
        password: ''
    }
    
    const validationSchema = yup.object().shape({
        student_id: yup.string().required('Student Matric is required'),
        password: yup.string().required('Password is required')
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })


    const onSubmit = async (values, { setFieldError }) => {
        setLoading(true)
        try{
           const { data, error } = await supabase
                .from('students')
                .select('password_hash')
                .eq('student_id', values.student_id)
                .single()


            if(error) {
                setFieldError('student_id', 'Invalid student matric or password');
                setFieldError('password', 'Invalid student matric or password');
            } else {

                const isValidPassword = bcrypt.compareSync(values.password, data.password_hash)

                if(isValidPassword){
                    console.log("Login successful: ", values.student_id)
                    navigate('/room')

                } else {
                    setFieldError('student_id', 'Invalid student matric or password');
                    setFieldError('password', 'Invalid student matric or password');
                }
            }
        } catch(error) {
            setFieldError('username', error.message);
            setFieldError('password', error.message);
        }
        setLoading(false)
    }
    

    return (
        <View style={styles.container}>
            <Image 
                source={{uri:"assets/images/upm.png"}}
                style={styles.image}
                resizeMode="contain"
            />

            <View style={styles.form}>
                <View>
                    <Text style={styles.label}>Sign in UPM-ID</Text>
                    <TextInput 
                        placeholder="UPM-ID Username"
                        style={[styles.input, formik.touched.student_id && formik.errors.student_id && styles.errorInput]}
                        onChangeText={formik.handleChange('student_id')}
                        value={formik.values.student_id}
                        onBlur={formik.handleBlur('student_id')}
                    />
                    {formik.touched.student_id && formik.errors.student_id && (
                        <Text style={styles.errorText}>
                            {formik.errors.student_id}
                        </Text>
                    )}
                </View>
                <View>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}> 
                        <TextInput 
                            placeholder="Password"
                            style={[styles.input, styles.passwordInput, formik.touched.password && formik.errors.password && styles.errorInput]}
                            secureTextEntry={!passwordVisible}
                            onChangeText={formik.handleChange('password')}
                            value={formik.values.password}
                            onBlur={formik.handleBlur('password')}
                        />
                        <Ionicons 
                            name={passwordVisible ? 'eye' : 'eye-off'}
                            size={24}
                            color={theme.colors.textTertiary}
                            style={styles.eyeIcon}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                        />
                    </View>
                    {formik.touched.password && formik.errors.password && (
                        <Text style={styles.errorText}>
                            {formik.errors.password}
                        </Text>
                    )}
                </View>
            </View>
            {loading ? (
                <ActivityIndicator style={styles.loading} size="large" color={theme.colors.textPrimary}/>
            ) : (
                <Pressable style={styles.button} onPress={formik.handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
            )}
                
        </View>
    )
}

export default SignIn
