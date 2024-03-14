import type { PageLoad } from './$types';

const local_words = [
    "Potato",
    "Potatos",
    "MagicTheGathering"
]

export const load: PageLoad = async ({ fetch }) => {
    let forced = false;
    let res = await fetch("https://random-word-api.herokuapp.com/word").catch(() => {
        forced = true
    });

    if (forced) {
        return {
            word: local_words[Math.floor(Math.random() * local_words.length)]
        }
    }
    let word = (await res?.json())[0]
    return {
        word: String(word)
    };
};