const URL = "/api/match/history/events";

export default function subscribeMatchEvents(baseUrl: string): EventSource {
  // Subscribe to ranking events
  // ...
  return new EventSource(baseUrl + URL);
}
