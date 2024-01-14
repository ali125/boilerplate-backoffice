import { SupportLanguages } from "@/config/translation/i18n";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SettingsState {
    language: SupportLanguages;
}

const initialState: SettingsState = {
    language: "en"
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setLanguage: (state, { payload }: PayloadAction<SettingsState["language"]>) => {
            state.language = payload;
        }
    }
});

export const { setLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;

