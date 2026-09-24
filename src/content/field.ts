export type FieldItemType =
  | 'GAME'
  | 'WORK'
  | 'ARTICLE'
  | 'SOCIAL'
  | 'LIFE'
  | 'NOTE';

export interface FieldItem {
  id: string;
  type: FieldItemType;
  title: string;
  number: string;

  x: number;
  y: number;

  rotation: number;

  width: number;
  height: number;

  z: number;

  year: number;
  status?: 'WIP' | 'RELEASED' | 'ARCHIVE';

  href?: string;
}

export const fieldItems: FieldItem[] = [
  {
    id: 'game-stone-myth',
    type: 'GAME',
    title: 'STONE MYTH',
    number: '001',
    x: 18,
    y: 30,
    rotation: -0.5,
    width: 240,
    height: 200,
    z: 6,
    year: 2026,
    status: 'WIP',
    href: '/work',
  },

  {
    id: 'work-motion',
    type: 'WORK',
    title: 'PIXEL MOTION',
    number: '003',
    x: 38,
    y: 38,
    rotation: 1,
    width: 205,
    height: 125,
    z: 4,
    year: 2026,
    status: 'WIP',
    href: '/work',
  },

  {
    id: 'game-prototype',
    type: 'GAME',
    title: 'PROTOTYPE 002',
    number: '002',
    x: 30,
    y: 18,
    rotation: 2,
    width: 155,
    height: 130,
    z: 3,
    year: 2026,
    status: 'WIP',
    href: '/work',
  },

  {
    id: 'article-stone',
    type: 'ARTICLE',
    title: 'STONE MYTHOLOGY',
    number: '005',
    x: 48,
    y: 67,
    rotation: -1,
    width: 190,
    height: 150,
    z: 3,
    year: 2026,
    status: 'ARCHIVE',
    href: '/archive',
  },

  {
    id: 'article-game',
    type: 'ARTICLE',
    title: 'GAME STUDY 001',
    number: '006',
    x: 62,
    y: 61,
    rotation: 1,
    width: 180,
    height: 145,
    z: 2,
    year: 2026,
    status: 'WIP',
    href: '/archive',
  },

  {
    id: 'social-instagram',
    type: 'SOCIAL',
    title: 'INSTAGRAM',
    number: '007',
    x: 82,
    y: 32,
    rotation: 2,
    width: 150,
    height: 130,
    z: 3,
    year: 2026,
    status: 'WIP',
    href: '/social',
  },

  {
    id: 'social-xhs',
    type: 'SOCIAL',
    title: 'XIAOHONGSHU',
    number: '008',
    x: 88,
    y: 48,
    rotation: -1,
    width: 160,
    height: 125,
    z: 2,
    year: 2026,
    status: 'WIP',
    href: '/social',
  },

  {
    id: 'life-photo-01',
    type: 'LIFE',
    title: 'PHOTO 001',
    number: '009',
    x: 18,
    y: 78,
    rotation: -2,
    width: 165,
    height: 145,
    z: 2,
    year: 2026,
    status: 'WIP',
    href: '/life',
  },

  {
    id: 'life-photo-02',
    type: 'LIFE',
    title: 'PHOTO 002',
    number: '010',
    x: 78,
    y: 78,
    rotation: 2,
    width: 170,
    height: 145,
    z: 2,
    year: 2026,
    status: 'WIP',
    href: '/life',
  },

  {
    id: 'note-making',
    type: 'NOTE',
    title: 'CURRENTLY MAKING',
    number: '011',
    x: 50,
    y: 22,
    rotation: 0,
    width: 130,
    height: 90,
    z: 2,
    year: 2026,
    status: 'WIP',
  },

  {
    id: 'note-thinking',
    type: 'NOTE',
    title: 'RECENTLY THINKING',
    number: '012',
    x: 35,
    y: 73,
    rotation: 2,
    width: 130,
    height: 90,
    z: 1,
    year: 2026,
    status: 'WIP',
  },
];