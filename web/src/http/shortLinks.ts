import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3333'

const api = axios.create({
  baseURL: API_BASE_URL,
})

interface CreateShortLinkResponse {
  id: string
  shortCode: string
  originalUrl: string
  hits: number
  createdAt: string
}

export async function createShortLink(data: {
  originalUrl: string
  customCode: string
}) {
  const response = await api.post<CreateShortLinkResponse>('/short-links', data)
  return response.data
}

export async function getAllShortLinks() {
  const response = await api.get<{
    id: string
    shortCode: string
    originalUrl: string
    hits: number
    createdAt: string
  }[]>('/short-links')
  return response.data
}

export async function deleteShortLink(id: string) {
  await api.delete(`/short-links/${id}`)
}

export async function exportShortLinks() {
  const response = await api.get<{ url: string }>('/short-links/export')
  return response.data
}

export async function getOriginalUrlByShortCode(shortCode: string) {
  const response = await api.get<{ right: string }>(`/${shortCode}`)
  return response.data.right
}
