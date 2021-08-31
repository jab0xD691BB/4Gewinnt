import styled from "styled-components";
import { footerHeight, headerHeight, Layout } from "../../components/Layout";
import { Game, GamesList } from "./components/GamesList";
import { Leaderboard } from "./components/Leaderboard";
import { NextGameButton } from "./components/NextGameButton";
import { Player, PlayerProfile } from "./components/PlayerStats";
import React from "react";

const DashboardBody = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  height: calc(100vh - ${headerHeight} - ${footerHeight});
`;

const LeftDiv = styled.div`
  width: 63%;
  margin-right: 7%;
  display: flex;
  flex-direction: column;
`;

const RightDiv = styled.div`
  height: calc(100vh - ${headerHeight} - ${footerHeight});
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const p: Player = {
  name: "L2P",
  elo: 1234,
  won: 100,
  lost: 11,
  winrate: 9000,
};

const players: Player[] = [
  {
    name: "L2P",
    elo: 1234,
    won: 100,
    lost: 11,
    winrate: 9000,
  },
  {
    name: "Ayy",
    elo: 1234,
    won: 100,
    lost: 11,
    winrate: 9000,
  },
  {
    name: "Scurr",
    elo: 1234,
    won: 100,
    lost: 11,
    winrate: 9000,
  },
  {
    name: "Burr",
    elo: 1234,
    won: 100,
    lost: 11,
    winrate: 9000,
  },
  {
    name: "Sheesh",
    elo: 1234,
    won: 100,
    lost: 11,
    winrate: 9000,
  },
  {
    name: "LilPeepe",
    elo: 1234,
    won: 100,
    lost: 11,
    winrate: 9000,
  },
  {
    name: "Gude",
    elo: 1234,
    won: 100,
    lost: 11,
    winrate: 9000,
  },
  {
    name: "Ayy",
    elo: 1234,
    won: 100,
    lost: 11,
    winrate: 9000,
  },
  {
    name: "Lmao",
    elo: 1234,
    won: 100,
    lost: 11,
    winrate: 9000,
  },
  {
    name: "Test",
    elo: 1234,
    won: 100,
    lost: 11,
    winrate: 9000,
  },
];

const games: Game[] = [
  {
    player1: {
      name: "Lmao",
      elo: 1234,
      won: 100,
      lost: 11,
      winrate: 9000,
    },
    player2: {
      name: "Test",
      elo: 1234,
      won: 100,
      lost: 11,
      winrate: 9000,
    },
    date: "31.08.2021",
    gameStatus: "won",
    moves: 20,
  },
  {
    player1: {
      name: "Lmao",
      elo: 1234,
      won: 100,
      lost: 11,
      winrate: 9000,
    },
    player2: {
      name: "Gude",
      elo: 1234,
      won: 100,
      lost: 11,
      winrate: 9000,
    },
    date: "31.08.2021",
    gameStatus: "won",
    moves: 20,
  },
];

export const DashboardPage = () => {
  return (
    <Layout>
      <DashboardBody>
        <LeftDiv>
          <GamesList games={games} />
          <NextGameButton />
        </LeftDiv>
        <RightDiv>
          <PlayerProfile player={p} />
          <Leaderboard players={players} />
        </RightDiv>
      </DashboardBody>
    </Layout>
  );
};
