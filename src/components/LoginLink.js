import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Link } from '@chakra-ui/react';

const LoginLink = () => {
    const [requestToken, setRequestToken] = useState('');

    const router = useRouter();

    useEffect(() => {
        const fetchToken = async () => {
            const res = await fetch(
                `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
            );
            if (res.status === 401) {
                console.log('Error fetching token');
            } else {
                const body = await res.json();
                setRequestToken(body.request_token);
            }
        };

        fetchToken();
    }, []);

    const queryParams = new URLSearchParams({
        redirect_to:
            process.env.NEXT_PUBLIC_REDIRECT_URL + `?path=${router.asPath}`,
    });
    const baseUrl = 'https://www.themoviedb.org/authenticate/';
    const url = `${baseUrl}${requestToken}?${queryParams.toString()}`;

    return (
        <Button
            as={Link}
            href={url}
            variant="ghost"
            style={{ textDecoration: 'none' }}
        >
            Login with TMDB
        </Button>
    );
};

export default LoginLink;
