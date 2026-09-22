export type Language = 'en' | 'zh';

// Stable IDs distinguish the repeated H and I; future scenes attach here.
export const worlds = [
  { id: 'about', letter: 'T', en: 'About', zh: '关于', note: 'The person behind the letters.', noteZh: '字母背后的我。' },
  { id: 'work', letter: 'H', en: 'Work', zh: '作品', note: 'Made by hand. Led by curiosity.', noteZh: '亲手制作，好奇驱动。' },
  { id: 'games', letter: 'I', en: 'Games', zh: '游戏', note: 'Little worlds to get lost in.', noteZh: '可以走进去的小小世界。' },
  { id: 'social', letter: 'S', en: 'Social', zh: '连接', note: 'Somewhere our paths cross.', noteZh: '让我们的轨迹在此交汇。' },
  { id: 'life', letter: 'H', en: 'Life', zh: '生活', note: 'The everyday, noticed.', noteZh: '留意每一个日常。' },
  { id: 'ideas', letter: 'I', en: 'Ideas', zh: '想法', note: 'Things that could become things.', noteZh: '让念头慢慢长成些什么。' },
] as const;
