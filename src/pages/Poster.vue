<template>
    <div class="poster-container">
        <h2 class="poster-title">Welcome to ECOMMERCE</h2>
        <img class="poster-image" src="/poster.jpg" />
    </div>
</template>

<style scoped>
.poster-title {
    text-align: center;
}

.poster-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.poster-image {
    border-radius: 20px;
    width: 300px;
}
</style>