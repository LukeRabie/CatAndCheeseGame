import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    return {
        word: await (await fetch("https://random-word-api.herokuapp.com/word")).json()
    };
};