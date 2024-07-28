require('dotenv').config()

const PORT = process.env.PORT || 3000
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

module.exports = {
    PORT,
    SUPABASE_URL,
    SUPABASE_ANON_KEY
}    