import { getSession, signIn, signOut } from 'next-auth/react';

export const signInOrOut = async () => {
    const session = await getSession();

    if (session) {
        signOut();
    } else {
        signIn('spotify');
    }
};
