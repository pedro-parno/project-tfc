import { IMatches } from '../Interfaces/IMatches';
import { ILeaderboard } from '../Interfaces/ILeaderboard';

export default class TeamStatus {
  static calculateTotalPointsHome(match: IMatches): number {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      return 3;
    } if (match.homeTeamGoals === match.awayTeamGoals) {
      return 1;
    }
    return 0;
  }

  static calculateTotalPointsAway(match: IMatches):number {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      return 3;
    }
    if (match.awayTeamGoals === match.homeTeamGoals) {
      return 1;
    }
    return 0;
  }

  static calculateEfficiency(totalPoints: number, totalGames: number): string {
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return efficiency.toFixed(2);
  }

  static calculateGoalDifference(goalsFavor: number, goalsOwn: number): number {
    return goalsFavor - goalsOwn;
  }

  static arrangeTeams(teams: ILeaderboard[]): ILeaderboard[] {
    return teams.sort((a, b) => {
      const goalsBalanceA = TeamStatus.calculateGoalDifference(a.goalsFavor, a.goalsOwn);
      const goalsBalanceB = TeamStatus.calculateGoalDifference(b.goalsFavor, b.goalsOwn);
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      } if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      } if (goalsBalanceA !== goalsBalanceB) {
        return goalsBalanceB - goalsBalanceA;
      }
      return b.goalsFavor - a.goalsFavor;
    });
  }
}
