import { updateBirdDuration, setTop, moveBirdVertically, getBirdPosition } from "./bird.js";
import { updateBarriersDuration, configreBarriers, getPassedBarriersCount, getBarriersDimention } from './barriers.js';
document.addEventListener('keypress', handleStart, { once: true });
const intro = document.querySelector('.intro');
const result = document.querySelector('.result');
let lastTime;
function resetGameSettings() {
    setTop(+window.innerHeight / 2);
    document.removeEventListener('keydown', moveBirdVertically);
    document.addEventListener('keydown', moveBirdVertically);
}
function updateLoop(time) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(updateLoop);
        return true;
    }
    const timeBetween = time - lastTime;
    updateBirdDuration(timeBetween);
    updateBarriersDuration(timeBetween);
    if (hasFliedAway())
        return handleLose();
    lastTime = time;
    window.requestAnimationFrame(updateLoop);
}
function handleStart() {
    intro === null || intro === void 0 ? void 0 : intro.classList.add('hidden');
    resetGameSettings();
    configreBarriers();
    lastTime = null;
    window.requestAnimationFrame(updateLoop);
}
function hasFliedAway() {
    const birdPosition = getBirdPosition();
    const crashedIntoBarriers = typeof birdPosition !== 'undefined' ? getBarriersDimention().some((barriersDymentions) => hasCrashedIntoBarriers(birdPosition, barriersDymentions)) : null;
    if (!birdPosition) {
        return false;
    }
    const flyAway = birdPosition.top < 0 || birdPosition.bottom > window.innerHeight;
    return flyAway || crashedIntoBarriers;
}
function hasCrashedIntoBarriers(firstBody, secondBody) {
    return (firstBody.left < secondBody.right
        && firstBody.right > secondBody.left
        && firstBody.top < secondBody.bottom
        && firstBody.bottom > secondBody.top);
}
function handleLose() {
    setTimeout(() => {
        intro === null || intro === void 0 ? void 0 : intro.classList.remove('hidden');
        if (result != null) {
            result.textContent = `You have passed ${getPassedBarriersCount()} Barriers`;
        }
        document.addEventListener('keydown', handleStart, { once: true });
    }, 200);
}
