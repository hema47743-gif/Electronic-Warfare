import { useEffect, useState } from "react";

import {
  Activity,
  AlertTriangle,
  Clock3,
  MapPin,
  Radio,
} from "lucide-react";

import KPICard from "./KPICard";
import ElectromagneticMap from "./ElectromagneticMap";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BACKEND_URL = "http://127.0.0.1:8000";

function CommandCenter() {
  const [overview, setOverview] = useState(null);
  const [systemStatus, setSystemStatus] = useState(null);
  const [backendAlerts, setBackendAlerts] = useState([]);
  const [backendSignals, setBackendSignals] = useState([]);

  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState(false);

  const [currentTime, setCurrentTime] = useState(
    new Date()
  );

  // --------------------------------------------------
  // CLOCK
  // --------------------------------------------------

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // --------------------------------------------------
  // BACKEND DATA
  // --------------------------------------------------

  const loadBackendData = async () => {
    try {
      setBackendError(false);

      const [
        overviewResponse,
        systemResponse,
        alertsResponse,
        signalsResponse,
      ] = await Promise.all([
        fetch(`${BACKEND_URL}/api/dashboard/overview`),
        fetch(`${BACKEND_URL}/api/system/status`),
        fetch(`${BACKEND_URL}/api/alerts`),
        fetch(`${BACKEND_URL}/api/signals`),
      ]);

      if (
        !overviewResponse.ok ||
        !systemResponse.ok ||
        !alertsResponse.ok ||
        !signalsResponse.ok
      ) {
        throw new Error(
          "One or more backend APIs failed"
        );
      }

      const overviewData =
        await overviewResponse.json();

      const systemData =
        await systemResponse.json();

      const alertsData =
        await alertsResponse.json();

      const signalsData =
        await signalsResponse.json();

      console.log(
        "COMMAND CENTER BACKEND DATA:",
        {
          overview: overviewData,
          system: systemData,
          alerts: alertsData,
          signals: signalsData,
        }
      );

      setOverview(overviewData);
      setSystemStatus(systemData);
      setBackendAlerts(alertsData.alerts || []);
      setBackendSignals(signalsData.signals || []);

      setLoading(false);
    } catch (error) {
      console.error(
        "Command Center backend error:",
        error
      );

      setBackendError(true);
      setLoading(false);
    }
  };

  // First load + every 10 seconds
  useEffect(() => {
    loadBackendData();

    const interval = setInterval(
      loadBackendData,
      10000
    );

    return () => clearInterval(interval);
  }, []);

  // --------------------------------------------------
  // CHART DATA
  // Backend signals -> chart
  // --------------------------------------------------

  const activityData = backendSignals.map(
    (signal, index) => ({
      time: `S${index + 1}`,
      signals: signal.activity,
    })
  );

  // --------------------------------------------------
  // VALUES FROM BACKEND
  // --------------------------------------------------

  const sensorsOnline =
    systemStatus?.sensors_online ?? 0;

  const sensorsTotal =
    systemStatus?.sensors_total ?? 0;

  const sensorPercentage =
    sensorsTotal > 0
      ? (
          (sensorsOnline / sensorsTotal) *
          100
        ).toFixed(1)
      : "0.0";

  const openAlerts =
    overview?.open_alerts ??
    systemStatus?.open_alerts ??
    0;

  const openIncidents =
    overview?.open_incidents ??
    systemStatus?.open_incidents ??
    0;

  const activeSignals =
    overview?.active_signals ?? 0;

  const anomaliesDetected =
    overview?.anomalies_detected ?? 0;

  const averageResponse =
    overview?.average_response_time ?? 0;

  const coverage =
    overview?.sensor_coverage ?? "0%";

  // --------------------------------------------------
  // ALERT LEVEL
  // --------------------------------------------------

  const getAlertLevel = (severity) => {
    if (!severity) return "LOW";

    return severity.toUpperCase();
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="page">

      {/* ------------------------------------------------
          PAGE HEADER
      ------------------------------------------------ */}

      <div className="eyebrow">
        COMMAND CENTER
      </div>

      <div className="title-row">

        <div>

          <h1>
            Electronic Warfare — operational overview
          </h1>

          <p className="page-description">
            Live electromagnetic environment •{" "}
            {loading
              ? "Connecting to backend..."
              : backendError
              ? "Backend connection failed"
              : "Live backend data connected"}
          </p>

        </div>

        {/* CLOCK */}

        <div className="clock-box">

          <Clock3 size={17} />

          <div>

            <strong>
              {currentTime.toLocaleTimeString()}
            </strong>

            <small>
              SYSTEM TIME
            </small>

          </div>

        </div>

      </div>

      {/* ------------------------------------------------
          BACKEND CONNECTION INFO
      ------------------------------------------------ */}

      <div
        style={{
          marginBottom: "18px",
          padding: "10px 14px",
          borderRadius: "10px",
          border: "1px solid #16434d",
          background: "#06171d",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          fontSize: "12px",
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >

          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background:
                backendError
                  ? "#ff4d6d"
                  : "#00e5c3",
              display: "inline-block",
            }}
          />

          <span>
            {backendError
              ? "BACKEND CONNECTION ERROR"
              : loading
              ? "CONNECTING TO BACKEND..."
              : "BACKEND API CONNECTED"}
          </span>

        </div>

        <span
          className="mono"
          style={{
            color: "#64808a",
          }}
        >
          {backendError
            ? "127.0.0.1:8000"
            : "LIVE • SYNC 10s"}
        </span>

      </div>

      {/* ------------------------------------------------
          SYSTEM OVERVIEW
      ------------------------------------------------ */}

      <div className="overview-card">

        <div className="overview-header">

          <div>

            <Activity size={18} />

            <strong>
              EW system overview
            </strong>

          </div>

          <span>
            {systemStatus?.status
              ? systemStatus.status
              : "connecting"}
          </span>

        </div>

        <div className="overview-grid">

          <OverviewItem
            label="Sensors online"
            value={`${sensorsOnline} / ${sensorsTotal}`}
          />

          <OverviewItem
            label="System uptime"
            value={
              systemStatus?.system_uptime ||
              "—"
            }
          />

          <OverviewItem
            label="Active signals"
            value={activeSignals}
          />

          <OverviewItem
            label="Spectrum coverage"
            value={coverage}
          />

          <OverviewItem
            label="Open incidents"
            value={openIncidents}
            warning
          />

          <OverviewItem
            label="Open alerts"
            value={openAlerts}
            danger
          />

        </div>

      </div>

      {/* ------------------------------------------------
          KPI CARDS
      ------------------------------------------------ */}

      <div className="kpi-grid">

        <KPICard
          icon={Radio}
          title="Detected signals"
          value={activeSignals}
          change={
            backendError
              ? "Backend unavailable"
              : "LIVE FROM BACKEND"
          }
        />

        <KPICard
          icon={MapPin}
          title="Spectrum coverage"
          value={coverage}
          change={
            systemStatus
              ? "BACKEND STATUS ACTIVE"
              : "Waiting for backend"
          }
        />

        <KPICard
          icon={AlertTriangle}
          title="Active indicators"
          value={anomaliesDetected}
          change={`${openAlerts} open alerts`}
          danger
        />

        <KPICard
          icon={Clock3}
          title="Avg response time"
          value={`${averageResponse} min`}
          change={
            systemStatus
              ? `${systemStatus.open_incidents ?? 0} open incidents`
              : "Waiting for backend"
          }
        />

      </div>

      {/* ------------------------------------------------
          MAIN GRID
      ------------------------------------------------ */}

      <div className="command-grid">

        {/* MAP */}

        <ElectromagneticMap />

        {/* SIGNAL ACTIVITY */}

        <div className="panel">

          <div className="panel-header">

            <div className="panel-title">

              <Activity size={19} />

              <strong>
                Signal activity
              </strong>

            </div>

            <span className="live-badge">
              BACKEND LIVE
            </span>

          </div>

          <div className="chart">

            {loading ? (

              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64808a",
                }}
              >
                Loading signal data...
              </div>

            ) : backendError ? (

              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ff4d6d",
                }}
              >
                Unable to load signal data
              </div>

            ) : activityData.length === 0 ? (

              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64808a",
                }}
              >
                No signal data available
              </div>

            ) : (

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <AreaChart
                  data={activityData}
                >

                  <defs>

                    <linearGradient
                      id="signalFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#22d3ee"
                        stopOpacity=".25"
                      />

                      <stop
                        offset="100%"
                        stopColor="#22d3ee"
                        stopOpacity="0"
                      />

                    </linearGradient>

                  </defs>

                  <CartesianGrid
                    stroke="#17343d"
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="time"
                    tick={{
                      fill: "#5d7780",
                      fontSize: 9,
                    }}
                  />

                  <YAxis
                    tick={{
                      fill: "#5d7780",
                      fontSize: 9,
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#071820",
                      border:
                        "1px solid #1a4652",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="signals"
                    stroke="#22d3ee"
                    fill="url(#signalFill)"
                  />

                </AreaChart>

              </ResponsiveContainer>

            )}

          </div>

        </div>

        {/* ------------------------------------------------
            ACTIVE ALERTS
        ------------------------------------------------ */}

        <div className="panel alerts-panel">

          <div className="panel-header">

            <div className="panel-title">

              <AlertTriangle size={19} />

              <strong>
                Active alerts
              </strong>

            </div>

            <span className="open-badge">
              {openAlerts} OPEN
            </span>

          </div>

          {loading ? (

            <div
              style={{
                padding: "20px",
                color: "#64808a",
              }}
            >
              Loading alerts from backend...
            </div>

          ) : backendError ? (

            <div
              style={{
                padding: "20px",
                color: "#ff4d6d",
              }}
            >
              Backend alert service unavailable
            </div>

          ) : backendAlerts.length === 0 ? (

            <div
              style={{
                padding: "20px",
                color: "#64808a",
              }}
            >
              No active alerts
            </div>

          ) : (

            backendAlerts.map(
              (alert) => {

                const level =
                  getAlertLevel(
                    alert.severity
                  );

                return (

                  <div
                    className="alert-row"
                    key={alert.id}
                  >

                    <span
                      className={`alert-dot ${level.toLowerCase()}`}
                    />

                    <div>

                      <strong>
                        {alert.category}
                      </strong>

                      <small>
                        {alert.location}
                        {" • "}
                        {alert.status}
                      </small>

                    </div>

                    <span
                      className={`alert-level ${level.toLowerCase()}`}
                    >
                      {level}
                    </span>

                  </div>

                );
              }
            )

          )}

        </div>

      </div>

      {/* ------------------------------------------------
          QUICK STATUS
      ------------------------------------------------ */}

      <div className="quick-status">

        <Status
          title="API"
          value={
            systemStatus?.api === "online"
              ? "ONLINE"
              : "CHECKING"
          }
        />

        <Status
          title="Database"
          value={
            systemStatus?.database ||
            "CHECKING"
          }
        />

        <Status
          title="Telemetry"
          value={
            systemStatus
              ? "NORMAL"
              : "CHECKING"
          }
        />

        <Status
          title="Analytics Engine"
          value={
            systemStatus
              ? "READY"
              : "CHECKING"
          }
        />

      </div>

    </div>
  );
}

// ======================================================
// OVERVIEW ITEM
// ======================================================

function OverviewItem({
  label,
  value,
  warning,
  danger,
}) {
  return (
    <div className="overview-item">

      <i
        className={
          danger
            ? "danger-dot"
            : warning
            ? "warning-dot"
            : ""
        }
      />

      <div>

        <span>
          {label}
        </span>

        <strong className="mono">
          {value}
        </strong>

      </div>

    </div>
  );
}

// ======================================================
// STATUS CARD
// ======================================================

function Status({
  title,
  value,
}) {
  return (
    <div className="status-card">

      <span>
        {title}
      </span>

      <strong>

        <i />

        {value}

      </strong>

    </div>
  );
}

export default CommandCenter;