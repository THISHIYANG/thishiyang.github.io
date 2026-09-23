export interface ArchiveEntry { id: string; type: string; title: string; year: string; href: string | null }
export const archive: ArchiveEntry[] = ['ARTICLE','STUDY','RESEARCH','ARTICLE','GAME STUDIES','ESSAY','RESEARCH','ARTICLE'].map((type,i)=>({id:String(i+1).padStart(3,'0'),type,title:`UNTITLED ${type === 'GAME STUDIES' ? 'STUDY' : type}`,year:'2026',href:null}));
