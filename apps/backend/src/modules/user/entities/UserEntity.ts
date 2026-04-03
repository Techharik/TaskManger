import type { registerDto } from "@repo/types";

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  about: string;
  verifyPassword: (candidate: string) => Promise<boolean>;
}
