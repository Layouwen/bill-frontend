import { audioWeb } from '@/modules/playSound';
import { createSlice } from '@reduxjs/toolkit';

interface SettingState {
  canPlay: boolean;
}

const canPlay = localStorage.getItem('canPlay') === 'true' || false;

const initialState: SettingState = {
  canPlay,
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    openPlay: (state) => {
      state.canPlay = true;
      audioWeb.open();
      localStorage.setItem('canPlay', 'true');
    },
    closePlay: (state) => {
      state.canPlay = false;
      audioWeb.close();
      localStorage.setItem('canPlay', 'false');
    },
  },
});

export const { openPlay, closePlay } = settingSlice.actions;

export default settingSlice.reducer;
