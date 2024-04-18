import TeamStatus from '../utils/calculateStatus';
import { ILeaderboard } from '../Interfaces/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/matches.model';
import { ITeams } from '../Interfaces/ITeams';
import { IMatches } from '../Interfaces/IMatches';
import TeamsModel from '../models/teams.model';
// import { match } from 'assert';

// private scoreboard(team: ITeams, matches: IMatches[]): ILeaderboard {
//   const teamMatches = matches.filter((match) => match.homeTeamId === team.id);
//   const totalPoints = teamMatches.reduce((acc, match) =>
//     acc + TeamStatus.calculateTotalPoints(match), 0);
//   const totalGames = teamMatches.length;
//   const totalVictories = teamMatches.filter((match) =>
//     match.homeTeamGoals > match.awayTeamGoals).length;
//   const totalDraws = teamMatches.filter((match) =>
//     match.homeTeamGoals === match.awayTeamGoals).length;
//   const totalLosses = totalGames - totalVictories - totalDraws;
//   const goalsFavor = teamMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
//   const goalsOwn = teamMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
//   const goalsBalance = TeamStatus.calculateGoalDifference(goalsFavor, goalsOwn);
//   const efficiency = TeamStatus.calculateAveragedEfficiency(totalPoints, totalGames);

//   return {
//     name: team.teamName,
//     totalPoints,
//     totalGames,
//     totalVictories,
//     totalDraws,
//     totalLosses,
//     goalsFavor,
//     goalsOwn,
//     goalsBalance,
//     efficiency,
//   };
// }
function getTeamMatches(team: ITeams, matches: IMatches[]): IMatches[] {
  return matches.filter((match) => match.homeTeamId === team.id);
}

function calculateTotalPoints(teamMatches: IMatches[]): number {
  return teamMatches.reduce((acc, match) => acc + TeamStatus.calculateTotalPointsHome(match), 0);
}

function calculateTotalGames(teamMatches: IMatches[]): number {
  return teamMatches.length;
}

function calculateTotalVictories(teamMatches: IMatches[]): number {
  return teamMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
}

function calculateTotalDraws(teamMatches: IMatches[]): number {
  return teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
}

function calculateTotalLosses(
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
): number {
  return totalGames - totalVictories - totalDraws;
}

function calculateGoalsFavor(teamMatches: IMatches[]): number {
  return teamMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
}

function calculateGoalsOwn(teamMatches: IMatches[]): number {
  return teamMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
}

function results(team: ITeams, matches: IMatches[]): ILeaderboard {
  const teamMatches = getTeamMatches(team, matches);
  const totalPoints = calculateTotalPoints(teamMatches);
  const totalGames = calculateTotalGames(teamMatches);
  const totalVictories = calculateTotalVictories(teamMatches);
  const totalDraws = calculateTotalDraws(teamMatches);
  const totalLosses = calculateTotalLosses(totalGames, totalVictories, totalDraws);
  const goalsFavor = calculateGoalsFavor(teamMatches);
  const goalsOwn = calculateGoalsOwn(teamMatches);

  return {
    name: team.teamName,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
  };
}

function calculateEfficiencyAndGoalsBalance(
  goalsFavor: number,
  goalsOwn: number,
  totalPoints: number,
  totalGames: number,
) {
  const goalsBalance = TeamStatus.calculateGoalDifference(goalsFavor, goalsOwn);
  const efficiency = TeamStatus.calculateEfficiency(totalPoints, totalGames);

  return { goalsBalance, efficiency };
}

function scoreboard(team: ITeams, matches: IMatches[]) {
  const allResults = results(team, matches);
  const goalsAndEfficiency = calculateEfficiencyAndGoalsBalance(
    allResults.goalsFavor,
    allResults.goalsOwn,
    allResults.totalPoints,
    allResults.totalGames,
  );

  return {
    ...allResults,
    ...goalsAndEfficiency,
  };
}

export default class LeaderboardService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
    private teamsModel: TeamsModel = new TeamsModel(),
  ) { }

  public async getLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const matches = await this.matchesModel.findAll(false);
    const allTeams = await this.teamsModel.findAll();
    const leaderboard: ILeaderboard[] = await Promise.all(allTeams.map(async (team) =>
      scoreboard(team, matches)));

    const arrangedLeaderboard = TeamStatus.arrangeTeams(leaderboard);

    return { status: 'OK', data: arrangedLeaderboard };
  }
}
