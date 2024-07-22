import { TokensDto } from "./Tokens.dto";

export class AuthUser extends TokensDto {
  id!: number;
  email!: string;
  firstname!: string;
  lastname!: string;
  avatarpath!: string | null;
}
