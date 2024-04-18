import { IMatches } from '../Interfaces/IMatches';
import { ILeaderboard } from '../Interfaces/ILeaderboard';

export default class TeamStatus {
  static calculateTotalPoints(match: IMatches): number {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      return 3;
    } if (match.homeTeamGoals === match.awayTeamGoals) {
      return 1;
    }
    return 0;
  }

  static calculateEfficiency(totalPoints: number, totalGames: number): number {
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return parseFloat(efficiency.toFixed(2));
  }

  static calculateGoalDifference(goalsFavor: number, goalsOwn: number): number {
    return goalsFavor - goalsOwn;
  }

  static arrangeTeams(teams: ILeaderboard[]): ILeaderboard[] {
    return teams.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      } if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      } if (a.goalsFavor !== b.goalsFavor) {
        return b.goalsFavor - a.goalsFavor;
      }
      return b.goalsOwn - a.goalsOwn;
    });
  }
}
