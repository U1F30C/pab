import { head } from "lodash";
import { AlertManager } from "react-alert";
import { ErrorReasons } from "./error-reasons";

export interface ApiErrorFormat {
  errors: { error: string }[];
}

export function displayError(errorFormat: ApiErrorFormat, alert: AlertManager) {
  let message = ErrorReasons.Unknown;
  const errorObject = head(errorFormat.errors);
  if (errorObject && ErrorReasons[errorObject.error]) {
    message = ErrorReasons[errorObject.error];
  }
  alert.error(message);
}
