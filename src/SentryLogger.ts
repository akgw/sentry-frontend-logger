const raven =
  typeof window !== "undefined" ? require("raven-js") : require("raven");

export class SentryLogger {
  traceId: string = "";

  constructor(dsn: string, config: IConfig) {
    if (config.traceId !== undefined && config.traceId !== "") {
      this.traceId = config.traceId;
    }

    raven.config(dsn, {
      environment: config.environment + "-" + config.serviceName
    }).install();
  }

  public error(error: Error): void {
    const tags: ITags = {};

    if (this.traceId !== "") {
      tags.trace_id = this.traceId;
    }

    raven.captureException(error, {
      tags,
      level: "error"
    });
  }
}

export interface IConfig {
  traceId?: string;
  serviceName: string;
  environment: string;
}

interface ITags {
  [id: string]: string;
}
