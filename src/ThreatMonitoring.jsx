import {
  useEffect,
  useState,
} from "react";

import {
  AlertTriangle,
  ShieldAlert,
  Activity,
} from "lucide-react";

import {
  getAlerts,
} from "./api";

function ThreatMonitoring() {
  const [alerts, setAlerts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadAlerts();

    const interval = setInterval(
      loadAlerts,
      10000
    );

    return () =>
      clearInterval(interval);
  }, []);

  async function loadAlerts() {
    try {
      const data =
        await getAlerts();

      console.log(
        "THREATS FROM BACKEND:",
        data
      );

      setAlerts(
        data.alerts || []
      );

      setError("");
    } catch (error) {
      console.error(
        "Alert API failed:",
        error
      );

      setError(
        "Unable to load alerts from backend"
      );
    } finally {
      setLoading(false);
    }
  }

  const highPriority =
    alerts.filter(
      (item) =>
        item.severity === "high"
    ).length;

  const openAlerts =
    alerts.filter(
      (item) =>
        item.status === "open"
    ).length;

  return (
    <div className="page">

      <div className="eyebrow">
        THREAT MONITORING
      </div>

      <h1>
        Threat monitoring
      </h1>

      <p className="page-description">
        Defensive monitoring of anomalous
        electromagnetic activity and system alerts.
      </p>

      <div className="kpi-grid">

        <ThreatStat
          icon={ShieldAlert}
          title="Active indicators"
          value={alerts.length}
          danger
        />

        <ThreatStat
          icon={AlertTriangle}
          title="High priority"
          value={highPriority}
        />

        <ThreatStat
          icon={Activity}
          title="Open alerts"
          value={openAlerts}
        />

        <ThreatStat
          icon={ShieldAlert}
          title="Backend alerts"
          value={alerts.length}
        />

      </div>

      {error && (
        <div className="api-error">
          {error}
        </div>
      )}

      <div className="panel page-panel">

        <div className="panel-header">

          <div className="panel-title">

            <AlertTriangle size={19} />

            <strong>
              Current threat indicators
            </strong>

          </div>

          <span className="open-badge">
            {openAlerts} OPEN
          </span>

        </div>

        {loading ? (
          <div className="loading-state">
            Loading alerts from backend...
          </div>
        ) : (
          <div className="threat-list">

            {alerts.map((item) => (

              <div
                className="threat-row"
                key={item.id}
              >

                <div
                  className={`severity-dot ${
                    item.severity
                  }`}
                />

                <div className="threat-main">

                  <strong>
                    {item.category}
                  </strong>

                  <span>
                    {item.location}
                    {" • "}
                    {item.status}
                  </span>

                  <small>
                    {item.description}
                  </small>

                </div>

                <span
                  className={`severity ${
                    item.severity
                  }`}
                >
                  {item.severity.toUpperCase()}
                </span>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

function ThreatStat({
  icon: Icon,
  title,
  value,
  danger,
}) {
  return (
    <div className="mini-stat">

      <div className="mini-icon">
        <Icon size={18} />
      </div>

      <span>
        {title}
      </span>

      <strong
        className={`mono ${
          danger
            ? "red-value"
            : ""
        }`}
      >
        {value}
      </strong>

    </div>
  );
}

export default ThreatMonitoring;