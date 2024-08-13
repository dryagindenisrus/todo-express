export class AuthUserResponse {
  constructor(value: AuthUserResponse) {
    this.id = value.id!;
    this.email = value.email!;
    this.firstname = value.firstname!;
    this.lastname = value.lastname!;
    this.avatarpath = value.avatarpath ?? null;
    this.accessToken = value.accessToken!;
    this.refreshToken = value.refreshToken!;
  }

  id!: number;
  email!: string;
  firstname!: string;
  lastname!: string;
  avatarpath!: string | null;
  accessToken!: string;
  refreshToken!: string;
}
