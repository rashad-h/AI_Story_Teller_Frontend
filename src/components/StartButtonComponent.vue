<template>
    <button :class="{'start-button': true}"
    :style="{ width: buttonWidth }"
    @click="handleClick"
    >
    Start
    </button>
</template>

<script>

export default {
    name: "StartButtonComponent",
    props: {
        // isMorphing: {
        //     type: Boolean,
        //     default: false,
        // },
        buttonWidth: {
            type: String,
            default: 'auto', // Default width
        },
    },
    methods: {
            handleClick() {
                this.$emit('click'); // Emit click event to the parent component
            },
    },
    

}

</script>

<style> 


.start-button {
    font-size: 1.2em;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: #d09bfef6; /* Faded blue button color */
    color: #272822; /* Dark text color for contrast */
    cursor: pointer;
    transition: opacity 0.4s ease;
    outline: none;
    max-width: 200px;
}
/* Add styles for the morphing effect */
/* .morphing {
    width: 100%;
    max-width: 200px;
    padding: 10px;
    border-radius: 10px;
    background-color: #b463ffd3;
    color: #f8f8f2;
    text-align: center;
} */


.start-button:hover {
    background-color: #9e36ff; 
    color: #f1eaff;
}

</style>