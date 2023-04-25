const getEnvVar = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`)
  }
  return import.meta.env[key] || ''
}

export const API_URL = getEnvVar('VITE_BASE_URL')

export const ACCESS_TOKEN = getEnvVar('VITE_ACCESS_TOKEN')
