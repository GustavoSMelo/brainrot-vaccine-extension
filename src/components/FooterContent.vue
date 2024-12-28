<script lang="ts">
export default {
    setup() {
        const handleLoadProjectRepository = () => {
            window.open(
                "https://github.com/GustavoSMelo/brainrot-vaccine-extension",
                "_blank"
            );
        };

        return { handleLoadProjectRepository };
    },
};
</script>

<template>
    <footer @click="handleLoadProjectRepository()">
        <div>
            <img src="../assets/github.svg" alt="Github Logo" />
            <p>Developed by Gustavo S. Melo</p>
        </div>
        <small>Version: 1.0.1</small>
    </footer>
</template>

<style src="../styles/components/footercontent.style.scss" scoped />
