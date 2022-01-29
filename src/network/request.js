import axios from 'axios'
import { baseURL } from '@/config/baseConfig'

export default function request (config) {
  const req = axios.create({
    baseURL: baseURL,
    timeout: 15000
  })
  return req(config)
}
