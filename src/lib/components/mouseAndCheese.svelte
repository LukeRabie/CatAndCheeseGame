<script lang="ts">
    export let attempts = 0;
    export let totalAttempts = 0;

    $: distance = (totalAttempts - attempts) * 10;
    $: eaten = attempts >= totalAttempts;
    $: widthPercentage = `${((totalAttempts - attempts) / totalAttempts) * 100}%`;
    $: console.log(widthPercentage);
</script>

<div class="flex justify-center p-4">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-rat w-32 h-full inline stroke-lime-300"
        ><path
            d="M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7v0c0 2.2 1.8 4 4 4"
        /><path
            d="M16.8 3.9c.3-.3.6-.5 1-.7 1.5-.6 3.3.1 3.9 1.6.6 1.5-.1 3.3-1.6 3.9l1.6 2.8c.2.3.2.7.2 1-.2.8-.9 1.2-1.7 1.1 0 0-1.6-.3-2.7-.6H17c-1.7 0-3 1.3-3 3"
        /><path d="M13.2 18a3 3 0 0 0-2.2-5" /><path
            d="M13 22H4a2 2 0 0 1 0-4h12"
        /><path d="M16 9h.01" /></svg
    >
    <div
        class="divider h-full px-8 self-center transition-all {eaten
            ? 'hidden'
            : ''}"
        style="width:{widthPercentage}"
    >
        {distance}cm
    </div>
    <svg
        viewBox="0 0 50.1 42.2"
        class="w-32 h-full inline fill-yellow-500"
        xmlns="http://www.w3.org/2000/svg"
        ><defs></defs><g data-name="Layer 2" id="Layer_2"
            ><g data-name="Layer 1" id="Layer_1-2"
                ><g id="chees"
                    ><path
                        class="cls-1"
                        d="M37.11,38.61c6.42-.2,6.42-9.51,0-9.72C30.69,29.1,30.69,38.41,37.11,38.61Zm0-7a2.16,2.16,0,0,1,0,4.32A2.16,2.16,0,0,1,37.11,31.59Z"
                    /><path
                        class="cls-1"
                        d="M21.77,31.86a4.15,4.15,0,0,0,0-8.3A4.15,4.15,0,0,0,21.77,31.86Zm0-5.6a1.45,1.45,0,0,1,0,2.9A1.45,1.45,0,0,1,21.77,26.26Z"
                    /><path
                        class="cls-1"
                        d="M50.1,14.47a1.37,1.37,0,0,0-.45-.9l-5.33-4.8a1.35,1.35,0,0,0-1.93.12,3,3,0,0,1-2.29.93C38.66,9.82,37.44,9,37.44,8a1.9,1.9,0,0,1,1.33-1.61,1.35,1.35,0,0,0,.38-2.24L35,.35A1.33,1.33,0,0,0,33.56.1L.84,13.32A1.36,1.36,0,0,0,0,14.57v5.22a1.34,1.34,0,0,0,1.35,1.35c1.95,0,3.59,1.2,3.59,2.61S3.3,26.36,1.35,26.36A1.34,1.34,0,0,0,0,27.71V40.85A1.35,1.35,0,0,0,1.35,42.2H4.87a1.35,1.35,0,0,0,1.35-1.35c.21-4.89,9.69-4.87,9.89,0a1.35,1.35,0,0,0,1.35,1.35H48.75a1.35,1.35,0,0,0,1.35-1.35C50.09,40.75,50.11,14.56,50.1,14.47ZM33.79,2.91,36.06,5c-4.3,4.66,2.72,9.75,7.34,6.6l1.84,1.66h-37ZM47.4,39.5H18.63c-1.8-6.67-13.13-6.67-14.93,0h-1V28.93c6.54-1.27,6.54-9.09,0-10.36V15.92H47.4Z"
                    /><path
                        class="cls-1"
                        d="M26.5,6.76a3.12,3.12,0,0,0,0,6.24A3.12,3.12,0,0,0,26.5,6.76Zm0,3.55a.43.43,0,0,1,0-.85A.43.43,0,0,1,26.5,10.31Z"
                    /></g
                ></g
            ></g
        ></svg
    >
</div>
