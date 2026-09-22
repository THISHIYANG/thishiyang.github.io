import { worlds, type Language } from '../content/worlds';

let language: Language = 'en';
let selected: string | null = null;
let field = false;
const copy = {
  en: { universe: 'A PERSONAL UNIVERSE', six: 'SIX LETTERS. MANY WORLDS.', intro: 'A little of who I am. A lot of what I make.', footer: 'ALWAYS A WORK IN PROGRESS', hello: 'HELLO, YOU.', hint: 'Pick a letter. Follow your curiosity.', stage: 'A WORLD IN THE MAKING', field: 'FIELD / VISUAL PREVIEW', fieldNote: 'A different light. More room to play.' },
  zh: { universe: '一个私人的创作宇宙', six: '六个字母，许多世界。', intro: '一点关于我，更多关于我的创作。', footer: '一直在探索，一直在创造', hello: '你好，欢迎。', hint: '选一个字母，跟着好奇心走。', stage: '这个世界正在酝酿', field: 'FIELD / 视觉预览', fieldNote: '换一种光线，多一点玩心。' },
};
const letterButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-world]')];
const title = document.querySelector<HTMLElement>('[data-detail-title]')!;
const note = document.querySelector<HTMLElement>('[data-detail-note]')!;
const stage = document.querySelector<HTMLElement>('[data-detail-stage]')!;

function detail(id: string | null) {
  const world = worlds.find(world => world.id === id);
  title.textContent = world ? `${world.letter} / ${world[language]}` : field ? copy[language].field : copy[language].hello;
  note.textContent = world ? (language === 'en' ? world.note : world.noteZh) : field ? copy[language].fieldNote : copy[language].hint;
  stage.textContent = world ? copy[language].stage : '';
}

letterButtons.forEach(button => {
  button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') detail(button.dataset.world!); });
  button.addEventListener('pointerleave', () => detail(selected));
  button.addEventListener('focus', () => detail(button.dataset.world!));
  button.addEventListener('blur', () => detail(selected));
  button.addEventListener('click', () => {
    selected = selected === button.dataset.world ? null : button.dataset.world!;
    letterButtons.forEach(item => item.setAttribute('aria-pressed', String(item.dataset.world === selected)));
    detail(selected);
  });
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  selected = null;
  letterButtons.forEach(button => button.setAttribute('aria-pressed', 'false'));
  detail(null);
});
document.querySelectorAll<HTMLButtonElement>('[data-language]').forEach(button => {
  button.addEventListener('click', () => {
    language = button.dataset.language as Language;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll<HTMLElement>('[data-copy]').forEach(element => {
      element.textContent = copy[language][element.dataset.copy as keyof typeof copy.en];
    });
    document.querySelectorAll<HTMLButtonElement>('[data-language]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    letterButtons.forEach((item, index) => {
      item.setAttribute('aria-label', `${worlds[index].letter} — ${worlds[index][language]}`);
      item.querySelector('[data-world-label]')!.textContent = worlds[index][language];
    });
    detail(selected);
  });
});
document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach(button => {
  button.addEventListener('click', () => {
    field = button.dataset.mode === 'field';
    document.documentElement.dataset.mode = field ? 'field' : 'index';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', field ? '#0A0A0A' : '#F4F4EF');
    document.querySelectorAll<HTMLButtonElement>('[data-mode]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    detail(selected);
  });
});
document.querySelector<HTMLElement>('[data-controls]')!.hidden = false;
