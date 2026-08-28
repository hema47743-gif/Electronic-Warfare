from datetime import datetime, timezone
from random import randint, uniform, choice
from typing import Optional

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Electronic Warfare Command Backend",
    description="Demo backend for an Electronic Warfare monitoring dashboard",
    version="1.0.0",
)


# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# Helpers
# ---------------------------------------------------------

def now():
    return datetime.now(timezone.utc).isoformat()


def random_status():
    return choice(["normal", "monitoring", "elevated"])


# ---------------------------------------------------------
# Mock Data
# ---------------------------------------------------------

sensors = [
    {
        "id": "SEN-001",
        "name": "North Sector Sensor",
        "region": "North",
        "status": "online",
        "signal_quality": 96,
        "last_seen": now(),
    },
    {
        "id": "SEN-002",
        "name": "East Sector Sensor",
        "region": "East",
        "status": "online",
        "signal_quality": 91,
        "last_seen": now(),
    },
    {
        "id": "SEN-003",
        "name": "South Sector Sensor",
        "region": "South",
        "status": "online",
        "signal_quality": 88,
        "last_seen": now(),
    },
    {
        "id": "SEN-004",
        "name": "West Sector Sensor",
        "region": "West",
        "status": "online",
        "signal_quality": 94,
        "last_seen": now(),
    },
]


alerts = [
    {
        "id": "ALT-1001",
        "severity": "high",
        "category": "Signal anomaly",
        "location": "North Sector",
        "status": "open",
        "timestamp": now(),
        "description": "Unusual simulated signal activity detected.",
    },
    {
        "id": "ALT-1002",
        "severity": "medium",
        "category": "Spectrum congestion",
        "location": "East Sector",
        "status": "investigating",
        "timestamp": now(),
        "description": "Elevated simulated spectrum activity.",
    },
    {
        "id": "ALT-1003",
        "severity": "low",
        "category": "Sensor health",
        "location": "South Sector",
        "status": "open",
        "timestamp": now(),
        "description": "Sensor telemetry quality decreased.",
    },
]


incidents = [
    {
        "id": "INC-001",
        "title": "Signal anomaly",
        "severity": "high",
        "region": "North",
        "status": "investigating",
        "created_at": now(),
        "updated_at": now(),
    },
    {
        "id": "INC-002",
        "title": "Spectrum activity increase",
        "severity": "medium",
        "region": "East",
        "status": "monitoring",
        "created_at": now(),
        "updated_at": now(),
    },
]


# ---------------------------------------------------------
# Root
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "name": "Electronic Warfare Command Backend",
        "status": "online",
        "version": "1.0.0",
        "time": now(),
    }


# ---------------------------------------------------------
# API Information
# ---------------------------------------------------------

@app.get("/api")
def api_info():
    return {
        "service": "Electronic Warfare Dashboard API",
        "status": "operational",
        "frontend": "connected",
        "database": "mock",
        "last_sync": now(),
    }


# ---------------------------------------------------------
# System Status
# ---------------------------------------------------------

@app.get("/api/system/status")
def system_status():
    online_sensors = sum(
        1 for sensor in sensors
        if sensor["status"] == "online"
    )

    return {
        "system": "EW SENTINEL",
        "status": "operational",
        "api": "online",
        "database": "mock-online",
        "frontend": "connected",
        "sensors_online": online_sensors,
        "sensors_total": len(sensors),
        "system_uptime": "99.94%",
        "analysts_on_duty": 8,
        "open_alerts": len(alerts),
        "open_incidents": len(incidents),
        "last_sync": now(),
    }


# ---------------------------------------------------------
# Dashboard Overview
# ---------------------------------------------------------

@app.get("/api/dashboard/overview")
def dashboard_overview():
    return {
        "active_signals": 247,
        "monitored_zones": 24,
        "anomalies_detected": 1842,
        "average_response_time": 4.2,
        "sensor_coverage": "96.8%",
        "open_alerts": len(alerts),
        "open_incidents": len(incidents),
        "system_status": "operational",
        "updated_at": now(),
    }


# ---------------------------------------------------------
# Sensors
# ---------------------------------------------------------

@app.get("/api/sensors")
def get_sensors():
    return {
        "count": len(sensors),
        "sensors": sensors,
        "timestamp": now(),
    }


@app.get("/api/sensors/{sensor_id}")
def get_sensor(sensor_id: str):

    for sensor in sensors:
        if sensor["id"] == sensor_id:
            return sensor

    return {
        "error": "Sensor not found",
        "sensor_id": sensor_id,
    }


# ---------------------------------------------------------
# Alerts
# ---------------------------------------------------------

@app.get("/api/alerts")
def get_alerts(
    severity: Optional[str] = Query(
        default=None,
        description="Filter by severity"
    ),
    status: Optional[str] = Query(
        default=None,
        description="Filter by status"
    ),
):
    result = alerts

    if severity:
        result = [
            alert
            for alert in result
            if alert["severity"].lower() == severity.lower()
        ]

    if status:
        result = [
            alert
            for alert in result
            if alert["status"].lower() == status.lower()
        ]

    return {
        "count": len(result),
        "alerts": result,
        "timestamp": now(),
    }


# ---------------------------------------------------------
# Incidents
# ---------------------------------------------------------

@app.get("/api/incidents")
def get_incidents():
    return {
        "count": len(incidents),
        "incidents": incidents,
        "timestamp": now(),
    }


@app.get("/api/incidents/{incident_id}")
def get_incident(incident_id: str):

    for incident in incidents:
        if incident["id"] == incident_id:
            return incident

    return {
        "error": "Incident not found",
        "incident_id": incident_id,
    }


# ---------------------------------------------------------
# Simulated Spectrum Metrics
# ---------------------------------------------------------

@app.get("/api/spectrum")
def spectrum_data():

    bands = [
        "VHF",
        "UHF",
        "L-Band",
        "S-Band",
        "C-Band",
        "X-Band",
    ]

    result = []

    for band in bands:
        result.append(
            {
                "band": band,
                "activity": randint(20, 95),
                "occupancy": round(uniform(15, 90), 2),
                "status": random_status(),
                "timestamp": now(),
            }
        )

    return {
        "bands": result,
        "mode": "simulation",
    }


# ---------------------------------------------------------
# Signal Activity
# ---------------------------------------------------------

@app.get("/api/signals")
def signal_activity():

    signals = []

    for i in range(12):
        signals.append(
            {
                "id": f"SIG-{1000 + i}",
                "region": choice(
                    ["North", "South", "East", "West"]
                ),
                "activity": randint(10, 100),
                "confidence": round(
                    uniform(70, 99), 2
                ),
                "classification": choice(
                    [
                        "Normal",
                        "Anomalous",
                        "Elevated",
                    ]
                ),
                "timestamp": now(),
            }
        )

    return {
        "count": len(signals),
        "signals": signals,
        "mode": "simulation",
    }


# ---------------------------------------------------------
# Regional Status
# ---------------------------------------------------------

@app.get("/api/regions")
def regional_status():

    regions = [
        "North",
        "South",
        "East",
        "West",
        "Central",
    ]

    result = []

    for region in regions:
        result.append(
            {
                "region": region,
                "status": random_status(),
                "sensor_count": randint(20, 80),
                "activity_level": randint(15, 95),
                "alerts": randint(0, 8),
                "coverage": round(
                    uniform(85, 100), 1
                ),
            }
        )

    return {
        "regions": result,
        "timestamp": now(),
    }


# ---------------------------------------------------------
# Timeline
# ---------------------------------------------------------

@app.get("/api/timeline")
def timeline():

    events = [
        {
            "time": "10:02",
            "type": "SYSTEM",
            "message": "Sensor network synchronized",
            "severity": "info",
        },
        {
            "time": "10:05",
            "type": "SIGNAL",
            "message": "Signal activity increased",
            "severity": "medium",
        },
        {
            "time": "10:08",
            "type": "ALERT",
            "message": "Simulated anomaly flagged",
            "severity": "high",
        },
        {
            "time": "10:12",
            "type": "SYSTEM",
            "message": "Telemetry health check completed",
            "severity": "info",
        },
    ]

    return {
        "events": events,
        "timestamp": now(),
    }


# ---------------------------------------------------------
# Health Check
# ---------------------------------------------------------

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "service": "ew-dashboard-backend",
        "timestamp": now(),
    }


# ---------------------------------------------------------
# Run directly
# ---------------------------------------------------------

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
    )