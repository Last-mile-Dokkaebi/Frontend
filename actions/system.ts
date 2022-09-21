import { createAction } from '@reduxjs/toolkit';

export const openModalAction = createAction('system/openModal');
export const closeModalAction = createAction('system/closeModal');
export const startLoadingAction = createAction('system/startLoading');
export const endLoadingAction = createAction('system/endLoading');
export const setErrorAction = createAction<string | null>('system/error');
export const deleteErrorAction = createAction('system/delete');
