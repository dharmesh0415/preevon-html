const STORAGE_KEY = 'preevon-theme';
const THEMES = ['light', 'dark', 'system'];
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const getSystemTheme = () => (mediaQuery.matches ? 'dark' : 'light');

export const getStoredTheme = () => {
  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  return THEMES.includes(savedTheme) ? savedTheme : 'system';
};

export const applyTheme = (theme) => {
  const preference = THEMES.includes(theme) ? theme : 'system';
  const resolvedTheme = preference === 'system' ? getSystemTheme() : preference;

  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = resolvedTheme;
  window.localStorage.setItem(STORAGE_KEY, preference);

  return { preference, resolvedTheme };
};

export const watchSystemTheme = (callback) => {
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
};
