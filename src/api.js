const BACKEND_URL = "http://127.0.0.1:8000";

async function apiGet(endpoint) {
  const response = await fetch(`${BACKEND_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(
      `Backend request failed: ${response.status}`
    );
  }

  return response.json();
}

export async function getDashboardOverview() {
  return apiGet("/api/dashboard/overview");
}

export async function getSystemStatus() {
  return apiGet("/api/system/status");
}

export async function getSignals() {
  return apiGet("/api/signals");
}

export async function getAlerts() {
  return apiGet("/api/alerts");
}

export async function getSensors() {
  return apiGet("/api/sensors");
}

export async function getSpectrum() {
  return apiGet("/api/spectrum");
}

export async function getIncidents() {
  return apiGet("/api/incidents");
}

export async function getTimeline() {
  return apiGet("/api/timeline");
}

export default apiGet;