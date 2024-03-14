<script lang="ts">
    import { confetti } from "@tsparticles/confetti";
    import { goto, invalidateAll } from "$app/navigation";
    import type { PageData } from "./$types";
    import MouseAndCheese from "$lib/components/mouseAndCheese.svelte";
    import { calculateScore } from "$lib/score";

    let sezuires = false;

    // Fetch a random word
    export let data: PageData;
    $: word = data.word.toUpperCase();
    $: console.debug(word);
    $: length = word.length;
    $: letterArr = word.split("");
    // Using some randomness, give them a certain amount of attempts
    // The formula will prolly be uniqueLength + 1 + <Random int between -1 and 2>
    $: uniqueLength = new Set(letterArr).size;
    $: totalAttempts = uniqueLength + 1 + Math.floor(Math.random() * 3 - 1);
    let startTime = new Date();
    let shownTime = "";
    let finalTime = new Date();

    setInterval(() => {
        if (finished) return;
        let currentTime = new Date();
        let timeDiff = currentTime.getTime() - startTime.getTime();
        let seconds = Math.floor(timeDiff / 1000);
        let minutes = Math.floor(seconds / 60);
        let formattedSeconds = seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        finalTime = new Date(timeDiff);
        seconds = seconds % 60;
        shownTime = `${minutes}:${formattedSeconds}`;
    }, 100);

    let attempts = 0;
    // Active state variables
    $: if (totalAttempts) attempts = 0;
    $: failed = attempts >= totalAttempts;
    $: visibleWord = Array(length).fill("_");
    $: console.log(visibleWord, length);
    $: finished = visibleWord.join("") === word;

    let help_modal: HTMLDialogElement | undefined = undefined;
    let finished_modal: HTMLDialogElement | undefined = undefined;
    $: if (failed) {
        visibleWord = letterArr;
    }
    $: if (finished) {
        // Show modal
        finished_modal?.showModal();

        // Pause the timer

        // If failed, make the confetti rain down a bunch of thumbs down
        const confettiSettings = failed
            ? {
                  particleCount: 150,
                  spread: 120,
                  angle: 90,
                  origin: {
                      y: 0.5,
                  },
                  scalar: 4,
                  ticks: 100,
                  shapes: ["emoji"],
                  shapeOptions: {
                      emoji: {
                          value: ["👎", "💩"],
                      },
                  },
              }
            : {
                  particleCount: 250,
                  spread: 120,
                  angle: 90,
                  origin: {
                      y: 0.5,
                  },
                  scalar: 2,
                  ticks: 100,
              };
        !sezuires ? confetti(confettiSettings) : null;
    }

    // This should always be... u know... the alphabet...
    const qwertyAlphabet = [
        "Q",
        "W",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P",
        "A",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "Z",
        "X",
        "C",
        "V",
        "B",
        "N",
        "M",
    ];
    const normalAlphabet = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ];

    const alphabet = normalAlphabet;

    const eventPressLetter = (e: Event) => {
        // Extrapolate the letter from the event
        const letter = (e as KeyboardEvent).key.toUpperCase();
        // Make sure the letter is in the alphabet, and not disabled
        let enabled = !document
            .getElementById(`letter-${letter}`)
            ?.classList.contains("btn-disabled");
        if (letter && alphabet.includes(letter) && enabled) {
            pressLetter(letter);
        }
    };

    const pressLetter = (letter: string) => {
        if (failed) return;
        console.debug(letter);
        // If the letter is in the word, reveal it
        if (letterArr.includes(letter)) {
            letterArr.forEach((l, i) => {
                if (l === letter) {
                    visibleWord[i] = l;
                }
            });
        } else {
            attempts++;
        }

        // Irrelevant to if it's right or not, the letter needs to be disabled
        // To get the element, we look up via id in the format of "letter-<letter>"
        const button = document.getElementById(`letter-${letter}`);
        // Add the class btn-disabled
        if (button) button.classList.add("btn-disabled");
    };

    const disableSezuires = (e: Event) => {
        const target = e.currentTarget as HTMLInputElement;
        if (!target) return;
        sezuires = target.checked;
    };
</script>

<dialog id="finished_modal" class="modal" bind:this={finished_modal}>
    <div class="modal-box">
        <h3 class="font-bold text-lg">
            {failed ? "Oh no! You failed!" : "Success!"}
        </h3>
        <span class="py-4 text-center">
            <div>
                {failed
                    ? "You've run out of attempts. Better luck next time! Don't worry though, the mouse is happy!"
                    : `You've successfully completed the word, with ${totalAttempts - attempts} attempts left!`}
            </div>
            <div>Time Taken: {shownTime}</div>
            <div>
                Total Score: {calculateScore(
                    length,
                    attempts,
                    totalAttempts,
                    finalTime.getSeconds(),
                )}
            </div>
            <div>The word was: {word}</div>
        </span>
        <div class="modal-action">
            <div class="join p-2">
                <button
                    class="btn min-w-24 btn-warning join-item"
                    on:click={() => {
                        // Click the other reset button id = restart
                        let button = document.getElementById("restart");
                        if (button) button.click();

                        // Hide modal
                        finished_modal?.close();
                    }}><span>Restart</span></button
                >
                <button class="btn min-w-24 btn-error join-item">Exit</button>
            </div>
        </div>
    </div>
</dialog>

<dialog class="modal" id="help_modal" bind:this={help_modal}>
    <div class="modal-box">
        <h3 class="font-bold text-lg">Help Page</h3>
        <div>
            <h3 class="font-semibold">How to play</h3>
            <span
                >To play, type via your keyboard, or use the onscreen keyboard
                to try and guess what the word is, before the mouse gets to it.</span
            >
        </div>
        <div>
            <h3>
                <span class="font-semibold">Settings</span>
                <span
                    class="text-xs text-info tooltip tooltip-top"
                    data-tip="These settings do not save between play sessions."
                    >(Not persistent)</span
                >
            </h3>
            <div class="form-control">
                <label class="label cursor-pointer">
                    <input
                        class="checkbox"
                        type="checkbox"
                        name="sezuire"
                        id="Sezuires"
                        on:change={disableSezuires}
                    />
                    <span>Disable Sezuires</span>
                </label>
            </div>
        </div>
    </div>
    <form
        method="dialog"
        class="modal-backdrop backdrop-blur-lg transition-all"
    >
        <button>Close</button>
    </form>
</dialog>

<div
    class="flex h-full w-full flex-col items-center pt-8 outline-none cursor-auto"
    tabindex="0"
    on:keydown={eventPressLetter}
    role="button"
>
    <div class="h-1/3 w-5/6 border">
        <MouseAndCheese {attempts} {totalAttempts} />
    </div>
    <div class="w-full text-center text-6xl">{visibleWord.join(" ")}</div>
    <div
        class="flex w-5/6 flex-wrap justify-center gap-2 mt-8 py-2 text-center text-4xl border"
    >
        {#each alphabet as letter}
            <button
                class="aspect-square btn border w-20 h-20"
                id="letter-{letter}"
                on:click={() => pressLetter(letter)}>{letter}</button
            >
        {/each}
    </div>
    <div>
        <span class="font-bold">Attempt Remaining: </span>{totalAttempts -
            attempts}
    </div>
    <div>
        <span class="font-bold">Time Elapsed: </span>{shownTime}
    </div>
    <div class="join p-12">
        <button
            id="restart"
            class="btn btn-wide btn-warning join-item"
            on:click={(e) => {
                // Turn self into spinner
                let target = e.currentTarget.children[0];
                target.classList.add("loading", "loading-infinity");
                invalidateAll().then(() => {
                    console.debug("Invalidated all");
                    // Remove spinner
                    target.classList.remove("loading", "loading-infinity");
                    // Reset clock
                    startTime = new Date();
                    // Reset all the letters
                    alphabet.forEach((letter) => {
                        let button = document.getElementById(
                            `letter-${letter}`,
                        );
                        if (button) button.classList.remove("btn-disabled");
                    });
                });
            }}><span>Restart</span></button
        >
        <a
            class="btn btn-wide btn-error join-item"
            href="https://www.google.com">Exit</a
        >
    </div>
    <div class="self-start absolute bottom-16">
        <button
            class="btn btn-circle btn-sm btn-info tooltip tooltip-right"
            data-tip="Help"
            on:click={() => help_modal?.showModal()}>?</button
        >
    </div>
</div>
