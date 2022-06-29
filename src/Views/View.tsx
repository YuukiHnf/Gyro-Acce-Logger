import { useState, VFC } from "react";
import { useOrientation } from "../Hooks/useOrientation";
import { useFormText } from "../Hooks/useForm";

type StateLoggerProps = {
  title: string;
  value: number | null;
};

const StateLogger = ({ title, value }: StateLoggerProps) => {
  return <div>{`【${title}】 ${value ?? "none"}`}</div>;
};

export const View = () => {
  const [record, setRecord] = useState(false);
  // record
  const [realData, setRealData] = useState<{
    orientLog: {
      alpha: number | null;
      beta: number | null;
      gamma: number | null;
      time: number;
    }[];
    acceLog: {
      x: number | null;
      y: number | null;
      z: number | null;
      time: number;
    }[];
  }>({ orientLog: [], acceLog: [] });
  // title
  const [title, setTitle] = useState("");

  // post
  const { postForm } = useFormText();

  // data
  const { acce, orient, acceLog, orientLog, handleReset } = useOrientation(
    record
  );

  const handleSave = () => {
    const acceText = realData.acceLog
      .map((log) => `${log.x},${log.y},${log.z},${log.time},`)
      .join("\n");
    const orientText = realData.orientLog
      .map((log) => `${log.alpha},${log.beta},${log.gamma},${log.time},`)
      .join("\n");
    //window.alert(orientText);
    postForm(title, acceText, orientText);
  };

  const handleRecord = () => {
    if (record) {
      setRecord(false);
      setRealData({ orientLog: orientLog, acceLog: acceLog });
    } else {
      setRecord(true);
      handleReset();
      setRealData({ orientLog: [], acceLog: [] });
    }
  };

  return (
    <>
      <StateLogger title="AcceX" value={acce ? acce?.x : null} />{" "}
      <StateLogger title="AcceY" value={acce ? acce?.y : null} />{" "}
      <StateLogger title="AcceZ" value={acce ? acce?.z : null} />{" "}
      <StateLogger title="Alpha" value={orient ? orient.alpha : null} />{" "}
      <StateLogger title="Beta" value={orient ? orient.beta : null} />{" "}
      <StateLogger title="Gamma" value={orient ? orient.gamma : null} />{" "}
      <button onClick={handleRecord}>
        {" "}
        {record ? "計測を止める" : "計測を始める"}{" "}
      </button>
      <button onClick={handleReset}>データをリセットする</button>
      {record ? (
        <div style={{ height: "50%", display: "flex", overflowX: "scroll" }}>
          <h6>{`加速度LoG 計${acceLog.length}`}</h6>
          <div
            style={{
              height: "500px",
              width: "50%",
              overflow: "scroll"
            }}
          >
            <ul style={{ overflowY: "scroll" }}>
              {acceLog.map((log) => (
                <li
                  key={`${log.time}acce`}
                >{`x:${log.x}, y:${log.y}, z:${log.z} @ ${log.time}`}</li>
              ))}
            </ul>
          </div>
          <h6>{`ジャイロLoG 計${orientLog.length}`}</h6>
          <div style={{ height: "500px", width: "50%", overflowX: "scroll" }}>
            <ul style={{ overflowY: "scroll" }}>
              {orientLog.map((log) => (
                <li
                  key={`${log.time}orient`}
                >{`alpha:${log.alpha}, beta:${log.beta}, gamma:${log.gamma} @ ${log.time}`}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <h4>計測済データ</h4>
          <h6>{`加速度LoG 計${realData.acceLog.length}`}</h6>
          <textarea
            value={realData.acceLog
              .map((log) => `${log.x},${log.y},${log.z},${log.time},`)
              .join("\n")}
          />
          <h6>{`ジャイロLoG 計${realData.orientLog.length}`}</h6>
          <textarea
            value={realData.orientLog
              .map(
                (log) => `${log.alpha},${log.beta},${log.gamma},${log.time},`
              )
              .join("\n")}
          />
          <br />
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
          <button onClick={handleSave}>保存する</button>
        </>
      )}
    </>
  );
};
