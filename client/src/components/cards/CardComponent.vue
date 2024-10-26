<script>
export default {
    name: 'CardComponent',
    props: {
        color: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        }
    },
    methods: {
        handleClick(event) {
            this.$emit('native-click', event);
        }
    }
}
</script>
<template>
    <div class="card-container" :style="{ backgroundColor: color ? color : 'black' }" @click="handleClick">
        <div class="card-header">
            <h2 class="card-title" :style="{ color: 'white' }">
                <template v-if="value === 'Wild Draw Four'">
                    <font-awesome-icon icon="fa-solid fa-hand-holding-medical" />
                </template>
                <template v-else-if="value === 'Reverse'">
                    <font-awesome-icon icon="fa-solid fa-arrows-spin" />
                </template>
                <template v-else-if="value === 'Draw Two'">
                    <font-awesome-icon icon="fa-solid fa-hand-holding-medical" />
                </template>
                <template v-else-if="value === 'Skip'">
                    <font-awesome-icon icon="fa-solid fa-ban" />
                </template>
                <template v-else-if="value === 'Wild'">
                    <font-awesome-icon icon="fa-solid fa-star" />
                </template>
                <template v-else>
                    {{ value }}
                </template>
            </h2>
        </div>
        <div class="card-body">
            <div class="uno-circle-card"></div>
            <h1 class="big-number" :style="{ color: 'white' }">
                <template v-if="value === 'Wild Draw Four'">
                    <font-awesome-icon icon="fa-solid fa-hand-holding-medical" />4
                </template>
                <template v-else-if="value === 'Reverse'">
                    <font-awesome-icon icon="fa-solid fa-arrows-spin" />
                </template>
                <template v-else-if="value === 'Draw Two'">
                    <font-awesome-icon icon="fa-solid fa-hand-holding-medical" />2
                </template>
                <template v-else-if="value === 'Skip'">
                    <font-awesome-icon icon="fa-solid fa-ban" />
                </template>
                <template v-else-if="value === 'Wild'">
                    <font-awesome-icon icon="fa-solid fa-star" />
                </template>
                <template v-else>
                    {{ value }}
                </template>
            </h1>

        </div>
        <div class="card-footer">
            <h2 class="card-title" :style="{ color: 'white' }">
                <template v-if="value === 'Wild Draw Four'">
                    <font-awesome-icon icon="fa-solid fa-hand-holding-medical" />
                </template>
                <template v-else-if="value === 'Reverse'">
                    <font-awesome-icon icon="fa-solid fa-arrows-spin" />
                </template>
                <template v-else-if="value === 'Draw Two'">
                    <font-awesome-icon icon="fa-solid fa-hand-holding-medical" />
                </template>
                <template v-else-if="value === 'Skip'">
                    <font-awesome-icon icon="fa-solid fa-ban" />
                </template>
                <template v-else-if="value === 'Wild'">
                    <font-awesome-icon icon="fa-solid fa-star" />
                </template>
                <template v-else>
                    {{ value }}
                </template>
            </h2>
        </div>
    </div>
</template>
<style>
.card-container {
    width: 90%;
    height: 90%;
    position: absolute;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: -75px;
}

.card-header h2,
.card-footer h2 {
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
    font-weight: 800;
    margin: 0;
    text-align: left;
    padding: 5px;
}

.card-footer h2 {
    text-align: right;
}

.uno-circle-card {
    position: absolute;
    width: 50%;
    height: 60%;
    background-color: rgba(255, 255, 255, 0);
    border: 5px solid white;
    top: 20%;
    left: 20%;
    transform: rotate(45deg);
    border-radius: 50%;
    z-index: 1;
}

.card-title svg {
    stroke-width: 10px;
    stroke: black;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-miterlimit: 1;
    fill: white;
    font-size: 20px;
}

.big-number {
    font-size: 50px;
    font-weight: bold;
    position: relative;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
    text-align: center;
    justify-content: center;
    margin: 0;
    z-index: 5;
}

.big-number svg {
    stroke-width: 10px;
    stroke: black;
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-miterlimit: 1;
    fill: white;
    font-size: 40px;
}
</style>