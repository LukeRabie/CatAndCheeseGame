export const calculateScore = (letters: number, attempts: number, totalAttempts: number, time: number): number => {
    // Score is a mark in the thousands, calculated in 100's of eachother mainly
    // We take the amount of letters, and add 100 ontop of it's converted version
    const letters_score = (letters + 1) * 100;
    // Get however many remaning attempts there are
    const attempt_scores = (totalAttempts - attempts) * 100;
    // For each 5 seconds in the time, subtract 10 points
    const time_score = (time / 5) * -100;

    // Add them all together
    const final_score = letters_score + attempt_scores + time_score;

    return final_score;
}