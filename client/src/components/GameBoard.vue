<template>
    <div class="game-message" v-if="game.status === 'waiting'">
        <svg width="200px" height="200px" viewBox="0 0 1024 1024" class="icon" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M704 256m-149.333333 0a149.333333 149.333333 0 1 0 298.666666 0 149.333333 149.333333 0 1 0-298.666666 0Z"
                fill="#BA68C8" />
            <path
                d="M704 149.333333c-58.816 0-106.666667 47.850667-106.666667 106.666667s47.850667 106.666667 106.666667 106.666667 106.666667-47.850667 106.666667-106.666667-47.850667-106.666667-106.666667-106.666667z"
                fill="#FFFFFF" />
            <path d="M704 256m-21.333333 0a21.333333 21.333333 0 1 0 42.666666 0 21.333333 21.333333 0 1 0-42.666666 0Z"
                fill="#263238" />
            <path d="M682.666667 170.666667h42.666666v85.333333h-42.666666z" fill="#263238" />
            <path d="M715.861333 238.250667l64 42.666666-23.658666 35.52-64-42.666666z" fill="#263238" />
            <path d="M298.666667 106.666667a85.333333 85.333333 0 1 1 0 170.666666 85.333333 85.333333 0 0 1 0-170.666666"
                fill="#FFB74D" />
            <path
                d="M394.624 661.354667a74.730667 74.730667 0 0 1-71.509333-53.226667l-64-213.333333a74.666667 74.666667 0 1 1 143.04-42.901334l64 213.333334a74.645333 74.645333 0 0 1-71.530667 96.128z"
                fill="#607D8B" />
            <path
                d="M682.624 917.333333a42.624 42.624 0 0 1-41.344-32.32L576 661.333333h-170.666667l42.666667-106.666666 170.666667 21.333333a42.666667 42.666667 0 0 1 41.386666 32.32l64 256A42.666667 42.666667 0 0 1 682.624 917.333333z"
                fill="#607D8B" />
            <path
                d="M501.354667 597.333333c-2.56 0-5.162667-0.32-7.786667-0.96l-170.666667-42.666666a32 32 0 0 1-23.274666-23.274667l-46.208-155.093333c-11.178667-42.453333 21.589333-71.36 75.477333-76.693334 0 0-23.658667 23.936-19.392 41.045334l47.552 156.565333 152.042667 38.016A32 32 0 0 1 501.354667 597.333333z"
                fill="#607D8B" />
            <path
                d="M357.056 496.277333l95.594667 23.893334-7.125334-23.786667-71.573333-17.877333-59.968-124.053334zM533.226667 565.333333c0 2.56-0.213333 5.162667-0.853334 7.765334a32 32 0 0 1-38.805333 23.274666l-170.666667-42.666666a31.850667 31.850667 0 0 1-22.506666-21.333334l11.989333 39.893334c1.813333 0.661333 3.456 1.664 5.376 2.154666l170.645333 42.666667a53.269333 53.269333 0 0 0 66.197334-49.088l-21.376-2.666667z"
                fill="#37474F" />
            <path
                d="M576 746.666667h-170.666667c-128 0-154.944-86.741333-160.277333-108.010667L151.210667 332.501333s83.968-27.008 106.368 56.256 70.741333 231.701333 70.741333 231.701334C328.448 620.629333 341.333333 661.333333 405.333333 661.333333h86.229334c85.333333 0 84.437333 85.333333 84.437333 85.333334z"
                fill="#FF9800" />
        </svg>
        <h1>This game has not started yet</h1>
        <div class="handle-game" v-if="game.owner._id === userId">
            <p> {{ game.players.length }} / 4 Players Joined</p>
            <button @click="startGame">Start game</button>
        </div>
    </div>
    <div class="game-message" v-if="game.status === 'ended'">
        <template v-if="game.winner === userId">
            <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" width="200px" height="200px" viewBox="0 0 32 32"
                xml:space="preserve">
                <g>
                    <path class="isometric_dertien" d="M21,21.913c0,0.012,0,0.024,0,0.036c0.036-0.836-0.498-1.676-1.599-2.311
		c-0.171-0.099-0.364-0.177-0.551-0.26c0.286,0.38,0.514,0.802,0.647,1.264c0.435,1.327-1.081,2.218-2.134,2.535
		c-1.284,0.387-2.751,0.372-4.017-0.08c-1.263-0.451-2.261-1.417-1.695-2.802c0.131-0.321,0.303-0.621,0.507-0.896
		c-0.181,0.081-0.369,0.157-0.536,0.253c-1.117,0.645-1.66,1.496-1.623,2.339v4.068c0.119,0.703,0.669,1.387,1.599,1.924
		c2.141,1.236,5.624,1.23,7.778-0.014c0.927-0.535,1.491-1.211,1.623-1.907V21.913z" />
                    <path class="isometric_vijf" d="M22.351,4.673c-0.006-0.003-0.01-0.009-0.015-0.013c0,0-0.003-0.002-0.004-0.002
		c-0.151-0.091-0.811-0.51-1.027-0.591c-0.359-0.133-0.816-0.074-1.319,0.216L18.434,5.18c-2.113-0.763-4.941-0.611-6.789,0.456
		c-1.165,0.673-1.701,1.57-1.607,2.447c-0.044,0.634-0.056,1.32,0.033,1.922c0.014,0.094,0.05,0.177,0.076,0.266l-1.002,0.578
		c-1.84,1.062-2.789,4.164-1.504,4.935c0.113,0.068,0.534,0.334,0.821,0.49c0,0,0,0-0.001,0c0,0,0.001,0,0.001,0
		c0.499,0.271,1.058,0.158,1.529-0.113l1.39-0.802c0.751,1.051,1.879,1.815,3.201,2.057l0,0.386
		c-1.311,0.303-2.419,1.249-2.928,2.494c-0.566,1.385,0.432,2.352,1.695,2.802c1.266,0.452,2.733,0.467,4.017,0.08
		c1.053-0.317,2.569-1.208,2.134-2.535c-0.426-1.472-1.735-2.612-3.232-2.887l0-0.317c2.44-0.37,4.311-2.47,4.311-5.013v-1.469
		c0.002-0.003,0.005-0.007,0.007-0.01c0.298-0.441,0.426-0.964,0.468-1.504C22.764,8.245,23.548,5.424,22.351,4.673z M20.71,6.845
		c-0.08-0.138-0.177-0.274-0.291-0.406l0.439-0.253c0.009-0.005,0.035-0.012,0.025-0.009c-0.025,0.009,0,0,0,0
		C20.881,6.393,20.81,6.623,20.71,6.845z M10.543,13.477c0,0-1.315,0.762-1.441,0.827c-0.021-0.515,0.267-1.22,0.888-1.579
		l0.438-0.253C10.43,12.817,10.474,13.151,10.543,13.477z" />
                    <g>
                        <g>
                            <g>
                                <path class="isometric_tien" d="M21,21.913c-0.052,2.245-3.972,3.722-7.503,2.938v2.962c3.619,0.803,7.498-0.749,7.503-2.976
					V21.913z" />
                            </g>
                            <g>
                                <path class="isometric_tien" d="M21,21.913c-0.052,2.245-3.972,3.722-7.503,2.938v2.962c3.619,0.803,7.498-0.749,7.503-2.976
					V21.913z" />
                            </g>
                        </g>
                        <g>
                            <g>
                                <path class="isometric_twaalf" d="M10,21.913v2.923c-0.031,1.597,1.833,2.607,3.497,2.976v-2.962
					C11.779,24.47,10.002,23.454,10,21.913z" />
                            </g>
                            <g>
                                <path class="isometric_twaalf" d="M10,21.913v2.923c-0.031,1.597,1.833,2.607,3.497,2.976v-2.962
					C11.779,24.47,10.002,23.454,10,21.913z" />
                            </g>
                        </g>
                    </g>
                    <path class="isometric_zeven" d="M15.709,5.396c-1.142,1.021-2.008,2.493-2.426,4.214C9.974,8.314,11.696,5.31,15.709,5.396z
		M21.051,9.442c-0.041,0.541-0.17,1.063-0.468,1.504c-0.589,0.873-1.655,1.332-2.638,1.593c-2.13,0.568-4.58,0.464-6.45-0.685
		l-1.506,0.87c-0.621,0.358-0.909,1.064-0.888,1.579c0.126-0.065,1.712-0.983,1.802-1.035l0.845,0.502v1.374L9.99,16.16
		c-0.47,0.272-1.03,0.384-1.529,0.113c0,0,0,0-0.001,0c0,0,0.001,0,0.001,0c-0.287-0.156-0.708-0.422-0.821-0.49
		c-1.285-0.771-0.336-3.872,1.504-4.935l1.002-0.578c-0.025-0.089-0.062-0.172-0.076-0.266c-0.093-0.633-0.075-1.358-0.026-2.018
		c0.151,2.778,5.962,4.056,9.33,2.112c1.319-0.762,1.824-1.811,1.529-2.793c0.014,0.046-0.07-0.232-0.196-0.454
		c0.101-0.224,0.174-0.456,0.175-0.674l0,0c-0.009,0.005-0.016,0.004-0.025,0.009l-0.444,0.256c-0.248-0.289-0.576-0.56-0.989-0.802
		c-0.009-0.005-0.016-0.012-0.026-0.017C19.1,5.45,18.771,5.308,18.427,5.184l1.559-0.9c0.502-0.29,0.96-0.349,1.319-0.216
		c0.216,0.08,0.877,0.5,1.027,0.591c0.001,0,0.004,0.002,0.004,0.002c0.006,0.003,0.01,0.009,0.015,0.013
		C23.548,5.424,22.764,8.245,21.051,9.442z" />
                    <path class="st14" d="M9.095,14.307c0.001-0.001,0.002-0.001,0.003-0.001c0-0.012-0.006-0.019-0.006-0.032
		C9.092,14.286,9.094,14.295,9.095,14.307z" />
                    <path class="isometric_acht" d="M15.709,5.396c3.512,0.075,5.092,2.517,2.647,3.929c-1.384,0.799-3.52,0.893-5.073,0.285
		C13.701,7.889,14.567,6.417,15.709,5.396z M22.351,4.673c-0.007-0.004-0.012-0.011-0.019-0.015
		c-0.379-0.212-0.899-0.178-1.474,0.154L19.424,5.64c0.413,0.242,0.741,0.513,0.989,0.802l0.444-0.256
		c0.009-0.005,0.016-0.004,0.025-0.009c0.483-0.263,0.873-0.037,0.873,0.521c0,0.501-0.319,1.085-0.733,1.415
		c0.038,0.433,0.06,0.887,0.025,1.331c1.054-0.735,1.879-2.221,1.879-3.464C22.927,5.342,22.706,4.896,22.351,4.673z M9.092,14.274
		c0-0.568,0.403-1.263,0.898-1.549l1.759-1.016v-1.374L9.99,11.351c-1.157,0.668-2.096,2.287-2.096,3.615
		c0,0.634,0.218,1.08,0.567,1.308c0.498,0.27,1.058,0.158,1.528-0.113l1.759-1.016V13.77L9.99,14.786
		c-0.484,0.28-0.875,0.061-0.895-0.479C9.094,14.295,9.092,14.286,9.092,14.274z" />
                </g>
            </svg>
            <h1>Congratulations you've won !!</h1>
        </template>
        <template v-else>
            <svg width="200px" height="200px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.5"
                    d="M21 6.20766V11.4061C21 16.8106 16.761 19.4332 14.1014 20.5469C13.38 20.849 13.0193 21 12 21C10.9807 21 10.62 20.849 9.89856 20.5469C7.23896 19.4332 3 16.8106 3 11.4061V6.20766C3 4.05201 3 2.97418 3.70725 2.38442C4.4145 1.79467 5.49553 1.97202 7.6576 2.32673L8.71202 2.49971C10.3523 2.76881 11.1724 2.90336 12 2.90336C12.8276 2.90336 13.6477 2.76881 15.288 2.49971L16.3424 2.32673C18.5045 1.97202 19.5855 1.79467 20.2927 2.38442C21 2.97418 21 4.05201 21 6.20766Z"
                    fill="#1C274C" />
                <path
                    d="M7.17107 8.78309C7.29454 8.53986 7.75695 8.207 8.50016 8.207C9.24338 8.207 9.70579 8.53986 9.82926 8.78309C10.0144 9.14782 10.4649 9.29574 10.8354 9.11349C11.2059 8.93123 11.3562 8.48781 11.1711 8.12308C10.7123 7.21935 9.60365 6.73047 8.50016 6.73047C7.39668 6.73047 6.28804 7.21935 5.82926 8.12308C5.64411 8.48781 5.79439 8.93123 6.16492 9.11349C6.53544 9.29574 6.98591 9.14782 7.17107 8.78309Z"
                    fill="#1C274C" />
                <path
                    d="M15.5002 8.207C14.7569 8.207 14.2945 8.53986 14.1711 8.78309C13.9859 9.14782 13.5354 9.29574 13.1649 9.11349C12.7944 8.93123 12.6441 8.48781 12.8293 8.12308C13.288 7.21935 14.3967 6.73047 15.5002 6.73047C16.6037 6.73047 17.7123 7.21935 18.1711 8.12308C18.3562 8.48781 18.2059 8.93123 17.8354 9.11349C17.4649 9.29574 17.0144 9.14782 16.8293 8.78309C16.7058 8.53986 16.2434 8.207 15.5002 8.207Z"
                    fill="#1C274C" />
                <path
                    d="M7.99594 13.8125C7.696 14.0937 7.67123 14.5731 7.9569 14.8683C8.2402 15.1612 8.70946 15.1748 9.00977 14.9007L9.01531 14.896L9.02419 14.8888C9.02939 14.8846 9.03592 14.8795 9.04379 14.8734C9.06315 14.8586 9.09073 14.8384 9.12649 14.8143C9.22721 14.7463 9.39425 14.6462 9.63305 14.5429C10.1081 14.3373 10.8804 14.1131 12 14.1131C13.1196 14.1131 13.8919 14.3373 14.367 14.5429C14.6058 14.6462 14.7728 14.7463 14.8735 14.8143C14.9239 14.8483 14.9578 14.8743 14.9758 14.8888L14.9862 14.8973L14.9909 14.9014C15.2913 15.1748 15.76 15.1609 16.0431 14.8683C16.3288 14.5731 16.3172 14.1058 16.0172 13.8246L16.016 13.8234L16.0146 13.8221L16.0115 13.8192L16.0041 13.8125L15.9842 13.7949C15.9688 13.7815 15.9489 13.7647 15.9244 13.745C15.8754 13.7056 15.8081 13.6548 15.7218 13.5965C15.5491 13.4799 15.3005 13.3339 14.9706 13.1912C14.3081 12.9045 13.3304 12.6366 12 12.6366C10.6696 12.6366 9.69192 12.9045 9.02945 13.1912C8.6995 13.3339 8.45092 13.4799 8.2782 13.5965C8.19189 13.6548 8.1246 13.7056 8.07562 13.745C8.05113 13.7647 8.03121 13.7815 8.01576 13.7949L7.99594 13.8125Z"
                    fill="#1C274C" />
            </svg>
            <h1>You lost !!</h1>
            <h1>This game has ended</h1>
        </template>

        <button class="home-btn" @click="() => {
            this.$router.push({ name: 'HomePage' })
        }">
            Home
        </button>
    </div>
    <Modal modalClass="modal-colors" title='Warning' mask v-model:visible="wonVisible" offsetTop="25%" :okButton="{
        text: 'Home',
        onClick: () => this.$router.push({ name: 'HomePage' })
    }">
        <h2>Congratulations you've won !!</h2>
    </Modal>
    <Modal modalClass="modal-colors" title='Warning' mask v-model:visible="lostVisible" offsetTop="25%" :okButton="{
        text: 'Home',
        onClick: () => this.$router.push({ name: 'HomePage' })
    }">
        <h2>You lost !!</h2>
    </Modal>
    <div class="game-container" v-if="game.status === 'started'">
        <div class="game-board">
            <div class="opponents">
                <div class="player" v-if="players[1]">
                    <div class="player-name" v-if="players[1].username">
                        {{ players[1].username }}
                        <font-awesome-icon icon="fa-solid fa-user" v-show="isMyTurn(players[1]._id, game.turn)" />
                    </div>
                    <div class="cards-wrapper">
                        <div class="card" v-for="(card, index) of players[1].hand.cards" :key="card._id"
                            :style="{ transform: `translateX(${(index - players[1].hand.cards.length / 2) * 10}px)` }">
                            <CardBack />
                        </div>
                    </div>
                </div>
                <div class="player" v-if="players[2]">
                    <div class="player-name" v-if="players[2].username">
                        {{ players[2].username }}
                        <font-awesome-icon icon="fa-solid fa-user" v-show="isMyTurn(players[2]._id, game.turn)" />
                    </div>
                    <div class="cards-wrapper">
                        <div class="card" v-for="(card, index) of players[2].hand.cards" :key="card._id"
                            :style="{ transform: `translateX(${(index - players[2].hand.cards.length / 2) * 10}px)` }">
                            <CardBack />
                        </div>
                    </div>
                </div>
                <div class="player" v-if="players[3]">
                    <div class="player-name" v-if="players[3].username">
                        {{ players[3].username }}
                        <font-awesome-icon icon="fa-solid fa-user" v-show="isMyTurn(players[3]._id, game.turn)" />
                    </div>
                    <div class="cards-wrapper">
                        <div class="card" v-for="(card, index) of players[3].hand.cards" :key="card._id"
                            :style="{ transform: `translateX(${(index - players[3].hand.cards.length / 2) * 10}px)` }">
                            <CardBack />
                        </div>
                    </div>
                </div>
            </div>
            <Modal modalClass="modal-colors" title='Wild' mask v-model:visible="isVisible" offsetTop="25%">
                <h2>Choose your color !</h2>
                <div class="color-btns">

                    <button @click="selectColor('red')" :style="{ 'background-color': 'red' }">

                    </button>
                    <button @click="selectColor('green')" :style="{ 'background-color': 'green' }">

                    </button>
                    <button @click="selectColor('blue')" :style="{ 'background-color': 'blue' }">

                    </button>
                    <button @click="selectColor('yellow')" :style="{ 'background-color': 'yellow' }">

                    </button>
                </div>
            </Modal>
            <Modal modalClass="modal-colors" title='Warning' mask v-model:visible="leaveVisible" offsetTop="25%" :okButton="{
            }">
                <h2>
                    Leaving the game before it's over will result in a warning, 3 warnings and you'll be banned
                </h2>
                <button @click="leaveGame">
                    Leave
                </button>
            </Modal>
            <div class="game-table">
                <div class="game-table-wrapper">
                    <div class="card current" v-if="game.currentCard">
                        <CardComponent :color="game.currentCard.color" :value="game.currentCard.value"
                            :type="game.currentCard.type" />
                    </div>
                    <div class="current-color" v-if="game.currentColor" :style="{ backgroundColor: game.currentColor }">
                    </div>
                    <div class="card deck" @click="emitDraw">
                        <CardBack />
                    </div>
                </div>
                <div class="end-btn" @click="leave">
                    <button>
                        <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                    </button>
                </div>
            </div>
            <div class="bottom-player">
                <div class="player" v-if="players[0]">
                    <div class="player-name" v-if="players[0].username">
                        {{ players[0].username }}
                        <font-awesome-icon icon="fa-solid fa-user" v-show="isMyTurn(players[0]._id, game.turn)" />
                    </div>
                    <div class="cards-wrapper" v-if="players[0]?.hand?.cards">
                        <div class="card" v-for="(card, index) of players[0].hand.cards" :key="card._id"
                            :style="{ transform: `translateX(${(index - players[0].hand.cards.length / 2) * 35}px)` }">
                            <CardComponent :color="card.color" :value="card.value" :type="card.type"
                                @native-click="emitEvent(players[0]._id, game._id, card)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import CardComponent from './cards/CardComponent.vue';
import CardBack from './cards/CardBack.vue';
import io from 'socket.io-client';
import { toast } from 'vue3-toastify';
import { Modal } from 'usemodal-vue3';

export default {
    components: {
        CardComponent,
        CardBack,
        Modal
    },
    data() {
        return {
            game: {},
            players: [{}],
            isLoading: false,
            errorMessage: null,
            socket: null,
            userId: null,
            isVisible: false,
            leaveVisible: false,
            selectedCard: null,
            indexes: [{}],
            wonVisible: false,
            lostVisible: false
        }
    },
    async created() {
        this.userId = JSON.parse(localStorage.getItem('user'))._id;
        await this.getGame();
        this.socket = io(process.env.VUE_APP_API_URL);
        this.socket.on('connection', () => {
            this.getGame()
        })
        this.socket.on('startGameResponse', (response) => {
            console.log("startGameResponse", response)
            if (response.success) {
                this.getGame();
            } else {
                toast.error(response.message, {
                    autoClose: 3000,
                });
            }
        })
        this.socket.on('playCardResponse', (response) => {
            if (response.success) {
                this.getGame();
            } else {
                toast.error(response.message, {
                    autoClose: 3000,
                });
            }
        })
        this.socket.on('drawCardResponse', (response) => {
            if (response.success) {
                this.getGame();
            } else {
                toast.error(response.message, {
                    autoClose: 3000,
                });
            }
        })
        this.socket.on('endGameResponse', (response) => {
            if (response.success) {
                if (response.winner === this.userId) {
                    this.wonVisible = true;
                } else {
                    this.lostVisible = true;
                }
            }
        })
        this.socket.on('leaveGameResponse', (response) => {
            if (response.success) {
                this.getGame();
            } else {
                toast.error(response.message, {
                    autoClose: 3000,
                });
            }
        })
    },
    methods: {
        async getGame() {
            this.isLoading = true;
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    'Authorization': 'Bearer ' + token,
                };

                const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/v1/games/${this.$route.params.id}`, { headers });
                const responseData = response.data.data;
                this.game = responseData.game;

                this.indexes = responseData.players.map((player, index) => ({
                    id: player._id,
                    index: index
                }))
                const userPlayer = responseData.players.find(player => player._id === this.userId);
                if (userPlayer) {
                    const otherPlayers = responseData.players.filter(player => player._id !== this.userId);
                    this.players = [userPlayer, ...otherPlayers];
                } else {
                    this.players = response.players;
                }
                console.log(responseData);
                if (response.status === 200) {
                    this.game = response.data.data.game;
                } else {
                    this.errorMessage = response.data.message;
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    this.errorMessage = error.response.data.message;
                } else {
                    this.errorMessage = 'Une erreur est survenue, veuillez réessayer plus tard.';
                }
            } finally {
                this.isLoading = false;
            }
        },
        emitEvent(playerId, gameId, card) {
            if (card.type === 'wild' || card.type === 'draw4') {
                this.selectedCard = card;
                this.isVisible = true;
            } else if (card.type === 'reverse' || card.type === 'draw2' || card.type === 'skip'
                || card.type === 'number') {
                this.socket.emit('playCard', { gameId: gameId, playerId: playerId, cardId: card._id });
            }
        },
        selectColor(color) {
            this.isVisible = false;
            this.socket.emit('playCard', { gameId: this.game._id, playerId: this.userId, cardId: this.selectedCard, color });
        },
        emitDraw() {
            if (this.game.status !== 'started') {
                return;
            }
            this.socket.emit('drawCard', { playerId: this.userId, gameId: this.game._id });
        },
        isMyTurn(playerId, turn) {
            const player = this.indexes.find(index => index.id === playerId);

            if (player && player.index === turn) {
                return true;
            }

            return false;
        },
        startGame() {
            this.socket.emit('startGame', { gameId: this.game._id, playerId: this.userId });
        },
        leave() {
            this.leaveVisible = true;
        },
        leaveGame() {
            console.log("leaveGame")
            this.socket.emit('leaveGame', { gameId: this.game._id, playerId: this.userId });
            this.$router.push({ name: 'HomePage' });
        }
    }
}
</script>
<style scoped>
@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

@keyframes flip {
    0% {
        transform: rotateY(0deg);
    }

    50% {
        transform: rotateY(180deg);
    }

    100% {
        transform: rotateY(360deg);
    }
}

.end-btn {
    transform: translateY(90px);
    position: absolute;
}

.end-btn button {
    cursor: pointer;
    background-color: #fe6368;
    padding: 5px 20px;
    border-radius: 15px;
    border: 0px;
    color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    transition: all 0.2s ease-in-out;
}

.game-message {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.game-message button {
    cursor: pointer;
    background-color: #fe6368;
    padding: 5px 20px;
    border-radius: 15px;
    border: 0px;
    color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    transition: all 0.2s ease-in-out;
}

.game-message button:hover {
    background-color: #fa121a;
    transition: all 0.2s ease-in-out;
}

.end-btn button:hover {
    background-color: #fa121a;
    transition: all 0.2s ease-in-out;
}

.timer {
    position: absolute;
    background-color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    transform: translateY(-90px);
}

.home-btn {
    position: absolute;
    transform: translateY(200px);
}

.home-btn {
    cursor: pointer;
    background-color: #fe6368;
    padding: 5px 20px;
    border-radius: 15px;
    border: 0px;
    color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    transition: all 0.2s ease-in-out;
}

.home-btn:hover {
    background-color: #fa121a;
    transition: all 0.2s ease-in-out;
}

.strikes-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-bottom: 5px;
    padding: 5px 10px;
    border-radius: 10px;
    gap: 5px;
    width: fit-content;
    background-color: white;
}

.strikes-container svg {
    color: red;
    font-size: 20px;
}

.modal-colors h2 {
    color: black;
}

.modal-colors .modal-vue3-content {
    background-color: #f5f5f500 !important;
}

.modal-colors button {
    height: 50px;
    width: 50px;
    border-radius: 50%;
}

.color-btns {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.flip-animation {
    animation: flip 3s infinite;
}

.game-container {
    margin: auto;
    max-width: 100vw;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-size: 200% 200%;
    background-image: linear-gradient(45deg, #f41219 0%, #ffb164 50%, #f4f420 100%);
    animation: gradient 10s ease infinite;
}

.game-board {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: auto;
    overflow: hidden;
    gap: 30px;
}

.game-table {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.game-table-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    margin: auto;
    gap: 30px;
}

.current-color {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

.card {
    width: 100px;
    height: 150px;
    border-radius: 10px;
    position: absolute;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    scale: 1;
    transition: all 0.2s ease-in-out;
}

.current,
.deck {
    width: 150px;
    height: 200px;
    position: relative;
}

.deck {
    cursor: pointer;
}

.bottom-player {
    position: relative;
    height: 230px;
    width: 100%;
}

.bottom-player .card:hover {
    scale: 1.1 !important;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    z-index: 10;
}

.opponents {
    display: flex;
    justify-content: space-evenly;
    gap: 20px;
    position: relative;
    gap: 30px;
    width: 100%;
    height: 230px;
}

.middle-section {
    grid-area: middle-section;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    justify-content: space-between;
    align-items: center;
}

.right-player {
    transform: rotate(90deg);
}

.player {
    height: inherit;
}

.player .player-name {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 700;
    padding: 5px 10px;
    margin: auto;
    width: fit-content;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.556);
    border-radius: 10px;
}

.player .cards-wrapper {
    position: relative;
    display: flex;
    padding-top: 10px;
    min-width: 400px;
    height: 75%;
    justify-content: center;
    padding: 10px 50px;
}

/* This is the track of the scrollbar */
.player .cards-wrapper::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #F5F5F5;
}

/* This is the handle of the scrollbar */
.player .cards-wrapper::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #F90;
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%,
            transparent 50%, rgba(255, 255, 255, .2) 50%,
            rgba(255, 255, 255, .2) 75%, transparent 75%,
            transparent)
}

.player .cards-wrapper::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.isometric_vijf {
    fill: #F29227;
}

.isometric_zeven {
    fill: #FF7344;
}

.isometric_acht {
    fill: #F05A28;
}

.isometric_tien {
    fill: #7BD6C4;
}

.isometric_twaalf {
    fill: #569080;
}

.isometric_dertien {
    fill: #225B49;
}

.st0 {
    fill: #FFBB33;
}

.st1 {
    fill: #BE1E2D;
}

.st2 {
    fill: #F29227;
}

.st3 {
    fill: #F8F7C5;
}

.st4 {
    fill: #F5DF89;
}

.st5 {
    fill: #6B9086;
}

.st6 {
    fill: none;
}

.st7 {
    fill: #72C0AB;
}

.st8 {
    fill: #AD9A74;
}

.st9 {
    fill: #F2D76C;
}

.st10 {
    fill: #F28103;
}

.st11 {
    fill: #225B49;
}

.st12 {
    fill: #7BD6C4;
}

.st13 {
    fill: #FF7344;
}

.st14 {
    fill: #F05A28;
}
</style>