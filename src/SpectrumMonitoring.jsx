import {
  useEffect,
  useState,
} from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Signal,
} from "lucide-react";

import {
  getSpectrum,
} from "./api";

function SpectrumMonitoring() {
  const [spectrum, setSpectrum] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadSpectrum();

    const interval = setInterval(
      loadSpectrum,
      10000
    );

    return () =>
      clearInterval(interval);
  }, []);

  async function loadSpectrum() {
    try {
      const data =
        await getSpectrum();

      console.log(
        "SPECTRUM FROM BACKEND:",
        data
      );

      setSpectrum(
        data.bands || []
      );

      setError("");
    } catch (error) {
      console.error(
        "Spectrum API failed:",
        error
      );

      setError(
        "Unable to load spectrum from backend"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="SPECTRUM MONITORING"
      title="RF spectrum monitoring"
      description="Live visualization of monitored electromagnetic activity"
    >

      <div className="kpi-grid">

        <MiniStat
          title="Monitored Bandwidth"
          value="1.8 GHz"
        />

        <MiniStat
          title="Detected Signals"
          value="247"
        />

        <MiniStat
          title="Active Bands"
          value={spectrum.length}
        />

        <MiniStat
          title="Coverage"
          value="96.8%"
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

            <Signal size={19} />

            <strong>
              Frequency activity
            </strong>

          </div>

          <span className="live-badge">
            LIVE
          </span>

        </div>

        <div className="large-chart">

          {loading ? (
            <div className="loading-state">
              Loading spectrum from backend...
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={spectrum}
              >

                <CartesianGrid
                  stroke="#17343d"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="band"
                  tick={{
                    fill: "#64808a",
                    fontSize: 10,
                  }}
                />

                <YAxis
                  tick={{
                    fill: "#64808a",
                    fontSize: 10,
                  }}
                />

                <Tooltip
                  contentStyle={{
                    background:
                      "#071820",
                    border:
                      "1px solid #1b4652",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="activity"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  dot={false}
                />

              </LineChart>

            </ResponsiveContainer>
          )}

        </div>

      </div>

      <div className="two-column">

        <InfoPanel
          title="Band utilization"
          items={
            spectrum.map(
              (band) => [
                band.band,
                `${band.occupancy}%`,
              ]
            )
          }
        />

        <InfoPanel
          title="Monitoring status"
          items={
            spectrum.map(
              (band) => [
                band.band,
                band.status.toUpperCase(),
              ]
            )
          }
        />

      </div>

    </PageShell>
  );
}

function MiniStat({
  title,
  value,
}) {
  return (
    <div className="mini-stat">

      <span>
        {title}
      </span>

      <strong className="mono">
        {value}
      </strong>

    </div>
  );
}

function InfoPanel({
  title,
  items,
}) {
  return (
    <div className="panel info-panel">

      <div className="panel-header">
        <strong>
          {title}
        </strong>
      </div>

      <div className="info-list">

        {items.map(
          ([name, value]) => (

            <div key={name}>

              <span>
                {name}
              </span>

              <strong className="mono">
                {value}
              </strong>

            </div>

          )
        )}

      </div>

    </div>
  );
}

function PageShell({
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <div className="page">

      <div className="eyebrow">
        {eyebrow}
      </div>

      <h1>
        {title}
      </h1>

      <p className="page-description">
        {description}
      </p>

      {children}

    </div>
  );
}

export default SpectrumMonitoring;