const STORAGE_KEY = 'preevon-theme';
const THEME_CHANGE_EVENT = 'preevon:themechange';
const THEMES = ['light', 'dark', 'system'];
const THEME_LABELS = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
let currentTheme = null;
let currentResolvedTheme = null;
let systemUnsubscribe = null;

const isTheme = (theme) => THEMES.includes(theme);
const normalizeTheme = (theme) => (isTheme(theme) ? theme : 'system');
const getSystemTheme = () => (mediaQuery.matches ? 'dark' : 'light');
const emitThemeChange = (detail) => {
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail }));
};

const persistTheme = (theme) => {
  window.localStorage.setItem(STORAGE_KEY, theme);
};

export const themeOptions = THEMES.map((theme) => ({ value: theme, label: THEME_LABELS[theme] }));
export const themeStorageKey = STORAGE_KEY;

export const getStoredTheme = () => normalizeTheme(window.localStorage.getItem(STORAGE_KEY));
export const resolveTheme = (theme = getTheme()) =>
  theme === 'system' ? getSystemTheme() : normalizeTheme(theme);
export const getTheme = () => currentTheme ?? getStoredTheme();
export const getResolvedTheme = () => currentResolvedTheme ?? resolveTheme(getTheme());

export const applyTheme = (theme, { persist = true, notify = true } = {}) => {
  const preference = normalizeTheme(theme);
  const resolvedTheme = resolveTheme(preference);
  const root = document.documentElement;
  const didChange = preference !== currentTheme || resolvedTheme !== currentResolvedTheme;

  currentTheme = preference;
  currentResolvedTheme = resolvedTheme;

  if (root.dataset.theme !== resolvedTheme) root.dataset.theme = resolvedTheme;
  if (root.dataset.themePreference !== preference) root.dataset.themePreference = preference;
  if (root.style.colorScheme !== resolvedTheme) root.style.colorScheme = resolvedTheme;
  if (persist) persistTheme(preference);

  const state = { preference, resolvedTheme };
  if (notify && didChange) emitThemeChange(state);

  return state;
};

export const setTheme = (theme) => applyTheme(theme);

export const toggleTheme = () => setTheme(getResolvedTheme() === 'dark' ? 'light' : 'dark');

export const watchSystemTheme = (callback) => {
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
};

export const subscribeToTheme = (callback) => {
  const listener = (event) => callback(event.detail);
  window.addEventListener(THEME_CHANGE_EVENT, listener);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, listener);
};

const handleSystemThemeChange = () => {
  if (getTheme() === 'system') applyTheme('system', { persist: false });
};

export const initThemeManager = () => {
  const state = applyTheme(getStoredTheme(), { notify: false });

  if (!systemUnsubscribe) systemUnsubscribe = watchSystemTheme(handleSystemThemeChange);

  return state;
};
