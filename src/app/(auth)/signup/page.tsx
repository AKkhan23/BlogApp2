'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(name, email, password);
      toast.success('Account created! Welcome 🎉');
      router.push('/dashboard');
      router.refresh();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Azim Khan"
        required
        autoComplete="name"
      />
      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        autoComplete="email"
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
        autoComplete="new-password"
        helperText="Minimum 6 characters"
      />
      <Button type="submit" isLoading={isLoading} size="lg" className="w-full mt-2">
        Create Account
      </Button>
    </form>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">✨</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Join BlogApp and start writing
          </p>
        </div>

        <Suspense fallback={
          <div className="space-y-4">
            <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" />
            <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" />
            <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" />
            <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" />
          </div>
        }>
          <SignupForm />
        </Suspense>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
