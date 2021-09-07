import styled from "styled-components";

import { footerHeight, headerHeight, Layout } from "../../components/Layout";
import { Game, GamesList } from "./components/GamesList";
import { Leaderboard } from "./components/Leaderboard";
import { NextGameButton } from "./components/NextGameButton";
import { Player, PlayerProfile } from "./components/PlayerStats";
import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthenticationContext";
import { GameRoom } from "../NewgamePage/components/GameRoomList";
import { GameSettings } from "../NewgamePage/components/GameSettings";

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
/*
const p: Player = {

    id: "123",
    name: "L2P",
    eloScore: 1234,
};*/

export type PlayerDetails = {
  id: string;
  name: string;
  eloScore: number;
  won: number;
  lost: number;
  winrate: number;
};

export const DashboardPage = () => {
  const { token } = useContext(authContext);
  const [gameList, setGameList] = useState<Game[]>([]);
  const [playerList, setPlayerList] = useState<Player[]>([]);
  const [playerDetails, setPlayerDetails] = useState<PlayerDetails | null>(
    null
  );

  let dataLoaded: boolean = false;

  useEffect(() => {
    (async () => {
      if (!dataLoaded) {
        dataLoaded = true;
        //load gameList

        let urlGameList =
          "/api/game/gameplayedby/" + JSON.parse(atob(token!.split(".")[1])).id;
        const gameListRequest = await fetch(urlGameList, {
          headers: { "content-type": "application/json" },
        });
        if (gameListRequest.status === 200) {
          const transactionJSON = await gameListRequest.json();
          setGameList(transactionJSON.data);
        }

        //load leaderboard
        let urlLeaderBoard = "/api/player/sortplayers";
        const leaderListRequest = await fetch(urlLeaderBoard, {
          headers: { "content-type": "application/json" },
        });
        if (leaderListRequest.status === 200) {
          const transactionJSON = await leaderListRequest.json();
          setPlayerList(transactionJSON.data);
        }

        //load player stats from now on
        let playerId = JSON.parse(atob(token!.split(".")[1])).id;
        let playerName = JSON.parse(atob(token!.split(".")[1])).name;
        let playerEloScore = JSON.parse(atob(token!.split(".")[1])).eloScore;
        let playerGamesWon: number = 0;
        let playerGamesLost: number = 0;

        let urlGamesWon =
          "/api/game/gamesWon/" + JSON.parse(atob(token!.split(".")[1])).id;
        const gamesWonRequest = await fetch(urlGamesWon, {
          headers: { "content-type": "application/json" },
        });
        if (gamesWonRequest.status === 200) {
          const transactionJSON = await gamesWonRequest.json();
          playerGamesWon = parseInt(transactionJSON.data[0].gamesWon);
        }

        let urlGamesLost =
          "/api/game/gamesLost/" + JSON.parse(atob(token!.split(".")[1])).id;
        const gamesLostRequest = await fetch(urlGamesLost, {
          headers: { "content-type": "application/json" },
        });
        if (gamesLostRequest.status === 200) {
          const transactionJSON = await gamesLostRequest.json();
          playerGamesLost = parseInt(transactionJSON.data[0].gamesLost);
        }

        let loadedPlayerDetails: PlayerDetails = {
          id: playerId as string,
          name: playerName as string,
          eloScore: playerEloScore as number,
          won: playerGamesWon as number,
          lost: playerGamesLost as number,
          winrate: (playerGamesWon / (playerGamesWon + playerGamesLost)) * 100,
        };
        setPlayerDetails(loadedPlayerDetails);
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
          <PlayerProfile playerDetails={playerDetails} />
          <Leaderboard players={playerList} />
        </RightDiv>
      </DashboardBody>
    </Layout>
  );
};

/*
function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}*/
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
