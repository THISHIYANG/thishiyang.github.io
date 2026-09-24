export interface PortfolioItem { id: string; title: string; image: string | null; href: string | null }
export const portfolio: PortfolioItem[] = Array.from({length: 5}, (_, i) => ({id: String(i + 1).padStart(2, '0'), title: `PROJECT ${String(i + 1).padStart(2, '0')}`, image: null, href: null}));
