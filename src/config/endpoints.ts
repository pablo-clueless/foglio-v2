const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const ENDPOINTS = (id?: string) => {
  return {
    auth: {
      signup: `${BASE_URL}/auth/signup`,
      signin: `${BASE_URL}/auth/signin`,
      verification: `${BASE_URL}/auth/verification`,
      update_password: `${BASE_URL}/auth/update-password`,
      forgot_password: `${BASE_URL}/auth/forgot-password`,
      reset_password: `${BASE_URL}/auth/reset-password`,
      github: `${BASE_URL}/auth/github`,
      github_callback: `${BASE_URL}/auth/github/callback`,
      google: `${BASE_URL}/auth/google`,
      google_callback: `${BASE_URL}/auth/google/callback`,
    },
    job: {
      create: `${BASE_URL}/jobs/`,
      get_all: `${BASE_URL}/jobs/`,
      get: `${BASE_URL}/jobs/${id}`,
      update: `${BASE_URL}/jobs/${id}`,
      delete: `${BASE_URL}/jobs/${id}`,
      apply: `${BASE_URL}/jobs/${id}/apply`,
    },
    notification: {
      get_all: `${BASE_URL}/notifications/`,
      get: `${BASE_URL}/notifications/${id}`,
      read: `${BASE_URL}/notifications/${id}`,
      delete: `${BASE_URL}/notifications/${id}`,
    },
    user: {
      get_all: `${BASE_URL}/users/`,
      get: `${BASE_URL}/users/${id}`,
      update: `${BASE_URL}/users/${id}`,
      update_avatar: `${BASE_URL}/users/${id}/avatar`,
      delete: `${BASE_URL}/users/${id}`,
    },
  };
};
