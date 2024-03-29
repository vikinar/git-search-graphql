import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '@src/app/store'

export type AppThunkDispatch = ThunkDispatch<RootState, AppDispatch, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
