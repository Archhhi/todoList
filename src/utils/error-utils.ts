import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {Dispatch} from 'redux';
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch:
                                           Dispatch<ServerErrorActionsType>,
                                         message: string) => {
  dispatch(setAppErrorAC(message))
  dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T>(dispatch: Dispatch<ServerErrorActionsType>,
                                        data: ResponseType<T>) => {
  dispatch(setAppErrorAC(data.messages[0]))
  dispatch(setAppStatusAC("failed"))
}

type ServerErrorActionsType = SetAppStatusActionType | SetAppErrorActionType