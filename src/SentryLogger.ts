import * as util from "util";
import * as RavenJs from "raven-js";

export interface IOptional {
  traceId: string | undefined;
  serviceName: string;
  environment: string;
}

interface ITags {
  [id: string]: string;
}

export class SentryLogger {
  traceId = "";
  sentryEnvironment = "";

  constructor(uri: string, optional: IOptional) {
    RavenJs.config(uri).install();

    if (optional.traceId !== undefined && optional.traceId !== "") {
      this.traceId = optional.traceId;
    }
    this.sentryEnvironment = optional.environment + "-" + optional.serviceName;
  }

  info(value: any): void {
    const context = SentryLogger.createContext(value);

    const tags: ITags = {
      environment: this.sentryEnvironment
    };

    if (this.traceId !== "") {
      tags.trace_id = this.traceId;
    }

    RavenJs.captureException(context, {
      tags,
      level: "info"
    });
  }

  error(value: any): void {
    const context = SentryLogger.createContext(value);

    const tags: ITags = {
      environment: this.sentryEnvironment
    };

    if (this.traceId !== "") {
      tags.trace_id = this.traceId;
    }

    RavenJs.captureException(context, {
      tags,
      level: "error"
    });
  }

  private static createContext(value: any): string {
    return `${util.inspect(value, false, null)}`;
  }
}
