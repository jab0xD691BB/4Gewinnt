import styled from "styled-components";
import { footerHeight, headerHeight, Layout } from "../../components/Layout";
import { Game, GamesList } from "./components/GamesList";
import { Leaderboard } from "./components/Leaderboard";
import { NextGameButton } from "./components/NextGameButton";
import { Player, PlayerProfile } from "./components/PlayerStats";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthenticationContext";
import { GameRoom } from "../NewgamePage/components/GameRoomList";

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
  id: "123",
  name: "L2P",
  eloScore: 1234,
};

const players: Player[] = [
  {
    id: "123",
    name: "L2P",
    eloScore: 1234,
  },
  {
    id: "123",
    name: "L2P",
    eloScore: 1234,
  },
  {
    id: "123",
    name: "L2P",
    eloScore: 1234,
  },
];

const games: Game[] = [
  {
    id: "123",
    players: [
      {
        id: "123",
        name: "Lmao",
        eloScore: 1234,
      },
      {
        id: "123",
        name: "Lmao",
        eloScore: 1234,
      },
    ],
    createdAt: "31.08.2021",
    winner: {
      id: "123",
      name: "Lmao",
      eloScore: 1234,
    },
  },
  {
    id: "123",
    players: [
      {
        id: "123",
        name: "Lmao",
        eloScore: 1234,
      },
      {
        id: "123",
        name: "Lmao",
        eloScore: 1234,
      },
    ],
    createdAt: "31.08.2021",
    winner: {
      id: "123",
      name: "Lmao",
      eloScore: 1234,
    },
  },
];

export const DashboardPage = () => {
  const { token } = useContext(authContext);
  const [gameList, setGameList] = useState<Game[]>([]);
  const [playerList, setPlayerList] = useState<Player[]>([]);

  useEffect(() => {
    (async () => {
      //load gameList
      var url =
        "/api/game/gameplayedby/" + JSON.parse(atob(token!.split(".")[1])).id;
      const gameListRequest = await fetch(url, {
        headers: { "content-type": "application/json" },
      });
      if (gameListRequest.status === 200) {
        const transactionJSON = await gameListRequest.json();
        setGameList(transactionJSON.data);
      }

      //load leaderboard
      var url = "/api/player/sortplayers";
      const leaderListRequest = await fetch(url, {
        headers: { "content-type": "application/json" },
      });
      if (leaderListRequest.status === 200) {
        const transactionJSON = await leaderListRequest.json();
        setPlayerList(transactionJSON.data);
      }
    })();
  }, []);

  return (
    <Layout>
      <DashboardBody>
        <LeftDiv>
          <GamesList games={gameList} />
          <NextGameButton />
        </LeftDiv>
        <RightDiv>
          <PlayerProfile player={p} />
          <Leaderboard players={playerList} />
        </RightDiv>
      </DashboardBody>
    </Layout>
  );
};
