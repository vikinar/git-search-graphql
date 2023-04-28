import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '@src/app/store'

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>
export const useAppThunkDispatch = () => useDispatch<AppThunkDispatch>()

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
