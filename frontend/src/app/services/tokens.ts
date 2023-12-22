import axios from "axios";

export function setBaseTokenStorage(data: any) {
  localStorage.setItem("access_token", data.payload.access_token);
  localStorage.setItem("refresh_token", data.payload.refresh_token);
}

export function setTokenStorage(tokens: {access_token: string, refresh_token: string}) {
  localStorage.setItem("access_token", tokens.access_token);
  localStorage.setItem("refresh_token", tokens.refresh_token);
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export function getAccessTokenStorage(): string | null {
  let token = null;

  if (localStorage.getItem("access_token")) {
    token = localStorage.getItem("access_token");
  }

  return token;
}

export function getRefreshTokenStorage(): string | null {
  let token = null;

  if (localStorage.getItem("refresh_token")) {
    token = localStorage.getItem("refresh_token");
  }

  return token;
}

function getHeaders(params?: any) {
  let token = getAccessTokenStorage();

  let headers = {
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      "Authorization": ""
    },
    params: params,
    baseURL: "/api/admin"
  };

  if(token) headers.headers.Authorization = `Bearer ${token}`;

  return headers;
}

export async function refreshAccessToken(headers?: any){
  const token = getRefreshTokenStorage();
  const body = { refresh_token: token };

  const response = await axios.post('/admin/refresh', body, headers)

  setTokenStorage(response.data.payload);
}

export async function isErrorAuth(err: any) {
  if(err.response.status === 422) {
    clearTokens();
    window.location.reload();
  }

  if(err.response.status === 401) {
    try {
      await refreshAccessToken(getHeaders())
    } catch (error) { 
      return false;
    }
    return true;
  };
  return false;
}
