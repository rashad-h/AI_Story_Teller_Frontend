<template>
    <div class="profile">
        <img class="profile-icon" src="../../profile-user.png" alt="Profile" />
    </div>
</template>


<script>
export default {
    name: 'ProfileComponent',
};
</script>


<style scoped>
.profile {
    position: absolute;
    top: 20px;
    right: 20px;
}

.profile-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    filter: invert(100%) sepia(100%) saturate(1000%) hue-rotate(200deg) brightness(90%) contrast(90%);
}
</style>