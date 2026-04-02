import type { registerDto } from "@repo/types";

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  verifyPassword: (candidate: string) => Promise<boolean>;
}
