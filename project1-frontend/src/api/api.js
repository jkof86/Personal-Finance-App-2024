const API_BASE_URL = "http://localhost:8080";

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Parse the response text
      throw new Error(errorText || "Registration failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Parse the response text
      throw new Error(errorText || "Login failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userData.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Delete failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userData) => {
  const userId = userData.id;
  const { id, ...dataWithoutId } = userData;
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataWithoutId),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Update failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
