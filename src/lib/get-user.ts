import { cookies } from 'next/headers';
import { verifyToken, JWTPayload } from './auth';

// Only import this in API routes that need auth check (NOT in signup/login)
export async function getCurrentUser(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}
