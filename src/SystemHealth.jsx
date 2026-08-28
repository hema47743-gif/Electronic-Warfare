import {
  Activity,
  Database,
  Server,
  Wifi,
} from "lucide-react";

import { systemHealth } from "./mockData";

function SystemHealth() {
  return (
    <div className="page">

      <div className="eyebrow">
        SYSTEM HEALTH
      </div>

      <h1>
        System health
      </h1>

      <p className="page-description">
        Infrastructure and monitoring platform health.
      </p>

      <div className="health-grid">

        <HealthCard
          icon={Server}
          title="Processing cluster"
          value="99.6%"
        />

        <HealthCard
          icon={Database}
          title="Data services"
          value="99.9%"
        />

        <HealthCard
          icon={Wifi}
          title="Network"
          value="98.8%"
        />

        <HealthCard
          icon={Activity}
          title="Telemetry"
          value="99.2%"
        />

      </div>

      <div className="panel page-panel">

        <div className="panel-header">
          <strong>
            Platform health metrics
          </strong>
        </div>

        <div className="health-list">

          {systemHealth.map((item) => (

            <div
              className="health-row"
              key={item.name}
            >

              <div>

                <strong>
                  {item.name}
                </strong>

                <span>
                  Operational
                </span>

              </div>

              <div className="health-progress">

                <div>
                  <span
                    style={{
                      width: `${item.value}%`,
                    }}
                  />
                </div>

                <strong className="mono">
                  {item.value}%
                </strong>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

function HealthCard({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="health-card">

      <div className="health-icon">
        <Icon size={19} />
      </div>

      <span>{title}</span>

      <strong className="mono">
        {value}
      </strong>

      <small>
        ● OPERATIONAL
      </small>

    </div>
  );
}

export default SystemHealth;