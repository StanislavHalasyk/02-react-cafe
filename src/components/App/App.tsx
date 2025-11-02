import { useState } from "react";
import CafeInfo from "../Cafeinfo/Cafeinfo";
import Notification from "../Notification/Notification";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../Votestates/VoteStats";
import type { Votes, VoteType } from "../../types/votes";
import css from "./App.module.css";
import "./App.css";

export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VoteType) => {
    setVotes((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const resetVotes = () => {
    setVotes({ good: 0, neutral: 0, bad: 0 });
  };

  const total = votes.good + votes.neutral + votes.bad;
  const positive = total > 0 ? Math.round((votes.good / total) * 100) : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={total > 0}
      />
      {total > 0 ? (
        <VoteStats votes={votes} total={total} positive={positive} />
      ) : (
        <Notification />
      )}
    </div>
  );
}
