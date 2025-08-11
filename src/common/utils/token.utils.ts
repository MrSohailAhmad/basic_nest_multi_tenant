import { AuthEnum } from 'src/modules/tenantUser/enum/auth.enum';
import jwt, {
  SignOptions,
  VerifyErrors,
  JwtPayload,
  sign,
  verify,
} from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';
import type { StringValue } from 'ms';

/**
 * Interface for token payload (you can expand this as needed).
 */
export interface TokenPayload {
  id: string | number;
  email?: string;
  tenantDb?: string;
  [key: string]: any;
}

/**
 * Custom AppError class
 */
export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Generic token creator
 */
function createToken(
  secret: string,
  expiry: number | StringValue,
  payload: TokenPayload,
): string {
  try {
    const options: SignOptions = { expiresIn: expiry };
    return sign(payload, secret, options);
  } catch (error) {
    console.log(error);
    return '';
  }
}

/**
 * Generic token verifier
 */
function verifyToken<T = TokenPayload>(
  token: string,
  secret: string,
): Promise<T> {
  return new Promise((resolve, reject) => {
    verify(token, secret, (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        return reject(
          new AppError(AuthEnum.INVALID_TOKEN, HttpStatus.UNAUTHORIZED),
        );
      }
      resolve(decoded as T);
    });
  });
}

/**
 * Access token creation
 */
export const createAccessToken = (payload: TokenPayload): string => {
  return createToken(
    process.env.ACCESS_TOKEN_SECRET as string,
    process.env.ACCESS_TOKEN_EXPIRY as string,
    payload,
  );
};

/**
 * OTP token creation
 */
export const createOtpToken = (payload: TokenPayload): string => {
  return createToken(
    process.env.OTP_TOKEN_SECRET as string,
    process.env.OTP_TOKEN_EXPIRY as string,
    payload,
  );
};

/**
 * Verify access token
 */
export const verifyAccessToken = (token: string): Promise<TokenPayload> => {
  return verifyToken(token, process.env.ACCESS_TOKEN_SECRET as string);
};

/**
 * Verify OTP token
 */
export const verifyOtpToken = (token: string): Promise<TokenPayload> => {
  return verifyToken(token, process.env.OTP_TOKEN_SECRET as string);
};

// ========== Optional: refresh & forgot token ==========
// Uncomment and add these env vars to .env as needed

// export const createRefreshToken = (payload: TokenPayload): string => {
//   return createToken(
//     process.env.REFRESH_TOKEN_SECRET as string,
//     process.env.REFRESH_TOKEN_EXPIRY as string,
//     payload
//   );
// };

// export const verifyRefreshToken = (token: string): Promise<TokenPayload> => {
//   return verifyToken(token, process.env.REFRESH_TOKEN_SECRET as string);
// };

// export const createForgotToken = (payload: TokenPayload): string => {
//   return createToken(
//     process.env.FORGOT_TOKEN_SECRET as string,
//     process.env.FORGOT_TOKEN_EXPIRY as string,
//     payload
//   );
// };

// export const verifyForgotToken = (token: string): Promise<TokenPayload> => {
//   return verifyToken(token, process.env.FORGOT_TOKEN_SECRET as string);
// };

// Optional: helper to hash refresh tokens
// import crypto from 'crypto';
// export const computeSHA256Hash = (data: string): string =>
//   crypto.createHash('sha256').update(data).digest('hex');

// export const isRefreshTokenValid = (userToken: string, token: string): boolean => {
//   const hash = computeSHA256Hash(token);
//   return userToken === hash;
// };
