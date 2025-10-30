export interface IGoogleAnalyticsOptions {
  targetId: string;
  /**
   * See the config options https://developers.google.com/analytics/devguides/collection/ga4/reference/config
   * By default we set:
   *  - send_page_view to false
   *  - cookie_flags to SameSite=None;Secure
   **/
  config?: Record<string, unknown>;
}
