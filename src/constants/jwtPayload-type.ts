import { UserRole } from "src/entity/user.entity";

export type JwtPayload = {
    email: string;
    sub: number;
    role: UserRole;
  };
  