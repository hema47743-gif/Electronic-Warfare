import { MapPin, Radio, Radar } from "lucide-react";

function ElectromagneticMap() {
  return (
    <div className="panel">

      <div className="panel-header">

        <div className="panel-title">
          <Radar size={19} />

          <div>
            <strong>
              Electromagnetic Environment
            </strong>

            <small>
              LIVE SENSOR COVERAGE
            </small>
          </div>
        </div>

        <span className="live-badge">
          LIVE
        </span>

      </div>

      <div className="ew-map">

        <div className="map-lines" />

        <div className="radar r1" />
        <div className="radar r2" />
        <div className="radar r3" />

        <div className="map-cross vertical" />
        <div className="map-cross horizontal" />

        <div className="sweep" />

        <MapNode
          left="25%"
          top="27%"
          label="EW-001"
        />

        <MapNode
          left="67%"
          top="29%"
          label="EW-014"
        />

        <MapNode
          left="59%"
          top="68%"
          label="EW-022"
          danger
        />

        <MapNode
          left="31%"
          top="67%"
          label="EW-018"
        />

        <div className="map-center">
          <Radio size={17} />
        </div>

        <div className="map-direction north">
          N
        </div>

        <div className="map-direction east">
          E
        </div>

        <div className="map-grid-label">
          GRID ALPHA-07
        </div>

        <div className="map-info">

          <div>
            <i className="cyan" />
            Sensor Node
          </div>

          <div>
            <i className="red" />
            High Activity
          </div>

          <div>
            <i className="yellow" />
            Medium Activity
          </div>

          <div className="coverage">
            Coverage
            <strong>94.8%</strong>
          </div>

        </div>

      </div>

    </div>
  );
}

function MapNode({
  left,
  top,
  label,
  danger = false,
}) {
  return (
    <div
      className={`map-node ${
        danger ? "danger-node" : ""
      }`}
      style={{ left, top }}
    >
      <div />
      <span>{label}</span>
    </div>
  );
}

export default ElectromagneticMap;