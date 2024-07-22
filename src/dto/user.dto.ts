import { ShortUser } from "@/types/user.interface";

export class UserDto implements ShortUser {
  id!: number;
  email!: string;
  firstname!: string;
  lastname!: string;
}
