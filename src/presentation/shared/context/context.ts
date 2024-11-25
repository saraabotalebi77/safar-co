import { createContext } from 'react';
import { setState } from '../types';
interface IAuthenticateDialog {
    login: boolean,
    loginPassword: boolean,
    confirmCode: boolean,
    changePassword: boolean,
    resetPassword: boolean,
};
interface IMainContext {
    openAuthenticateDialog :boolean ,
    setOpenAuthenticateDialog : setState<boolean>,
    authenticateDialog : IAuthenticateDialog,
    selectAuthenticateDialogContent : (login: boolean,loginPassword: boolean,confirmCode: boolean,changePassword: boolean,resetPassword:boolean)=>void,
    token : string|undefined,
    setToken : setState<string|undefined>
}
const MainContext = createContext({} as IMainContext);

export {MainContext};