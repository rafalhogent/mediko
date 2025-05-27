export class Tokens  {
  access_token: string;
};

export class AuthResponse extends Tokens {
  user?: string;
}
