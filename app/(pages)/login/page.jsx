"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Using your existing Button component
import Image from 'next/image'; // For the placeholder image
import AuthAPI from '@/app/apis/AuthAPI';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();


    async function handleLogIn(username, password) {
        console.log("Logging in with username:", username, "and password:", password);

        console.log(await AuthAPI.login(username, password));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here (e.g., authenticate user)
        console.log("Username:", username, "Password:", password);

        const loginSuccessful = handleLogIn(username, password);

        if (loginSuccessful !== undefined) {
            router.push('/');
        } else {
            console.log("Login failed");
            console.log(loginSuccessful);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Section with Image and Text */}
            <div className="flex flex-col justify-center items-center w-1/2 bg-gray-100 p-8">
                <Image
                    src="/logoColor.svg" // Replace with your image path
                    alt="RaiseHub"
                    width={400}
                    height={400}
                    onClick={() => router.push('/')}
                    className="mb-6 cursor-pointer"
                />
                <h1 className="text-4xl font-extrabold text-gray-900" onClick={() => router.push('/')}>
                    RaiseHub
                </h1>
                <p className="mt-4 text-lg text-gray-600">Join the community and bring your favorite projects to life!</p>
            </div>

            {/* Right Section with Login Form */}
            <div className="flex flex-col justify-center w-1/2 p-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="username"
                                        name="username"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <Button type="submit" variant="default" className="w-full">
                                    Log In
                                </Button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => router.push('/register')}
                                >
                                    Create a new account
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
