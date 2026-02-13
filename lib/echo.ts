import Echo from "laravel-echo";
import Pusher from "pusher-js";

let echo: Echo | null = null;

export function getEcho(token: string) {
    if (echo) return echo;

    window.Pusher = Pusher;

    echo = new Echo({
        broadcaster: "reverb", // or "pusher"
        key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,

        wsHost: "127.0.0.1", // your laravel host
        wsPort: 8080,
        forceTLS: false,

        authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",

        auth: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });

    return echo;
}
