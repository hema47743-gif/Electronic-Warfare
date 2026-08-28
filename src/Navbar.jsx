import {
  Antenna,
  BarChart3,
  Bell,
  Clock3,
  LayoutDashboard,
  Radio,
  Radar,
  Search,
  Shield,
  X,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import { getAlerts } from "./api";

function Navbar() {
  const location = useLocation();

  const [alerts, setAlerts] = useState([]);
  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showSearch, setShowSearch] =
    useState(false);

  const [searchText, setSearchText] =
    useState("");

  const items = [
    {
      name: "Command Center",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Spectrum Monitoring",
      path: "/spectrum-monitoring",
      icon: Radar,
    },
    {
      name: "Signal Intelligence",
      path: "/signal-intelligence",
      icon: Radio,
    },
    {
      name: "Threat Monitoring",
      path: "/threat-monitoring",
      icon: Shield,
    },
    {
      name: "Sensor Network",
      path: "/sensor-network",
      icon: Antenna,
    },
    {
      name: "Incident Timeline",
      path: "/incident-timeline",
      icon: Clock3,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
  ];

  // ---------------------------------------------------------
  // LOAD ALERTS FROM BACKEND
  // ---------------------------------------------------------

  useEffect(() => {
    loadAlerts();

    const interval = setInterval(
      loadAlerts,
      10000
    );

    return () => clearInterval(interval);
  }, []);

  async function loadAlerts() {
    try {
      const data = await getAlerts();

      console.log(
        "NAVBAR ALERTS FROM BACKEND:",
        data
      );

      setAlerts(data.alerts || []);
    } catch (error) {
      console.error(
        "Navbar alert API failed:",
        error
      );
    }
  }

  // ---------------------------------------------------------
  // NAVBAR SEARCH
  // ---------------------------------------------------------

  function handleSearchKeyDown(event) {
    if (event.key === "Enter") {
      const value = searchText
        .trim()
        .toLowerCase();

      if (!value) return;

      if (
        value.includes("signal") ||
        value.includes("sig")
      ) {
        window.location.href =
          "/signal-intelligence";
      } else if (
        value.includes("spectrum")
      ) {
        window.location.href =
          "/spectrum-monitoring";
      } else if (
        value.includes("sensor")
      ) {
        window.location.href =
          "/sensor-network";
      } else if (
        value.includes("threat") ||
        value.includes("alert")
      ) {
        window.location.href =
          "/threat-monitoring";
      } else if (
        value.includes("incident")
      ) {
        window.location.href =
          "/incident-timeline";
      } else if (
        value.includes("analytics")
      ) {
        window.location.href =
          "/analytics";
      }
    }
  }

  function closePopups() {
    setShowNotifications(false);
    setShowSearch(false);
  }

  return (
    <header className="navbar">

      {/* BRAND */}

      <div className="brand">

        <Link
          to="/"
          className="brand-link"
          onClick={closePopups}
        >

          <div className="brand-logo">
            <Shield size={23} />
          </div>

          <div>

            <div className="brand-name">
              SENTINEL
            </div>

            <div className="brand-subtitle">
              ELECTRONIC WARFARE • COMMAND CENTER
            </div>

          </div>

        </Link>

      </div>

      {/* NAVIGATION */}

      <nav className="nav-menu">

        {items.map(
          ({
            name,
            path,
            icon: Icon,
          }) => {

            const isActive =
              location.pathname === path;

            return (
              <Link
                key={name}
                to={path}
                className={`nav-link ${
                  isActive
                    ? "active"
                    : ""
                }`}
              >

                <Icon size={16} />

                <span>
                  {name}
                </span>

              </Link>
            );
          }
        )}

      </nav>

      {/* RIGHT SIDE */}

      <div className="nav-right">

        {/* SEARCH */}

        <button
          className="nav-icon"
          type="button"
          onClick={() => {
            setShowSearch(
              !showSearch
            );

            setShowNotifications(false);
          }}
          title="Search"
        >
          {showSearch ? (
            <X size={18} />
          ) : (
            <Search size={18} />
          )}
        </button>

        {/* SEARCH PANEL */}

        {showSearch && (
          <div className="navbar-search-panel">

            <Search size={16} />

            <input
              autoFocus
              value={searchText}
              onChange={(event) =>
                setSearchText(
                  event.target.value
                )
              }
              onKeyDown={
                handleSearchKeyDown
              }
              placeholder="Search pages..."
            />

          </div>
        )}

        {/* NOTIFICATIONS */}

        <button
          className="nav-icon notification"
          type="button"
          onClick={() => {
            setShowNotifications(
              !showNotifications
            );

            setShowSearch(false);
          }}
          title="Notifications"
        >

          <Bell size={18} />

          {alerts.length > 0 && (
            <span>
              {alerts.length}
            </span>
          )}

        </button>

        {/* NOTIFICATION DROPDOWN */}

        {showNotifications && (
          <div className="notification-dropdown">

            <div className="notification-header">

              <div>
                <strong>
                  Notifications
                </strong>

                <small>
                  Live backend alerts
                </small>
              </div>

              <span>
                {alerts.length}
              </span>

            </div>

            <div className="notification-list">

              {alerts.length === 0 ? (
                <div className="notification-empty">
                  No active alerts
                </div>
              ) : (
                alerts.map((alert) => (

                  <div
                    className="notification-item"
                    key={alert.id}
                  >

                    <div
                      className={`notification-dot ${
                        alert.severity
                      }`}
                    />

                    <div className="notification-content">

                      <strong>
                        {alert.category}
                      </strong>

                      <span>
                        {alert.location}
                      </span>

                      <small>
                        {alert.description}
                      </small>

                      <small>
                        {alert.status.toUpperCase()}
                      </small>

                    </div>

                  </div>

                ))
              )}

            </div>

            <Link
              to="/threat-monitoring"
              className="notification-footer"
              onClick={() =>
                setShowNotifications(false)
              }
            >
              View all alerts →
            </Link>

          </div>
        )}

        {/* SYSTEM STATUS */}

        <div className="online-status">

          <i />

          SYSTEM ONLINE

        </div>

      </div>

    </header>
  );
}

export default Navbar;