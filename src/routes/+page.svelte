<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import type { PageData } from "./$types";
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

    setInterval(() => {
        if (failed) return;
        let currentTime = new Date();
        let timeDiff = currentTime.getTime() - startTime.getTime();
        let seconds = Math.floor(timeDiff / 1000);
        let minutes = Math.floor(seconds / 60);
        let formattedSeconds = seconds.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        seconds = seconds % 60;
        shownTime = `${minutes}:${formattedSeconds}`;
    }, 100);

    // Active state variables
    let attempts = 0;
    $: failed = attempts >= totalAttempts;
    $: visibleWord = Array(length).fill("_");

    let alphabetContainer: HTMLDivElement | undefined;
    $: if (failed) {
        visibleWord = letterArr;
        alphabetContainer?.classList.add(
            "stripes",
            "stripes-sm",
            "stripes-red-500",
        );
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
</script>

<div
    class="flex h-full w-full flex-col items-center pt-8 outline-none cursor-auto"
    tabindex="0"
    on:keydown={eventPressLetter}
    role="button"
>
    <div class="h-1/3 border text-center italic">
        This would be where a mouse would be, trapped within a maze. Due to
        budget cuts, the design team were unable to get the mouse in a maze.
    </div>
    <div class="w-full text-center text-6xl">{visibleWord.join(" ")}</div>
    <div
        class="flex w-5/6 flex-wrap justify-center gap-2 mt-8 py-2 text-center text-4xl border"
        bind:this={alphabetContainer}
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
                });
            }}><span>Restart</span></button
        >
        <button class="btn btn-wide btn-error join-item">Exit</button>
    </div>
</div>
