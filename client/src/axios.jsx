import axios from 'axios';
import { demoRequest } from './demo/demoApi';
import { isDemoMode } from './config';

export const makeRequest = isDemoMode
    ? demoRequest
    : axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8800/api/",
        withCredentials:true,
    })
