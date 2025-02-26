import USER_AGENT_SET from "./user-agent.constant";

export interface UserAgentMockReturn {
  userAgent: string;
}

class UserAgentMocker {
  public static originalUserAgent = navigator.userAgent;

  public static userAgents = USER_AGENT_SET;

  public static mock(userAgent: string): UserAgentMockReturn {
    Object.defineProperty(window.navigator, "userAgent", {
      value: userAgent,
      writable: false,
      configurable: true,
    });
    return { userAgent };
  }

  public static mockRandom() {
    const randomUserAgent = this.getRandomElement(this.userAgents);
    return this.mock(randomUserAgent);
  }

  public static restore() {
    this.mock(this.originalUserAgent);
  }

  public static getRandomElement(arr: Array<string>) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

export default UserAgentMocker;
export { UserAgentMocker };
