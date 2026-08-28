import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./Navbar";

import CommandCenter from "./CommandCenter";
import SpectrumMonitoring from "./SpectrumMonitoring";
import SignalIntelligence from "./SignalIntelligence";
import ThreatMonitoring from "./ThreatMonitoring";
import SensorNetwork from "./SensorNetwork";
import IncidentTimeline from "./IncidentTimeline";
import Analytics from "./Analytics";
import Reports from "./Reports";
import SystemHealth from "./SystemHealth";

import "./App.css";

const BACKEND_URL = "http://127.0.0.1:8000";

function App() {
  const [backendOnline, setBackendOnline] = useState(false);
  const [backendData, setBackendData] = useState(null);

  // ---------------------------------------------------------
  // BACKEND CONNECTION
  // ---------------------------------------------------------

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/`);

        if (!response.ok) {
          throw new Error("Backend not responding");
        }

        const data = await response.json();

        console.log("Backend connected:", data);

        setBackendData(data);
        setBackendOnline(true);
      } catch (error) {
        console.error(
          "Backend connection failed:",
          error
        );

        setBackendOnline(false);
        setBackendData(null);
      }
    };

    checkBackend();

    // Check backend every 10 seconds
    const interval = setInterval(
      checkBackend,
      10000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>

      <div className="app">

        {/* NAVIGATION */}
        <Navbar />

        {/* BACKEND STATUS */}
        <div
          style={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
            zIndex: 9999,
            padding: "10px 16px",
            borderRadius: "10px",
            background: "#06171d",
            border: "1px solid #16434d",
            color: backendOnline
              ? "#00e5c3"
              : "#ff4d6d",
            fontSize: "13px",
            fontWeight: "600",
            letterSpacing: "0.5px",
          }}
        >

          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: backendOnline
                ? "#00e5c3"
                : "#ff4d6d",
              marginRight: "8px",
            }}
          />

          {backendOnline
            ? "BACKEND ONLINE"
            : "BACKEND OFFLINE"}

        </div>

        {/* APPLICATION PAGES */}
        <main>

          <Routes>

            <Route
              path="/"
              element={<CommandCenter />}
            />

            <Route
              path="/spectrum-monitoring"
              element={<SpectrumMonitoring />}
            />

            <Route
              path="/signal-intelligence"
              element={<SignalIntelligence />}
            />

            <Route
              path="/threat-monitoring"
              element={<ThreatMonitoring />}
            />

            <Route
              path="/sensor-network"
              element={<SensorNetwork />}
            />

            <Route
              path="/incident-timeline"
              element={<IncidentTimeline />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="/system-health"
              element={<SystemHealth />}
            />

            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;