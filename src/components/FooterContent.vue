<script setup lang="ts">
const handleLoadProjectRepository = () => {
    window.open(
        "https://github.com/GustavoSMelo/brainrot-vaccine-extension",
        "_blank"
    );
};
</script>

<template>
    <footer @click="handleLoadProjectRepository()">
        <div>
            <img src="../assets/github.svg" alt="Github Logo" />
            <p>Developed by Gustavo S. Melo</p>
        </div>
        <small>Version: 1.3.0</small>
    </footer>
</template>

<style src="../styles/components/footercontent.style.scss" scoped />
