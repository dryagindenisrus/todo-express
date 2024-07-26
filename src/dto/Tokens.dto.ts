import { Tokens } from "@/types/tokens.interface";

export class TokensDto implements Tokens {
  accessToken!: string;
  refreshToken!: string;
}
