import jwt_decode from "jwt-decode";
class JwtService {
  decode(token: string) {
    let payload = jwt_decode(token);
    return payload;
  }

  getExpDate(token: string): Date {
    let decoded: {
      exp: number;
    } = jwt_decode(token);
    let expirationInSecods = decoded.exp;
    return new Date(expirationInSecods * 1000);
  }
}

export const jwtService = new JwtService();
