import styled from "styled-components";
import React from "react";

const LeaderboardLayout = styled.div`
  border-radius: 10px;
  height: 60%;
  width: 100%;
  background-color: ${(props) => props.theme.colors.boardColor};
  padding-left: 10px;
  padding-right: 10px;
  margin: 10px;
`;

const PlayerWrapper = styled.div`
  direction: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.colors.backgroundColor};
  line-height: 26px;
  font-size: 14px;
  &:nth-child(10) {
    border: 0px;
  }
`;
const LeaderboardTitel = styled.p`
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 1px solid white;
`;

const PlayerText = styled.p`
  display: inline-block;
  width: 45%;
  margin: auto;
  padding-left: 10px;
`;
const PlayerTextValue = styled.p`
  display: inline-block;
  width: 45%;
  text-align: end;
  margin: 0;
`;

const TitelWrapper = styled(PlayerWrapper)`
  margin-bottom: 2px;
  border: 0px;
  background-color: ${(props) => props.theme.colors.titleWrapperColor};
  font-size: 10px;
  padding: 0 2px 0 2px;
`;

const IndexStyle = styled.p`
  display: inline-block;
  width: 10%;
  margin: auto;
`;

const NameTitel = styled(PlayerText)``;
const EloTitel = styled(PlayerTextValue)``;

const PlayerList = styled.div``;

export interface Player {
    id: string;
  name: string;
  eloScore: number;
}

export const Leaderboard: React.FC<{ players: Player[] }> = ({ players }) => {
  return (
    <LeaderboardLayout>
      <LeaderboardTitel>Leaderboard</LeaderboardTitel>
      <TitelWrapper>
        <IndexStyle>Rang</IndexStyle>
        <NameTitel>Name</NameTitel>
        <EloTitel>Elo</EloTitel>
      </TitelWrapper>
      <PlayerList>
        {players.map((player, index) => {
          return (
            <PlayerWrapper key={index}>
              <IndexStyle>#{index + 1}</IndexStyle>
              <PlayerText>{player.name}</PlayerText>
              <PlayerTextValue>{player.eloScore}</PlayerTextValue>
            </PlayerWrapper>
          );
        })}
      </PlayerList>
    </LeaderboardLayout>
  );
};
