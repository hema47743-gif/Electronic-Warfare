import {
  useEffect,
  useState,
} from "react";

import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Radio,
} from "lucide-react";

import {
  getIncidents,
} from "./api";

function IncidentTimeline() {
  const [incidents, setIncidents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadIncidents();

    const interval = setInterval(
      loadIncidents,
      10000
    );

    return () =>
      clearInterval(interval);
  }, []);

  async function loadIncidents() {
    try {
      const data =
        await getIncidents();

      console.log(
        "INCIDENTS FROM BACKEND:",
        data
      );

      setIncidents(
        data.incidents || []
      );

      setError("");
    } catch (error) {
      console.error(
        "Incident API failed:",
        error
      );

      setError(
        "Unable to load incidents from backend"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">

      <div className="eyebrow">
        INCIDENT TIMELINE
      </div>

      <h1>
        Incident timeline
      </h1>

      <p className="page-description">
        Chronological view of monitoring
        and alert events.
      </p>

      {error && (
        <div className="api-error">
          {error}
        </div>
      )}

      <div className="panel page-panel">

        <div className="panel-header">

          <div className="panel-title">

            <Activity size={19} />

            <strong>
              Today's events
            </strong>

          </div>

          <span className="live-badge">
            LIVE
          </span>

        </div>

        {loading ? (
          <div className="loading-state">
            Loading incidents from backend...
          </div>
        ) : (
          <div className="timeline">

            {incidents.map(
              (item) => (

                <div
                  className="timeline-item"
                  key={item.id}
                >

                  <div className="timeline-line" />

                  <div className="timeline-icon">

                    {item.severity ===
                      "high" && (
                      <AlertTriangle
                        size={16}
                      />
                    )}

                    {item.severity ===
                      "medium" && (
                      <Radio
                        size={16}
                      />
                    )}

                    {item.severity !==
                      "high" &&
                      item.severity !==
                        "medium" && (
                        <CheckCircle2
                          size={16}
                        />
                      )}

                  </div>

                  <div className="timeline-content">

                    <div className="timeline-top">

                      <span className="mono">
                        {new Date(
                          item.created_at
                        ).toLocaleTimeString()}
                      </span>

                      <span className="timeline-type">
                        {item.severity.toUpperCase()}
                      </span>

                    </div>

                    <strong>
                      {item.title}
                    </strong>

                    <small>
                      {item.region}
                    </small>

                  </div>

                  <span className="timeline-status">
                    {item.status.toUpperCase()}
                  </span>

                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default IncidentTimeline;