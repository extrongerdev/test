import { useDispatch, useSelector } from "react-redux"
import API from "../api/Api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth);
    const dispatch = useDispatch();


    const startLogin = async({ email, password }) => {
        // app en estado de carga
       dispatch( onChecking());

        try {

            const { data } = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({ name: data.name, uid: data.uuid }));

        } catch(error){
            dispatch( onLogout('Email or Password wrong'));
            setTimeout(() => {
                dispatch( clearErrorMessage())
            }, 10)
        }
    }

    const startRegister = async({ name, email, password }) => {

        dispatch( onChecking());

        try {

            const { data } = await API.post('/auth/register', { name, email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({ name: data.name, uid: data.uuid }));

        } catch(error){
            dispatch( onLogout( error.response.data?.msg || 'User already exists'));
            setTimeout(() => {
                dispatch( clearErrorMessage())
            }, 10)
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch(onLogout());

        try{
            const { data } = await API.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({ name: data.name, uid: data.uuid }));

        } catch(error){
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    return {
        // Propiedades
        status, 
        user, 
        errorMessage,
        //Metodos (acciones para interactuar con el store)
        startLogin,
        startRegister,
        checkAuthToken
    }
}