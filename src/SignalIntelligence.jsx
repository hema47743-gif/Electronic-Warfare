import {
  useEffect,
  useState,
} from "react";

import {
  Radio,
  Search,
} from "lucide-react";

import DataTable from "./DataTable";

import {
  getSignals,
} from "./api";

function SignalIntelligence() {
  const [signals, setSignals] =
    useState([]);

  const [searchText, setSearchText] =
    useState("");

  const [filter, setFilter] =
    useState("ALL");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ---------------------------------------------------------
  // LOAD FROM BACKEND
  // ---------------------------------------------------------

  useEffect(() => {
    loadSignals();

    const interval = setInterval(
      loadSignals,
      10000
    );

    return () =>
      clearInterval(interval);
  }, []);

  async function loadSignals() {
    try {
      const data =
        await getSignals();

      console.log(
        "SIGNALS FROM BACKEND:",
        data
      );

      setSignals(
        data.signals || []
      );

      setError("");
    } catch (error) {
      console.error(
        "Signal API failed:",
        error
      );

      setError(
        "Unable to connect to signal backend"
      );
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // SEARCH + FILTER
  // ---------------------------------------------------------

  const filteredSignals =
    signals.filter((signal) => {

      const search =
        searchText
          .trim()
          .toLowerCase();

      const matchesSearch =
        !search ||
        signal.id
          .toLowerCase()
          .includes(search) ||
        signal.region
          .toLowerCase()
          .includes(search) ||
        signal.classification
          .toLowerCase()
          .includes(search);

      let matchesFilter = true;

      if (filter === "MONITORED") {
        matchesFilter =
          signal.classification !==
          "Anomalous";
      }

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  // ---------------------------------------------------------
  // TABLE
  // ---------------------------------------------------------

  const columns = [
    {
      key: "id",
      label: "Signal ID",

      render: (row) => (
        <span className="mono signal-id">
          {row.id}
        </span>
      ),
    },

    {
      key: "region",
      label: "Region",
    },

    {
      key: "activity",
      label: "Activity",

      render: (row) => (
        <span className="mono">
          {row.activity}%
        </span>
      ),
    },

    {
      key: "confidence",
      label: "Confidence",

      render: (row) => (
        <span className="mono">
          {row.confidence}%
        </span>
      ),
    },

    {
      key: "classification",
      label: "Classification",

      render: (row) => (
        <span className="table-status">
          <i />
          {row.classification}
        </span>
      ),
    },

    {
      key: "timestamp",
      label: "Updated",

      render: (row) => (
        <span>
          {new Date(
            row.timestamp
          ).toLocaleTimeString()}
        </span>
      ),
    },
  ];

  return (
    <div className="page">

      <div className="eyebrow">
        SIGNAL INTELLIGENCE
      </div>

      <h1>
        Signal intelligence
      </h1>

      <p className="page-description">
        Monitored signal observations and
        classification information.
      </p>

      {/* TOOLBAR */}

      <div className="page-toolbar">

        <div className="search-box">

          <Search size={16} />

          <input
            value={searchText}
            onChange={(event) =>
              setSearchText(
                event.target.value
              )
            }
            placeholder="Search signal ID, region..."
          />

        </div>

        <button
          type="button"
          className={`filter-button ${
            filter === "ALL"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setFilter("ALL")
          }
        >
          All signals
        </button>

        <button
          type="button"
          className={`filter-button ${
            filter === "MONITORED"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setFilter("MONITORED")
          }
        >
          Monitored
        </button>

      </div>

      {/* ERROR */}

      {error && (
        <div className="api-error">
          {error}
        </div>
      )}

      {/* PANEL */}

      <div className="panel">

        <div className="panel-header">

          <div className="panel-title">

            <Radio size={19} />

            <strong>
              Detected signal observations
            </strong>

          </div>

          <span className="count-badge">
            {filteredSignals.length} RESULTS
          </span>

        </div>

        {loading ? (
          <div className="loading-state">
            Loading signals from backend...
          </div>
        ) : (
          <DataTable
            data={filteredSignals}
            columns={columns}
          />
        )}

        {!loading &&
          filteredSignals.length === 0 && (
            <div className="empty-state">
              No signals found.
            </div>
          )}

      </div>

    </div>
  );
}

export default SignalIntelligence;