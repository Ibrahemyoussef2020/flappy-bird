const bird = document.querySelector<HTMLDivElement>('.bird');

let birdSbeed:number = .05;
let timeSinceLastJump = Number.MIN_SAFE_INTEGER;
const JUMP_DURATION:number = 200; 


export function updateBirdDuration(timeBetween:number):void {
   if (timeSinceLastJump < JUMP_DURATION) {
      setTop(getTop() - birdSbeed * timeBetween);  
   }
   else{
      setTop(getTop() + birdSbeed * timeBetween);
   }
   timeSinceLastJump += timeBetween  
}


export function moveBirdVertically(e:KeyboardEvent|any):void|undefined {
   if (e.code != 'Space') {
      return undefined
   } 
   timeSinceLastJump = 0;
}


 export function setTop(top:number):void {
    const strTop = top.toString();
    bird?.style.setProperty('--bird-top',strTop)
}

function getTop():number {
   if (bird === null) {
      return 0
   }    
   return parseFloat(getComputedStyle(bird).getPropertyValue('--bird-top'));
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

export function getBirdPosition():Dymention | undefined {
   return bird?.getBoundingClientRect();
} 

 