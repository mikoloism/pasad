import React from "react";
import "./App.css";

function App(): React.ReactNode {
  const outputInJsonObject = React.useMemo(
    function computeOutput() {
      const date: Date = new Date();
      return {
        "window.pasad": "pasad" in window,
        "Date.property.getTimezoneOffset": date.getTimezoneOffset(),
        "navigator.userAgent": navigator["userAgent"],
        "navigator.hardwareConcurrency": navigator["hardwareConcurrency"],
        // @ts-expect-error the 'deviceMemory' deprecated
        "navigator.deviceMemory": navigator["deviceMemory"],
      };
    },
    [
      navigator["userAgent"],
      navigator["hardwareConcurrency"],
      // @ts-expect-error the 'deviceMemory' deprecated
      navigator["deviceMemory"],
    ]
  );

  const outputInJsonString = React.useMemo(
    function computeOutput() {
      return JSON.stringify(outputInJsonObject, null, 2);
    },
    [outputInJsonObject]
  );

  return (
    <p style={{ textAlign: "start", whiteSpace: "pre-wrap" }}>
      {outputInJsonString}
    </p>
  );
}

export default App;
