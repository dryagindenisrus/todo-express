export class UserDto {
  constructor(value: UserDto) {
    this.id = value.id;
    this.email = value.email;
    this.firstname = value.firstname;
    this.lastname = value.lastname;
  }
  id!: number;
  email!: string;
  firstname!: string;
  lastname!: string;
}
