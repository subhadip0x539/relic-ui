import type { Permission } from "@/constants/permission.const";
import type { Role } from "@/constants/role.const";
import { decodeToken } from "react-jwt";

export interface TokenClaims {
  sub: string;
  role: Role;
  permissions: Permission[];
  jti: string;
  iat: number;
  exp: number;
}

export class Claims {
  private readonly claims: TokenClaims | null;

  constructor(token: string) {
    this.claims = decodeToken<TokenClaims>(token);
  }

  public all(): TokenClaims | null {
    return this.claims;
  }

  public can(perm: Permission): boolean {
    return this.claims?.permissions?.includes(perm) ?? false;
  }
}
