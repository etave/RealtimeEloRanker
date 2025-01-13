import React, { FC } from "react";
import { Poppins } from "next/font/google";
import LadderItem, { PlayerData } from "./LadderItem/LadderItem";
import { AnimatePresence, motion } from "motion/react";

const poppinsSemiBold = Poppins({
  weight: "500",
  style: "normal",
  variable: "--poppins-semi-bold",
});

interface RankingLadderProps {
  data: PlayerData[];
}

/**
 * Composant fonctionnel pour afficher le classement des joueurs
 *
 * @param {RankingLadderProps} props Les propriétés du composant
 * @param {PlayerData[]} props.data Les données des joueurs
 * @param {(data: PlayerData[]) => void} props.updateData La fonction pour mettre à jour les données des joueurs
 *
 * @returns {JSX.Element} Le composant pour afficher le classement des joueurs
 */
const RankingLadder: FC<RankingLadderProps> = (props) => {
  const { data } = props;

  return (
    <div data-testid="RankingLadder">
      <h2 className={`${poppinsSemiBold.className} text-2xl`}>
        Classement des joueurs
      </h2>
      <div className="pt-12 columns-4 gap-4">
        <AnimatePresence>
          {data.map((player) => (
            <motion.div
              key={player.id}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: {
                  delay: 0.3,
                  type: "spring",
                  stiffness: 260,
                  damping: 40,
                },
              }}
              layout
            >
              <LadderItem player={player} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RankingLadder;
