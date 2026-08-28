import { AlertTriangle, ChevronRight } from 'lucide-react'

const severityClass = {
  critical: 'badge-red',
  high: 'badge-amber',
  medium: 'badge-cyan',
  low: 'badge-green',
}

export default function AlertPanel({ alerts = [] }) {
  return (
    <div className="panel alert-panel">
      <div className="panel-head">
        <p className="panel-title">
          <AlertTriangle size={16} />
          Active alerts
        </p>

        <span className="badge badge-red">
          {alerts.length} open
        </span>
      </div>

      <div className="alert-list">
        {alerts.map((alert) => (
          <div className="alert-item" key={alert.id}>
            <div className="alert-item-top">
              <span
                className={`badge ${severityClass[alert.sev] || 'badge-gray'}`}
              >
                {alert.sev}
              </span>

              <span className="alert-arrow">
                <ChevronRight size={14} />
              </span>
            </div>

            <div className="alert-title">
              {alert.title}
            </div>

            <div className="alert-meta">
              {alert.meta}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}