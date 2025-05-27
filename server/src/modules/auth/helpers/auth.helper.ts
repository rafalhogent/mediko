import { UnauthorizedException } from '@nestjs/common';
import { ExtractedToken } from '../models/auth.types';

export function extractToken(request: string): ExtractedToken {
  const [type, token] = request?.split(' ') ?? [];
  if (!token) throw new UnauthorizedException('Cannot extract token');
  return {
    token_type: type,
    token_value: token,
  };
}
