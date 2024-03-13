import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    return {
        word: String((await (await fetch("https://random-word-api.herokuapp.com/word")).json())[0])
    };
};