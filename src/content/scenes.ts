export const scenes = [
  { id: 'about', path: '/about', letter: 'T', title: 'ABOUT', zh: '关于', number: '01', kind: 'type' },
  { id: 'work', path: '/journey', letter: 'H', title: 'JOURNEY', zh: '旅程', number: '02', kind: 'place' },
  { id: 'games', path: '/work', letter: 'I', title: 'WORK', zh: '作品', number: '03', kind: 'folder' },
  { id: 'social', path: '/social', letter: 'S', title: 'SOCIAL', zh: '社交', number: '04', kind: 'social' },
  { id: 'life', path: '/life', letter: 'H', title: 'LIFE', zh: '生活', number: '05', kind: 'photo' },
  { id: 'ideas', path: '/archive', letter: 'I', title: 'ARCHIVE', zh: '档案', number: '06', kind: 'archive' },
] as const;
export type Scene = typeof scenes[number];
export function sceneAt(path: string) {
  return scenes.find(scene => scene.path === path.replace(/\/$/, ''));
}


// A current-world link is also the return-home link. Shared by SSR and client navigation.
export function letterDestination(target: Scene, current?: Scene) {
  return target.id === current?.id ? undefined : target;
}
