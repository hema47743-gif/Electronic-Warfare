import {
  Download,
  FileText,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { reportData } from "./mockData";

function Reports() {
  return (
    <div className="page">

      <div className="eyebrow">
        REPORTS
      </div>

      <h1>
        Electronic warfare reports
      </h1>

      <p className="page-description">
        Operational summaries and system monitoring reports.
      </p>

      <div className="reports-grid">

        {reportData.map((item) => (

          <div
            className="report-card"
            key={item.report}
          >

            <div className="report-icon">
              <FileText size={21} />
            </div>

            <div className="report-info">

              <strong>
                {item.report}
              </strong>

              <span>
                {item.date}
              </span>

            </div>

            <div className="report-status">

              {item.status === "READY" ? (
                <CheckCircle2 size={15} />
              ) : (
                <Clock3 size={15} />
              )}

              {item.status}

            </div>

            <button className="download-button">
              <Download size={15} />
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Reports;