const API_BASE = "http://localhost/back_edf/api";

export async function registerUser(data) {
  const response = await fetch(`${API_BASE}/register.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

export async function loginUser(data) {
  const response = await fetch(`${API_BASE}/login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
}
