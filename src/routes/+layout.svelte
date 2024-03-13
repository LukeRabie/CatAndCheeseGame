<script>
    import "../app.css";
</script>

<div class="w-[100vw] h-[100vh] p-16 flex place-content-center">
    <div class="artboard artboard-demo artboard-horizontal h-full w-full">
        <div class="flex justify-end w-full">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                />
            </svg>
        </div>
        <slot />
    </div>
</div>
