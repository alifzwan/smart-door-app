const config = require('./utils/config')
const bcrypt = require('bcrypt')
const { createClient } = require('@supabase/supabase-js')
const readlineSync = require('readline-sync')


const supabaseUrl = config.SUPABASE_URL
const supabaseAnonKey = config.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey) // Create a client instance


// Insert a new user into the database
const insertUser = async(student_id, password) => {
    const saltRounds = 10 // Number of salt rounds for hashing
    const password_hash = bcrypt.hashSync(password, saltRounds) // Hash the password

    const { data, error } = await supabase
        .from('students') // Table name
        .insert([{ student_id, password_hash }]) // Insert the student_id and password_hash

    if(error)    {
        console.error('Error inserting user:', error)
    } else {
        console.log('Inserted user:', student_id)
    }
}

const main = async () => {
    const student_id = readlineSync.question('Enter student ID: ')   
    const password = readlineSync.question('Enter password: ', { 
        min: 6, // minimum length of password
        mask: '*', // hide the password
        hideEchoBack: true // hide the password
    })

    await insertUser(student_id, password) // Insert the user into the database

}

main()