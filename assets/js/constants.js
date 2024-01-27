const CANVAS_H = 600;
const CANVAS_W = 800;

const FPS = 1000 / 60;

const KEY_UP = 87;
const KEY_DOWN = 83;
const KEY_FIRE = 32;

const KEY_LEFT = 65;
const KEY_RIGHT = 68;


const PJ_Y_PADDING = 250;
const PJ_X_PADDING = 79;
const PJ_SHOUT_INTERVAL = 200;
const PJ_RUN_ANIMATION_TICK = 100;
const PJ_ANIMATION_TICK = 50;
const PJ_TOP_LIMIT = 100;
const PJ_BOTTOM_LIMIT = 370;

const PJ_LEFT_LIMIT = 110;
const PJ_RIGHT_LIMIT = 680;

const ENEMY_Y_PADDING = 250;
const ENEMY_ANIMATION_TICK = 15;
const ENEMY_SPEED_MOVE = 1;

const BOSS_ANIMATION_TICK = 35;
const BOSS_X_PADDING = 335;
const BOSS_Y_PADDING = 60;

const FINISH_LINE = 140;

const ENEMY_SPAWN_TICK = 300;

const SPEED_MOVE = 5;
const SPEED_SHOUT = 5;
const SPEED_SHOUT_V = -5;

const SCORE_KEY = 'scores';

const POKEMONS1 = [
    {sprite: "/assets/img/enemies/Enemy1.png", w: Math.ceil(19 * 1.5), h: Math.ceil(15 * 1.5)},
    {sprite: "/assets/img/enemies/Enemy1B.png", w: Math.ceil(17 * 1.5), h: Math.ceil(17 * 1.5)},
    {sprite: "/assets/img/enemies/Enemy1C.png", w: Math.ceil(14 * 1.5), h: Math.ceil(13 * 1.5)},
    {sprite: "/assets/img/enemies/Enemy1D.png", w: Math.ceil(17 * 1.5), h: Math.ceil(17 * 1.5)}
]

const POKEMONS2 = [
    {sprite: "/assets/img/enemies/Enemy2.png", w: Math.ceil(20 * 1.8), h: Math.ceil(20 * 1.8)},
    {sprite: "/assets/img/enemies/Enemy2B.png", w: Math.ceil(17 * 1.8), h: Math.ceil(21 * 1.8)},
    {sprite: "/assets/img/enemies/Enemy2C.png", w: Math.ceil(27 * 1.7), h: Math.ceil(24 * 1.7)}
]

const POKEMONS3 = [
    {sprite: "/assets/img/enemies/Enemy3.png", w: Math.ceil(25 * 2), h: Math.ceil(22 * 2)},
    {sprite: "/assets/img/enemies/Enemy3B.png", w: Math.ceil(19 * 1.9), h: Math.ceil(19 * 1.9)},
    {sprite: "/assets/img/enemies/Enemy3CC.png", w: Math.ceil(24 * 1.7), h: Math.ceil(23 * 1.7)}
]
