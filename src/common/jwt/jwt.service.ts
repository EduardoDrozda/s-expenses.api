import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

type Secret = string | Buffer | { key: string | Buffer; passphrase: string };

interface JwtParams {
  secret?: string | Buffer;
  privateKey?: Secret;
}

@Injectable()
export class JwtService {
  constructor(
    private readonly params: JwtParams,
    private readonly jwt: NestJwtService,
  ) {}

  async sign(
    payload: Record<string, any>
  ): Promise<string> {
    return this.jwt.signAsync(payload, this.params);
  }

  async verify(
    token: string,
  ): Promise<Record<string, any>> {
    return this.jwt.verifyAsync(token, this.params);
  }
}
