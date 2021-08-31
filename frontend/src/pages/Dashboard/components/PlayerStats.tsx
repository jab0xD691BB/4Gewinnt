import styled from "styled-components";
import React from "react";

const PlayerLayout = styled.div`
  background-color: #2b2b2b;
  border-radius: 10px;
  height: 40%;
  width: 100%;
  margin-bottom: 20%;
  padding-left: 10px;
  padding-right: 10px;
`;

const PlayerTitel = styled.p`
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 1px solid white;
`;

const PlayerStatsWrapper = styled.div`
  direction: flex;
  flex-direction: column;
`;

const PlayerText = styled.p`
  display: inline-block;
  width: 50%;
`;
const PlayerTextValue = styled.p`
  display: inline-block;
  width: 50%;
  text-align: end;
`;

export interface Player {
  name: string;
  elo: number;
  won: number;
  lost: number;
  winrate: number;
}

export const PlayerProfile: React.FC<{ player: Player }> = ({ player }) => {
  return (
    <PlayerLayout>
      <PlayerTitel>{player.name}</PlayerTitel>
      <PlayerStatsWrapper>
        <PlayerText>Elo</PlayerText>
        <PlayerTextValue>{player.elo}</PlayerTextValue>
      </PlayerStatsWrapper>
      <PlayerStatsWrapper>
        <PlayerText>Won</PlayerText>
        <PlayerTextValue>{player.won}</PlayerTextValue>
      </PlayerStatsWrapper>
      <PlayerStatsWrapper>
        <PlayerText>Lost</PlayerText>
        <PlayerTextValue>{player.lost}</PlayerTextValue>
      </PlayerStatsWrapper>
      <PlayerStatsWrapper>
        <PlayerText>Winrate</PlayerText>
        <PlayerTextValue>{player.winrate}</PlayerTextValue>
      </PlayerStatsWrapper>
    </PlayerLayout>
  );
};
