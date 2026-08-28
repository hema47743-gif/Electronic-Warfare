import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { BarChart3 } from "lucide-react";

import { activityData } from "./mockData";

function Analytics() {
  return (
    <div className="page">

      <div className="eyebrow">
        ANALYTICS
      </div>

      <h1>
        Electronic warfare analytics
      </h1>

      <p className="page-description">
        Operational trends and monitoring statistics.
      </p>

      <div className="kpi-grid">

        <Mini
          name="Signals / day"
          value="2,847"
        />

        <Mini
          name="Avg response"
          value="4.2 min"
        />

        <Mini
          name="Coverage"
          value="94.8%"
        />

        <Mini
          name="Detection accuracy"
          value="96.2%"
        />

      </div>

      <div className="panel page-panel">

        <div className="panel-header">

          <div className="panel-title">

            <BarChart3 size={19} />

            <strong>
              Signal activity trend
            </strong>

          </div>

        </div>

        <div className="large-chart">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={activityData}
            >

              <defs>

                <linearGradient
                  id="activity"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#22d3ee"
                    stopOpacity=".28"
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
                  background: "#071820",
                  border: "1px solid #1b4652",
                }}
              />

              <Area
                type="monotone"
                dataKey="signals"
                stroke="#22d3ee"
                fill="url(#activity)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

function Mini({ name, value }) {
  return (
    <div className="mini-stat">
      <span>{name}</span>
      <strong className="mono">
        {value}
      </strong>
    </div>
  );
}

export default Analytics;