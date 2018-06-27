const raven =
  typeof window !== "undefined" ? require("raven-js") : require("raven");

export class SentryLogger {
  traceId: string = "";

  constructor(dsn: string, optional: IOptional) {
    if (optional.traceId !== undefined && optional.traceId !== "") {
      this.traceId = optional.traceId;
    }

    raven.config(dsn, {
      environment: optional.environment + "-" + optional.serviceName
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

export interface IOptional {
  traceId?: string;
  serviceName: string;
  environment: string;
}

interface ITags {
  [id: string]: string;
}
