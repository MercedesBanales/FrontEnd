'use client'

import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RootState } from '@/app/GlobalRedux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveUser } from '@/app/GlobalRedux/Features/activeUserSlice';
import { useRouter } from 'next/navigation';
import * as authenticationService from '@/services/authenticationService';

export default function NavigationBar() {
    const [login, setLogin] = useState('Login');
    const activeUser = useSelector((state: RootState) => state.activeUser.value);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (activeUser?.name) setLogin('Logout');
        else setLogin('Login');
    }, [activeUser]);

    const handleLogin = () => {
        if (login === 'Logout') {
            dispatch(setActiveUser(null))
            authenticationService.logout();
        }
        router.push('/login');
    }

    const handleContacts = () => {
        router.push('/contacts');
    }

    return (
    <>
        <nav className="bg-fuchsia-100 rounded-3xl">
        <div className="mx-auto max-w-7x lg:px-6 lg:py-4">
            <div className="relative flex items-center justify-between">
            <div className="flex flex-shrink-0 items-center">
                    <Image src="/Group2Logo.png" alt="Your Company" width={90} height={80}/>                
                </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch">
                    <div className="flex space-x-4">
                        <button className="rounded-3xl px-3 py-2 text-xs font-medium text-black hover:bg-fuchsia-200 hover:font-semibold hover:shadow" onClick={handleContacts}>Contacts</button>
                        <Link href="" className="rounded-3xl px-3 py-2 text-xs font-medium text-black hover:bg-fuchsia-200 hover:font-semibold hover:shadow">Notes</Link>
                    </div>
            </div>
            <div className="flex items-center gap-2 sm:static sm:inset-auto">
                <button className="rounded-3xl px-3 py-2 text-xs font-medium text-black hover:bg-fuchsia-200 hover:font-semibold hover:shadow" onClick={handleLogin}>{login}</button>
                <Link href="#" className="rounded-3xl px-6 py-2 text-xs font-medium text-white bg-violet-400">Sign in</Link>
            </div>
            </div>
        </div>
        </nav>
    </>
    );
}