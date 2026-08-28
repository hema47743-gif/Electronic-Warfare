function KPICard({
  icon: Icon,
  title,
  value,
  change,
  danger = false,
}) {
  return (
    <div className="kpi-card">

      <div className="kpi-heading">

        <span>
          {title}
        </span>

        <div className="kpi-icon">
          <Icon size={19} />
        </div>

      </div>

      <div className="kpi-value mono">
        {value}
      </div>

      <div
        className={`kpi-change ${
          danger ? "danger" : ""
        }`}
      >
        {change}
      </div>

    </div>
  );
}

export default KPICard;