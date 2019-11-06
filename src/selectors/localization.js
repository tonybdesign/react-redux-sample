import { createSelector } from 'reselect';

const localizationSelector = (state) => state.localization;

export const selectLanguage = createSelector(
  localizationSelector,
  (localization) => localization.language,
);
