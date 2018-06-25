import { SentryLogger } from "../src/SentryLogger";

jest.mock("raven", () => {
  return {
    config: jest.fn(() => ({
      install: jest.fn()
    })),
    captureException: jest.fn()
  };
});

jest.mock("raven-js", () => {
  return {
    config: jest.fn(() => ({
      install: jest.fn()
    })),
    captureException: jest.fn()
  };
});

describe("SentryLogger", () => {
  it("that the error does not occur", async () => {
    const optional = {
      traceId: "test-trace-id",
      serviceName: "dummy-service-name",
      environment: "test"
    };

    const logger = new SentryLogger("dsn", optional);
    logger.error(new Error("test-error"));
  });
});
