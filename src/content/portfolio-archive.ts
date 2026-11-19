import { getProjects } from './projects';

export interface ArchiveWork {
  id: string; name: string; chinese?: string; title: string; date: string;
  tagline?: string; role?: string; description?: string;
  slots: { ratio: string; label: string }[];
  projectSlug?: string;
}
export interface ArchiveChapter { id: string; number: string; title: string; works: ArchiveWork[] }
const slot = (ratio: string, label: string) => ({ ratio, label });
export const portfolioChapters: ArchiveChapter[] = [
  { id:'character',number:'I',title:'CHARACTER CONCEPT DESIGN',works:[
    {id:'04',name:'HAINUO',chinese:'《王者荣耀》英雄海诺概念设计',title:'HAINUO / HERO CONCEPT DESIGN',date:'2022.07 — 2022.12',slots:[slot('16 / 9','CHARACTER ARTWORK'),slot('4 / 5','CONCEPT EXPLORATION'),slot('4 / 5','DESIGN SHEET')]},
    {id:'05',name:'CLAUDIUS',chinese:'太空歌剧牛仔',title:'SPACE OPERA COWBOY / CLAUDIUS',date:'2023.11 — 2024.02',slots:[slot('4 / 5','CHARACTER ARTWORK'),slot('3 / 2','DESIGN SHEET')]},
    {id:'06',name:'PANSY',chinese:'三色堇',title:'PANSY / THE CROUPIER OF MEMORY',date:'2020.11 — 2021.02',slots:[slot('4 / 5','CHARACTER ARTWORK'),slot('3 / 2','DESIGN SHEET')]},
  ]},
  {id:'indie',number:'II',title:'ORIGINAL INDIE GAME',works:[
    {id:'02',name:'ASTRA NEXUS',chinese:'群星',title:'ASTRA NEXUS',date:'2026.09 — 2026.10',tagline:'A routine repair. An unresolved history.',slots:[slot('16 / 9','GAME VISUAL IDENTITY'),slot('16 / 9','GAME INTERFACE / TERMINAL'),slot('16 / 9','GAMEPLAY SHOWCASE')]},
    {id:'03',name:'TOYDUET',chinese:'玩具岛',title:'TOYDUET',date:'2026.10 — 2026.11',tagline:'Every little thing plays a part.',slots:[slot('4 / 5','VISUAL IDENTITY'),slot('16 / 9','GAME INTERFACE'),slot('16 / 9','GAMEPLAY SHOWCASE')]},
  ]},
  {id:'board',number:'III',title:'ORIGINAL BOARD GAME',works:[
    {id:'01',name:'PSEUDO-HUMAN TEST',chinese:'伪人测试',title:'PSEUDO-HUMAN TEST',date:'2024.08 — 2025.08',role:'Co-founder / Game Designer / Project Management / Crowdfunding Lead',description:'原创桌游项目，涵盖游戏设计、项目管理与众筹推进。',slots:[slot('16 / 9','PRODUCT ARTWORK'),slot('3 / 2','GAME COMPONENTS'),slot('3 / 2','PLAY EXPERIENCE'),slot('3 / 2','PROJECT DOCUMENTATION')]},
  ]},
  {id:'illustration',number:'IV',title:'ILLUSTRATION',works:[
    {id:'07',name:'REFLECTION LINE',chinese:'失落河流的空间记忆',title:'REFLECTION LINE / SPATIAL MEMORIES OF LOST RIVERS',date:'2022.09 — 2023.12',slots:[slot('4 / 5','ILLUSTRATION'),slot('1 / 1','IMAGE STUDY'),slot('1 / 1','DETAIL')]},
    {id:'08',name:'NOW BUDDHA',chinese:'觉相',title:'NOW BUDDHA / A CONTEMPORARY VISUAL STUDY',date:'2022.05 — 2022.06',slots:[slot('4 / 5','ILLUSTRATION'),slot('1 / 1','VISUAL STUDY'),slot('1 / 1','DETAIL')]},
  ]},
  {id:'3d',number:'V',title:'3D ART',works:[
    {id:'09',name:'3D ART WORK',title:'3D ART WORK',date:'2020.09 — 2024.12',slots:[slot('3 / 2','SPATIAL STUDY'),slot('1 / 1','OBJECT STUDY'),slot('4 / 5','FORM STUDY'),slot('2 / 1','SCENE STUDY')]},
  ]},
  {id:'personal',number:'VI',title:'PERSONAL WORKS',works:[
    {id:'10',name:'PERSONAL WORKS',title:'PERSONAL WORKS',date:'2019.10 — 2026.11',tagline:'CHARACTER SKETCHES & VISUAL EXPLORATION',slots:[slot('4 / 5','CHARACTER SKETCHES'),slot('1 / 1','VISUAL EXPLORATION'),slot('3 / 2','DRAWING STUDY'),slot('4 / 5','PERSONAL EXPLORATION')]},
  ]},
];
// Stable project IDs are independent of per-chapter display numbering.
export const portfolioWorkNumber = (index: number) => String(index + 1).padStart(2, '0');
// Set projectSlug only when the corresponding documented collection entry exists.
export async function getPortfolioDetails() {
  const projects = await getProjects();
  const available = new Map(projects.map(project => [project.data.slug, '/work/' + project.data.slug]));
  return new Map(portfolioChapters.flatMap(chapter => chapter.works).flatMap(work => {
    const href = work.projectSlug && available.get(work.projectSlug);
    return href ? [[work.id, href] as const] : [];
  }));
}
