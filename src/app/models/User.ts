export class User {
  id: number;
  email: string;
  name?: string;
  password?: string;
  username?: string;
  roles: string[];
  accessToken: string;
}


export class Game {
  file: string;
  tmplt_id: number;
  game_rounds: number;
  game_round_duration: number;
  game_start_datetime: number;

}
