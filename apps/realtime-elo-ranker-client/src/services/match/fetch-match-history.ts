import { PlayerData } from "@realtime-elo-ranker/libs/ui";

const URL = "/api/match/history";

export default function fetchMatchHistory(baseUrl: string): Promise<
  {
    winner: string | undefined;
    loser: string | undefined;
  }[]
> {
  return fetch(baseUrl + URL, { method: "GET" }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Failed to fetch match history");
  });
}
