const STORAGE_KEY = 'preevon-theme';
const THEMES = ['light', 'dark'];

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const getStoredTheme = () => {
  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  return THEMES.includes(savedTheme) ? savedTheme : getSystemTheme();
};

export const applyTheme = (theme) => {
  const nextTheme = THEMES.includes(theme) ? theme : 'light';
  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.style.colorScheme = nextTheme;
  window.localStorage.setItem(STORAGE_KEY, nextTheme);
  return nextTheme;
};

export const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme || getStoredTheme();
  return applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
};
