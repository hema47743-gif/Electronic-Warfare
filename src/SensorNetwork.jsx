import {
  useEffect,
  useState,
} from "react";

import {
  Antenna,
} from "lucide-react";

import DataTable from "./DataTable";

import {
  getSensors,
} from "./api";

function SensorNetwork() {
  const [sensors, setSensors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadSensors();

    const interval = setInterval(
      loadSensors,
      10000
    );

    return () =>
      clearInterval(interval);
  }, []);

  async function loadSensors() {
    try {
      const data =
        await getSensors();

      console.log(
        "SENSORS FROM BACKEND:",
        data
      );

      setSensors(
        data.sensors || []
      );

      setError("");
    } catch (error) {
      console.error(
        "Sensor API failed:",
        error
      );

      setError(
        "Unable to load sensors from backend"
      );
    } finally {
      setLoading(false);
    }
  }

  const online =
    sensors.filter(
      (sensor) =>
        sensor.status === "online"
    ).length;

  const offline =
    sensors.filter(
      (sensor) =>
        sensor.status !== "online"
    ).length;

  const averageQuality =
    sensors.length > 0
      ? (
          sensors.reduce(
            (sum, sensor) =>
              sum +
              sensor.signal_quality,
            0
          ) / sensors.length
        ).toFixed(1)
      : 0;

  const columns = [
    {
      key: "id",
      label: "Sensor ID",

      render: (row) => (
        <span className="mono signal-id">
          {row.id}
        </span>
      ),
    },

    {
      key: "name",
      label: "Sensor",
    },

    {
      key: "region",
      label: "Region",
    },

    {
      key: "status",
      label: "Status",

      render: (row) => (
        <span
          className={`sensor-status ${
            row.status
          }`}
        >
          <i />
          {row.status.toUpperCase()}
        </span>
      ),
    },

    {
      key: "signal_quality",
      label: "Signal Quality",

      render: (row) => (
        <span className="mono">
          {row.signal_quality}%
        </span>
      ),
    },

    {
      key: "last_seen",
      label: "Last Seen",

      render: (row) => (
        <span>
          {new Date(
            row.last_seen
          ).toLocaleTimeString()}
        </span>
      ),
    },
  ];

  return (
    <div className="page">

      <div className="eyebrow">
        SENSOR NETWORK
      </div>

      <h1>
        Sensor network
      </h1>

      <p className="page-description">
        Distributed monitoring sensor health
        and telemetry status.
      </p>

      <div className="kpi-grid">

        <div className="mini-stat">
          <span>Online</span>

          <strong className="mono">
            {online}
          </strong>
        </div>

        <div className="mini-stat">
          <span>Offline / Warning</span>

          <strong className="mono">
            {offline}
          </strong>
        </div>

        <div className="mini-stat">
          <span>Total Sensors</span>

          <strong className="mono">
            {sensors.length}
          </strong>
        </div>

        <div className="mini-stat">
          <span>Avg Quality</span>

          <strong className="mono">
            {averageQuality}%
          </strong>
        </div>

      </div>

      {error && (
        <div className="api-error">
          {error}
        </div>
      )}

      <div className="panel page-panel">

        <div className="panel-header">

          <div className="panel-title">

            <Antenna size={19} />

            <strong>
              Sensor status
            </strong>

          </div>

          <span className="count-badge">
            {sensors.length} NODES
          </span>

        </div>

        {loading ? (
          <div className="loading-state">
            Loading sensors from backend...
          </div>
        ) : (
          <DataTable
            data={sensors}
            columns={columns}
          />
        )}

      </div>

    </div>
  );
}

export default SensorNetwork;