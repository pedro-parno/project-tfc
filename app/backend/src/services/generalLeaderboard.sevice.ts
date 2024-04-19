import TeamStatus from '../utils/calculateStatus';
import { ILeaderboard } from '../Interfaces/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/matches.model';
import { ITeams } from '../Interfaces/ITeams';
import { IMatches } from '../Interfaces/IMatches';
import TeamsModel from '../models/teams.model';

function getTeamMatchesHome(team: ITeams, matches: IMatches[]): IMatches[] {
  return matches.filter((match) => match.homeTeamId === team.id);
}

function getTeamMatchesAway(team: ITeams, matches: IMatches[]): IMatches[] {
  return matches.filter((match) => match.awayTeamId === team.id);
}

function calculateTotalPointsHome(teamMatches: IMatches[]): number {
  return teamMatches.reduce((acc, match) => acc + TeamStatus.calculateTotalPointsHome(match), 0);
}

function calculateTotalPointsAway(teamMatches: IMatches[]): number {
  return teamMatches.reduce((acc, match) => acc + TeamStatus.calculateTotalPointsAway(match), 0);
}

function calculateTotalGamesHome(teamMatches: IMatches[]): number {
  return teamMatches.length;
}

function calculateTotalGamesAway(teamMatches: IMatches[]): number {
  return teamMatches.length;
}

function calculateTotalVictoriesHome(teamMatches: IMatches[]): number {
  return teamMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
}

function calculateTotalVictoriesAway(teamMatches: IMatches[]): number {
  return teamMatches.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length;
}

function calculateTotalDrawsHome(teamMatches: IMatches[]): number {
  return teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
}

function calculateTotalDrawsAway(teamMatches: IMatches[]): number {
  return teamMatches.filter((match) => match.awayTeamGoals === match.homeTeamGoals).length;
}

function calculateTotalLossesHome(
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
): number {
  return totalGames - totalVictories - totalDraws;
}

function calculateTotalLossesAway(
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
): number {
  return totalGames - totalVictories - totalDraws;
}

function calculateGoalsFavorHome(teamMatches: IMatches[]): number {
  return teamMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
}

function calculateGoalsFavorAway(teamMatches: IMatches[]): number {
  return teamMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
}

function calculateGoalsOwnHome(teamMatches: IMatches[]): number {
  return teamMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
}

function calculateGoalsOwnAway(teamMatches: IMatches[]): number {
  return teamMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
}

function homeResults(team: ITeams, matches: IMatches[]): ILeaderboard {
  const teamMatches = getTeamMatchesHome(team, matches);
  const totalPoints = calculateTotalPointsHome(teamMatches);
  const totalGames = calculateTotalGamesHome(teamMatches);
  const totalVictories = calculateTotalVictoriesHome(teamMatches);
  const totalDraws = calculateTotalDrawsHome(teamMatches);
  const totalLosses = calculateTotalLossesHome(totalGames, totalVictories, totalDraws);
  const goalsFavor = calculateGoalsFavorHome(teamMatches);
  const goalsOwn = calculateGoalsOwnHome(teamMatches);

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

function awayResults(team: ITeams, matches: IMatches[]): ILeaderboard {
  const teamMatches = getTeamMatchesAway(team, matches);
  const totalPoints = calculateTotalPointsAway(teamMatches);
  const totalGames = calculateTotalGamesAway(teamMatches);
  const totalVictories = calculateTotalVictoriesAway(teamMatches);
  const totalDraws = calculateTotalDrawsAway(teamMatches);
  const totalLosses = calculateTotalLossesAway(totalGames, totalVictories, totalDraws);
  const goalsFavor = calculateGoalsFavorAway(teamMatches);
  const goalsOwn = calculateGoalsOwnAway(teamMatches);

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

function calculateGoalsBalance(
  goalsFavor: number,
  goalsOwn: number,
) {
  const goalsBalance = TeamStatus.calculateGoalDifference(goalsFavor, goalsOwn);

  return { goalsBalance };
}

function homeScoreboard(team: ITeams, matches: IMatches[]) {
  const allHomeResults = homeResults(team, matches);
  const homeGoalsAndEfficiency = calculateGoalsBalance(
    allHomeResults.goalsFavor,
    allHomeResults.goalsOwn,
  );

  return {
    ...allHomeResults,
    ...homeGoalsAndEfficiency,
  };
}

function awayScoreboard(team: ITeams, matches: IMatches[]) {
  const allAwayResults = awayResults(team, matches);
  const awayGoalsAndEfficiency = calculateGoalsBalance(
    allAwayResults.goalsFavor,
    allAwayResults.goalsOwn,
  );

  return {
    ...allAwayResults,
    ...awayGoalsAndEfficiency,
  };
}

export default class generealLeaderboardService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
    private teamsModel: TeamsModel = new TeamsModel(),
  ) { }

  public async getLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const matches = await this.matchesModel.findAll(false);
    const allTeams = await this.teamsModel.findAll();

    const leaderboard: ILeaderboard[] = await Promise.all(allTeams.map(async (team) => {
      const homeScoreboardData = await homeScoreboard(team, matches);
      const awayScoreboardData = await awayScoreboard(team, matches);

      return generealLeaderboardService.combineScoreboardData(
        homeScoreboardData,
        awayScoreboardData,
      );
    }));

    const arrangedLeaderboard = TeamStatus.arrangeTeams(leaderboard);

    return { status: 'OK', data: arrangedLeaderboard };
  }

  private static combineScoreboardData(
    homeDt: ILeaderboard,
    awayDt: ILeaderboard,
  ): ILeaderboard {
    const totalPoints = homeDt.totalPoints + awayDt.totalPoints;
    const totalGames = homeDt.totalGames + awayDt.totalGames;
    return {
      name: homeDt.name,
      totalPoints,
      totalGames,
      totalVictories: homeDt.totalVictories + awayDt.totalVictories,
      totalDraws: homeDt.totalDraws + awayDt.totalDraws,
      totalLosses: homeDt.totalLosses + awayDt.totalLosses,
      goalsFavor: homeDt.goalsFavor + awayDt.goalsFavor,
      goalsOwn: homeDt.goalsOwn + awayDt.goalsOwn,
      goalsBalance: (homeDt.goalsBalance ?? 0) + (awayDt.goalsBalance ?? 0),
      efficiency: TeamStatus.calculateEfficiency(totalPoints, totalGames),
    };
  }
}
