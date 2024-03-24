
const frame = document.querySelector<HTMLDivElement>('#frame');
let barrierList:any = [];
const SPACE_HEIGHT:number = 200;
const BARRIERS_Width:number = 120;
let barriersIntrival:number = 1500;
let barrierSpeed:number = .01;
let spaceBetweenBarriers:number = .9;
let timeSinceLastBarrier:number = 0;
let passedBarriersCount:number = 0

class Barriers {
    creatBarrier(position:string):HTMLDivElement{
        const img = document.createElement('img') as HTMLImageElement;
        img.src = `./images/barrier-${position}.png`;
        const barrier = document.createElement('div') as HTMLDivElement; 
        barrier.classList.add('barrier' , `barrier--${position}`);
        barrier.appendChild(img);
        return barrier
    }
    creatBarriers():void{
        const barriers = document.createElement('div') as HTMLDivElement;
        barriers.classList.add('barriers');
        const topBarrier = this.creatBarrier('top');
        const bottomBarrier = this.creatBarrier('bottom');
        barriers.append(topBarrier,bottomBarrier);
        barriers.style.setProperty('--frame-height' , 
        `${this.setFlyingSpace(SPACE_HEIGHT * 1.5 , window.innerHeight - SPACE_HEIGHT * .5)}`
        );
        const barriersData = {
            get left(){
                return parseFloat(getComputedStyle(barriers).getPropertyValue('--barrier-left'))
            },
            set left(value:number){
                barriers.style.setProperty("--barrier-left", `${value}`)
            },
            remove(){
                barrierList = barrierList.filter((barriers:any) => barriers !== barriersData);
                barriers.remove();
            },
            getRecs(){
                return [
                    topBarrier.getBoundingClientRect(),
                    bottomBarrier.getBoundingClientRect()
                ]
            }
        }
        barriersData.left = window.innerWidth;
        frame?.append(barriers)
        barrierList.push(barriersData)
    }
    setFlyingSpace(min:number,max:number):number{
        return Math.floor(Math.random() * ((max - min) + 1) + min)
    }
}

 
let barriers = new Barriers();

export function updateBarriersDuration(timeBetween:number):void {
    timeSinceLastBarrier += timeBetween ;
    if (timeSinceLastBarrier > barriersIntrival) {
      timeSinceLastBarrier -= barriersIntrival; 
      barriers.creatBarriers();
    } 

    barrierList.forEach((barriers:any):void|boolean=> {
        if (barriers.left + BARRIERS_Width < 0) {
            passedBarriersCount++;
            barriers.remove();
            return true
        }
        barriers.left = barriers.left - timeBetween * (barrierSpeed + spaceBetweenBarriers);
    });
}


export function configreBarriers():void{
    document.body.style.setProperty('--barrier-width' , `${BARRIERS_Width}`);
    document.body.style.setProperty('--space-height' , `${SPACE_HEIGHT}`);
    timeSinceLastBarrier = barriersIntrival;
    passedBarriersCount = 0;
    barrierList.forEach((barriers:any) => barriers.remove());
    barrierList = [];
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


export function getBarriersDimention():Dymention[]{
    return barrierList.flatMap((barriers:any)=> barriers.getRecs())
}

export function getPassedBarriersCount():number {
    return passedBarriersCount
}

