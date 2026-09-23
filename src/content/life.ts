export interface LifePhoto { id: string; image: string | null; alt: string; date: string | null; place: string | null }
export const life: LifePhoto[] = Array.from({length:7},(_,i)=>({id:String(i+1).padStart(3,'0'),image:null,alt:'',date:null,place:null}));
