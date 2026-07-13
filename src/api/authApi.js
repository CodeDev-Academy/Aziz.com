const API_BASE_URL = 'http://localhost:8000/api/accounts';

/**
 * Helper to parse backend error responses and return readable messages.
 */
async function handleResponseError(response) {
  try {
    const errorData = await response.json();
    
    // If standard simplejwt detail error
    if (errorData.detail) {
      return new Error(errorData.detail);
    }
    
    // If validation serializer errors (dictionary)
    if (typeof errorData === 'object') {
      const messages = [];
      for (const [key, value] of Object.entries(errorData)) {
        const fieldName = key === 'non_field_errors' ? '' : `${key}: `;
        const errorText = Array.isArray(value) ? value.join(' ') : value;
        messages.push(`${fieldName}${errorText}`);
      }
      return new Error(messages.join(' | '));
    }
    
    return new Error('Request failed. Please try again.');
  } catch {
    return new Error(`Server returned status code ${response.status}`);
  }
}

export const authApi = {
  /**
   * Log in user and retrieve JWT tokens + profile data.
   */
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw await handleResponseError(response);
    }

    return await response.json();
  },

  /**
   * Register a new user account.
   */
  register: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Maps 'name' to 'full_name' for Django; confirm_password is set to password
      body: JSON.stringify({
        full_name: name,
        email,
        password,
        confirm_password: password,
      }),
    });

    if (!response.ok) {
      throw await handleResponseError(response);
    }

    return await response.json();
  },

  /**
   * Get the logged-in user's profile details.
   */
  getProfile: async (accessToken) => {
    const response = await fetch(`${API_BASE_URL}/profile/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw await handleResponseError(response);
    }

    return await response.json();
  },

  /**
   * Update the user profile info.
   */
  updateProfile: async (accessToken, profileFields) => {
    const response = await fetch(`${API_BASE_URL}/profile/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(profileFields),
    });

    if (!response.ok) {
      throw await handleResponseError(response);
    }

    return await response.json();
  },

  /**
   * Renew the access token using a refresh token.
   */
  refreshToken: async (refresh) => {
    const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) {
      throw await handleResponseError(response);
    }

    return await response.json();
  },
};
