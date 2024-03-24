const frame = document.querySelector('#frame');
let barrierList = [];
const SPACE_HEIGHT = 200;
const BARRIERS_Width = 120;
let barriersIntrival = 1500;
let barrierSpeed = .01;
let spaceBetweenBarriers = .9;
let timeSinceLastBarrier = 0;
let passedBarriersCount = 0;
class Barriers {
    creatBarrier(position) {
        const img = document.createElement('img');
        img.src = `./images/barrier-${position}.png`;
        const barrier = document.createElement('div');
        barrier.classList.add('barrier', `barrier--${position}`);
        barrier.appendChild(img);
        return barrier;
    }
    creatBarriers() {
        const barriers = document.createElement('div');
        barriers.classList.add('barriers');
        const topBarrier = this.creatBarrier('top');
        const bottomBarrier = this.creatBarrier('bottom');
        barriers.append(topBarrier, bottomBarrier);
        barriers.style.setProperty('--frame-height', `${this.setFlyingSpace(SPACE_HEIGHT * 1.5, window.innerHeight - SPACE_HEIGHT * .5)}`);
        const barriersData = {
            get left() {
                return parseFloat(getComputedStyle(barriers).getPropertyValue('--barrier-left'));
            },
            set left(value) {
                barriers.style.setProperty("--barrier-left", `${value}`);
            },
            remove() {
                barrierList = barrierList.filter((barriers) => barriers !== barriersData);
                barriers.remove();
            },
            getRecs() {
                return [
                    topBarrier.getBoundingClientRect(),
                    bottomBarrier.getBoundingClientRect()
                ];
            }
        };
        barriersData.left = window.innerWidth;
        frame === null || frame === void 0 ? void 0 : frame.append(barriers);
        barrierList.push(barriersData);
    }
    setFlyingSpace(min, max) {
        return Math.floor(Math.random() * ((max - min) + 1) + min);
    }
}
let barriers = new Barriers();
export function updateBarriersDuration(timeBetween) {
    timeSinceLastBarrier += timeBetween;
    if (timeSinceLastBarrier > barriersIntrival) {
        timeSinceLastBarrier -= barriersIntrival;
        barriers.creatBarriers();
    }
    barrierList.forEach((barriers) => {
        if (barriers.left + BARRIERS_Width < 0) {
            passedBarriersCount++;
            barriers.remove();
            return true;
        }
        barriers.left = barriers.left - timeBetween * (barrierSpeed + spaceBetweenBarriers);
    });
}
export function configreBarriers() {
    document.body.style.setProperty('--barrier-width', `${BARRIERS_Width}`);
    document.body.style.setProperty('--space-height', `${SPACE_HEIGHT}`);
    timeSinceLastBarrier = barriersIntrival;
    passedBarriersCount = 0;
    barrierList.forEach((barriers) => barriers.remove());
    barrierList = [];
}
export function getBarriersDimention() {
    return barrierList.flatMap((barriers) => barriers.getRecs());
}
export function getPassedBarriersCount() {
    return passedBarriersCount;
}
