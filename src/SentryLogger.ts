const raven =
  typeof window !== "undefined" ? require("raven-js") : require("raven");

export class SentryLogger {
  traceId: string = "";
  sentryEnvironment: string = "";

  constructor(dsn: string, optional: IOptional) {
    raven.config(dsn).install();
    if (optional.traceId !== undefined && optional.traceId !== "") {
      this.traceId = optional.traceId;
    }
    this.sentryEnvironment = optional.environment + "-" + optional.serviceName;
  }

  public error(error: Error): void {
    const tags: ITags = {
      environment: this.sentryEnvironment
    };

    if (this.traceId !== "") {
      tags.trace_id = this.traceId;
    }

    raven.captureException(error, {
      tags,
      level: "error"
    });
  }
}

export interface IOptional {
  traceId?: string;
  serviceName: string;
  environment: string;
}

interface ITags {
  [id: string]: string;
}
