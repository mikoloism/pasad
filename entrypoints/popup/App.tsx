import React from "react";
import "./App.css";

import HardwareMocker, {
  type HardwareMockReturn,
} from "../../packages/hardware/mod";
import TimeZoneMocker, {
  type TimeZoneMockReturn,
} from "../../packages/timezone/mod";
import UserAgentMocker, {
  type UserAgentMockReturn,
} from "../../packages/user-agent/mod";

interface Props {}

interface State {
  hardware: HardwareMockReturn | undefined;
  timeZone: TimeZoneMockReturn | undefined;
  userAgent: UserAgentMockReturn | undefined;
}

class App extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      hardware: undefined,
      timeZone: undefined,
      userAgent: undefined,
    };
  }

  public componentDidMount(): void {
    const hardware = HardwareMocker.mockRandom();
    const timeZone = TimeZoneMocker.mockRandom();
    const userAgent = UserAgentMocker.mockRandom();
    this.setState({ hardware, timeZone, userAgent });
  }

  public render(): React.ReactNode {
    return (
      <section>
        <MockedOutput />
      </section>
    );
  }
}

function MockedOutput(): React.ReactNode {
  const outputInJsonFormat = React.useMemo(
    function computeOutput() {
      const date: Date = new Date();
      return {
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

  return <output>{JSON.stringify(outputInJsonFormat, null, 2)}</output>;
}

export default App;
