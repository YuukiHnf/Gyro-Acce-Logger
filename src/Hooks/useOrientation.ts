import { useCallback, useEffect, useState } from "react";

export const useOrientation = (record: boolean) => {
  // state
  //const [record, setRecord] = useState<boolean>(false);

  // ptrData
  const [acce, setAcce] = useState<
    { x: number | null; y: number | null; z: number | null } | undefined
  >(undefined);
  const [orient, setOrient] = useState<
    | { alpha: number | null; beta: number | null; gamma: number | null }
    | undefined
  >(undefined);

  // Logger
  const [acceLog, setAcceLog] = useState<
    { x: number | null; y: number | null; z: number | null; time: number }[]
  >([]);
  const [orientLog, setOrientLog] = useState<
    {
      alpha: number | null;
      beta: number | null;
      gamma: number | null;
      time: number;
    }[]
  >([]);

  const handleSetAcce = (log: {
    x: number | null;
    y: number | null;
    z: number | null;
  }) => {
    // if (_record) {
    setAcceLog((state) => [...state, { ...log, time: Date.now() }]);
    // }
    setAcce(log);
  };

  const handleSetOrieint = (
    log: {
      alpha: number | null;
      beta: number | null;
      gamma: number | null;
    },
    _record: boolean
  ) => {
    if (_record) {
      setOrientLog((state) => [...state, { ...log, time: Date.now() }]);
    }
    setOrient(log);
  };

  const handleReset = () => {
    setOrientLog([]);
    setAcceLog([]);
  };

  const acceFunc = useCallback(
    (event: DeviceMotionEvent) => {
      handleSetAcce({
        x: event.acceleration?.x ?? null,
        y: event.acceleration?.y ?? null,
        z: event.acceleration?.z ?? null
      });
      console.log(record);
    },
    [record]
  );

  const orientFunc = (event: any) => {
    handleSetOrieint(
      {
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      },
      record
    );
  };
  console.log(record);
  useEffect(() => {
    if (record) {
      // 加速度
      window.addEventListener("devicemotion", acceFunc);
      // 向き
      window.addEventListener("deviceorientationabsolute", orientFunc);
    } else {
      // 加速度
      window.removeEventListener("devicemotion", acceFunc);
      // 向き
      window.removeEventListener("deviceorientationabsolute", orientFunc);
    }
  }, [record]);

  return {
    acce,
    orient,
    acceLog,
    orientLog,
    handleReset
  };
};
