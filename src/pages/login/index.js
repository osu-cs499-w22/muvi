import React, { useEffect, useContext } from 'react';
import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { UserContext } from '../_app';

const Login = () => {
    const router = useRouter();
    const queryString = require('query-string');
    const { setUser, setSessionID } = useContext(UserContext);

    useEffect(() => {
        const parsed = queryString.parse(location.search);
        console.log(parsed);
        async function fetchSession() {
            const res = await fetch(
                `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        request_token: parsed.request_token,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (res.status === 401) {
                console.log('== Error: No Session ID');
            } else {
                const body = await res.json();
                console.log('Recieved SessionID', body.session_id);
                setUser(body.success);
                setSessionID(body.session_id);
                router.push(`/login/${body.success}`);
            }
        }
        if (parsed.approved == 'true') fetchSession();
    }, []);

    return <Text>Error</Text>;
};

export default Login;