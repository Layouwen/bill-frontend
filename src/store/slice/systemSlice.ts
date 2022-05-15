import { audioWeb } from '@/modules/playSound';
import { clearLocalStorage, getLocalStorageSize } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';

interface SystemState {
  canPlay: boolean;
  localStorageSize: number | string;
  hasAudioCache: boolean;
}

const canPlay = localStorage.getItem('canPlay') === 'true' || false;

const initialState: SystemState = {
  canPlay,
  localStorageSize: getLocalStorageSize(),
  hasAudioCache: audioWeb.hasCache(),
};

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    syncAudioWebData() {
      canPlay && audioWeb.open();
    },
    updateHasAudioCache(state) {
      state.hasAudioCache = audioWeb.hasCache();
    },
    openPlay(state) {
      state.canPlay = true;
      audioWeb.open();
      localStorage.setItem('canPlay', 'true');
      systemSlice.caseReducers.updateHasAudioCache(state);
    },
    closePlay(state) {
      state.canPlay = false;
      audioWeb.close();
      localStorage.setItem('canPlay', 'false');
      systemSlice.caseReducers.updateHasAudioCache(state);
    },
    setStorageSize(state) {
      state.localStorageSize = getLocalStorageSize();
    },
    clearStorage(state) {
      clearLocalStorage();
      systemSlice.caseReducers.setStorageSize(state);
      systemSlice.caseReducers.closePlay(state);
    },
  },
});

export const {
  openPlay,
  closePlay,
  clearStorage,
  syncAudioWebData,
  setStorageSize,
} = systemSlice.actions;

export default systemSlice.reducer;
