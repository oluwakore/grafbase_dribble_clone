
const serverUrl = process.env.NEXT_PUBLIC_NEXT_AUTH_URL


export const fetchToken = async () => {

  try {
    const response = await fetch(`${serverUrl}/api/auth/token`)
    
    return response.json()
  } catch (error) {
    throw error
  }
}