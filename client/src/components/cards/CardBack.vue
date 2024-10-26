<script>
export default {
    name: 'CardBack'
}
</script>
<template>
    <div class="uno-card-back">
        <div class="uno-circle"></div>
        <div class="uno-logo">
            <p>
                UNO
            </p>
        </div>
    </div>
</template>
<style>
.uno-card-back {
    width: 90%;
    height: 90%;
    background-color: black;
    border-radius: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.uno-card-back .uno-logo p {
    background: linear-gradient(to bottom, yellow, white);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
    transform: rotate(-45deg);
    font-size: 25px;
    font-weight: bold;
}

.uno-circle {
    position: absolute;
    width: 50px;
    height: 100px;
    background-color: red;
    transform: rotate(45deg);
    border-radius: 50%;
    z-index: 1;
}

.uno-logo {
    position: relative;
    z-index: 2;
}
</style>