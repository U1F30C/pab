import { AlertManager } from "react-alert";

export function displaySuccess(message: string, alert: AlertManager) {
  alert.success(message);
}
