"use client";
import { PlayerData, RankingLadder } from "@realtime-elo-ranker/libs/ui";
import { Poppins } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import fetchRanking from "../services/ranking/fetch-ranking";
import subscribeRankingEvents from "../services/ranking/subscribe-ranking-events";
import { RankingEvent, RankingEventType } from "../services/ranking/models/ranking-event";

const poppinsBold = Poppins({
  weight: "600",
  style: "normal",
  variable: "--poppins-bold",
});

export default function Home() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined");
  }

  const [ladderData, setLadderData] = useState<PlayerData[]>([]);

  const updateLadderData = useCallback((player: PlayerData) => {
    setLadderData((prevData) => {
      return prevData.map((p) => {
        if (p.id === player.id) {
          return player;
        }
        return p;
      }).sort((a, b) => b.rank - a.rank);
    });
  }, []);

  useEffect(() => {
    fetchRanking(API_BASE_URL).then(setLadderData);
    const eventSource = subscribeRankingEvents(API_BASE_URL);
    eventSource.onmessage = (msg: MessageEvent) => {
      const event: RankingEvent = JSON.parse(msg.data);
      if (event.type === "Error") {
        console.error(event.message);
        return;
      }
      if (event.type === RankingEventType.RankingUpdate) {
        updateLadderData(event.player);
      }
    };
    eventSource.onerror = (err) => {
      console.error(err);
    }
    return () => eventSource.close();
  }, [API_BASE_URL, updateLadderData]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start h-full">
        <h1
          className={`${poppinsBold.className} text-4xl font-bold text-center sm:text-left h-12`}
        >
          Realtime Elo Ranker
        </h1>
        <div className="flex ">
          <RankingLadder data={ladderData}/>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
