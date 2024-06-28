import "../../../css/auth.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

interface Response{
    email: string,
    tokens: Tokens
}

interface Tokens{
    access_token: string,
    refresh_token: string
}

const SignInForm: React.FC = () => {

    const [inputLogin, setInputLogin] = useState('');
    const [inputPassword1, setInputPassword1] = useState('');
    const navigate = useNavigate();

    const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputLogin(event.target.value);
    };

    const validateLogin = (login: string) => {
        if (login.length > 0 && login.length < 6){
            return (
                <div className={"error-block"}>
                    Длинна логина должна быть не менее 6 символов
                </div>
            )
        }
    }

    const handleChangePassword1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputPassword1(event.target.value);
    };

    const validatePassword1 = (password: string) => {
        if (password.length > 0 && password.length < 8){
            return (
                <div className={"error-block"}>
                    Длинна пароля должна быть не менее 8 символов
                </div>
            )
        }
    }

    const checkErrors = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const formData = {
            email: inputLogin,
            password: inputPassword1,
        };

        try {
            const response = await axios.post<Response>("http://localhost:8080/auth/sign-in", formData);

            if (response.status === 200) {
                const data = response.data;
                Cookies.set('userEmail', data.email, { expires: 7, secure: true });
                Cookies.set('accessToken', data.tokens.access_token, { expires: 7, secure: true });
                Cookies.set('refreshToken', data.tokens.refresh_token, { expires: 7, secure: true });
                console.log(Cookies.get())
                navigate('/');
            } else {
                alert("ошибка при входе");
            }
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div className={"auth-page"}>
            <div className={"auth-container"}>
                <div className={"form-container"}>
                    <h3 className={"input-title"}>Login</h3>
                    <input className={'input-data'} value={inputLogin} onChange={handleChangeLogin} type="text"/>
                    {validateLogin(inputLogin)}

                    <h3 className={"input-title"}>Password</h3>
                    <input className={'input-data'} value={inputPassword1} onChange={handleChangePassword1} type="password"/>
                    {validatePassword1(inputPassword1)}

                    <button className={"button-input-data"} onClick={checkErrors}>Sign In</button>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
