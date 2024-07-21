export class UserDto {
  constructor(id: number, email: string, firstname: string, lastname: string) {\
    this.id = id;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
  }

  id!: number;
  email!: string;
  firstname!: string;
  lastname!: string;
}
