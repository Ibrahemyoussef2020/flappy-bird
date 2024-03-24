import { updateBirdDuration  , setTop , moveBirdVertically , getBirdPosition } from "./bird.js";
import {updateBarriersDuration, configreBarriers , getPassedBarriersCount, getBarriersDimention} from './barriers.js';

document.addEventListener('keypress' , handleStart , {once:true})
const intro = document.querySelector<HTMLHeadingElement>('.intro');
const result = document.querySelector<HTMLHeadingElement>('.result');

let lastTime:number|null;


function resetGameSettings():void {
    setTop(+window.innerHeight / 2);
    document.removeEventListener('keydown', moveBirdVertically) ;
    document.addEventListener('keydown', moveBirdVertically) ;
}
 
function updateLoop(time:number):void|boolean{
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(updateLoop)
        return true
    }
    const timeBetween = time - lastTime;
    updateBirdDuration(timeBetween)
    updateBarriersDuration(timeBetween)

    if (hasFliedAway()) return handleLose();
    lastTime = time;
    window.requestAnimationFrame(updateLoop)
}

function handleStart():void {
    intro?.classList.add('hidden');
    resetGameSettings();
    configreBarriers();
    lastTime = null;
    window.requestAnimationFrame(updateLoop)
}

function hasFliedAway():boolean|null{
    const birdPosition = getBirdPosition();
    const crashedIntoBarriers = typeof birdPosition !== 'undefined' ? getBarriersDimention().some((barriersDymentions:any) => hasCrashedIntoBarriers(birdPosition,barriersDymentions)) : null;
    if (!birdPosition) {
        return false
    }
    const flyAway =  birdPosition.top < 0 || birdPosition.bottom > window.innerHeight;
    return flyAway || crashedIntoBarriers
}


type Dymention = {
    bottom:number,
    height:number,
    left:number,
    right:number,
    top:number,
    width:number,
    x:number,
    y:number
}


function hasCrashedIntoBarriers(firstBody:Dymention,secondBody:Dymention):boolean {
    return (
        firstBody.left < secondBody.right
        && firstBody.right > secondBody.left
        && firstBody.top < secondBody.bottom
        && firstBody.bottom > secondBody.top
    )
}

function handleLose():void {
    setTimeout(()=> {
        intro?.classList.remove('hidden');
        if (result != null) {
            result.textContent = `You have passed ${getPassedBarriersCount()} Barriers`;
        }
        document.addEventListener('keydown', handleStart, { once: true }) ;
    },200)
}