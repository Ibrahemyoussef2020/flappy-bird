const bird = document.querySelector('.bird');
let birdSbeed = .05;
let timeSinceLastJump = Number.MIN_SAFE_INTEGER;
const JUMP_DURATION = 200;
export function updateBirdDuration(timeBetween) {
    if (timeSinceLastJump < JUMP_DURATION) {
        setTop(getTop() - birdSbeed * timeBetween);
    }
    else {
        setTop(getTop() + birdSbeed * timeBetween);
    }
    timeSinceLastJump += timeBetween;
}
export function moveBirdVertically(e) {
    if (e.code != 'Space') {
        return undefined;
    }
    timeSinceLastJump = 0;
}
export function setTop(top) {
    const strTop = top.toString();
    bird === null || bird === void 0 ? void 0 : bird.style.setProperty('--bird-top', strTop);
}
function getTop() {
    if (bird === null) {
        return 0;
    }
    return parseFloat(getComputedStyle(bird).getPropertyValue('--bird-top'));
}
export function getBirdPosition() {
    return bird === null || bird === void 0 ? void 0 : bird.getBoundingClientRect();
}
