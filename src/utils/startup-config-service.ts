class AppConfigurationService {
  get(configKey: string, defaultValue?: string): string {
    return process.env[configKey] || defaultValue;
  }
}
const appConfig = new AppConfigurationService();

export { AppConfigurationService, appConfig };
