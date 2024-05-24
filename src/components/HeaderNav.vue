<script setup lang="ts">

</script>

<template>
    <div class="navbarContainer">
        <!-- Display column  -->
        <img class="logo" src="/src/assets/Newsplanet.svg" alt="">
        <!-- Flex row här -->
        <ul class="navLinks">
            <li>News</li>
            <li>Videos</li>
            <li>Newsletters</li>
            <li>Events</li>
        </ul>
    </div>
</template>


<style scoped>

.navbarContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid rgba(44, 44, 44, 0.13);
}

.logo {
    width: 10em;
}

.navLinks {
    border-top: 1px solid rgba(44, 44, 44, 0.13);
    display: flex;
    gap: 2em;
    list-style: none;
    margin-bottom: 1em;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    cursor: pointer;
}

li:hover {
    color: rgba(37, 44, 53, 0.673);
}
</style>