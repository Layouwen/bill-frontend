type SizeUnit = 'kb' | 'M';

export function getLocalStorageSize(unit: SizeUnit = 'M') {
  let size = 0;
  for (const item in window.localStorage) {
    if (window.localStorage.hasOwnProperty(item)) {
      size += window.localStorage[item].length;
    }
  }
  switch (unit) {
    case 'kb':
      return (size / 1024).toFixed(2) + 'kb';
    case 'M':
      return (size / 1024 / 1024).toFixed(2) + 'M';
    default:
      return size;
  }
}

export function clearLocalStorage() {
  window.localStorage.clear();
}
