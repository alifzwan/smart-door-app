import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

const lockRoom = async () => {
    try {
        await axios.post(`${BASE_URL}/lock`)
    } catch (error) {
        console.error('Error locking room:', error)
        throw error
    }
}

const unlockRoom = async () => {
    try{
        await axios.post(`${BASE_URL}/unlock`);
    } catch (error) {
        console.error('Error unlocking room:', error);
    }
}

const getStatus = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/status`);
        return response.data.status;
    } catch (error) {
        console.error('Error fetching status:', error);
        throw error;
    }
}

export { lockRoom, unlockRoom, getStatus };