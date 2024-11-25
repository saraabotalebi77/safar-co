export default function ConvertSecondToTime(timer:number|null ){
    if(typeof timer=="number"){
        const minute = Math.trunc(timer/60)<10 ? `0${Math.trunc(timer/60)}`: `${Math.trunc(timer/60)}`;
        const second = Math.trunc(timer%60)<10 ? `0${timer%60}`:`${timer%60}`;
        return `${minute}:${second}`; 
    }
 return timer;
}