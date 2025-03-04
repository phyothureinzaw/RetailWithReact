import type { LoginPayload } from './types'
import axios from '@/config/axios'

const baseUrl = '/User'

const login = async (payload: LoginPayload) => {
    const request = await axios.post(`${baseUrl}/UserLogin`, payload);
    console.log(request);
    return request.data
}

export default { login } 