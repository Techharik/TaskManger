import bcrypt from "bcrypt";
import type { UserEntity } from "./UserEntity";

export class UserImpl implements UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public about: string = "",
  ) {
    this.email = email.toLowerCase();
  }

  static async create(
    id: string,
    name: string,
    email: string,
    password: string,
    about?: string,
  ): Promise<UserImpl> {
    const hashedPassword = await bcrypt.hash(password, 10);

    return new UserImpl(id, name, email, hashedPassword, about ?? "");
  }

  changeEmail(newEmail: string) {
    this.email = newEmail.toLowerCase();
  }

  verifyPassword(candidate: string): Promise<boolean> {
    return bcrypt.compare(candidate, this.password);
  }
}
