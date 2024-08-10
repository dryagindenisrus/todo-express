export class AuthUserResponse {
  id!: number;
  email!: string;
  firstname!: string;
  lastname!: string;
  avatarpath!: string | null;
  accessToken!: string;
  refreshToken!: string;
}
