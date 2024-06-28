import {useEffect, useState} from "react";
import "../../../css/auth.scss";
import {log} from "util";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SighUpForm: React.FC = () => {
    const [inputEmail, setEmail] = useState('');
    const [inputFirstName, setFirstName] = useState('');
    const [inputLastName, setLastName] = useState('');
    const [inputSurname, setSurname] = useState('');
    const [inputBirth, setBirth] = useState('');
    const [inputPassword1, setPassword1] = useState('');
    const [inputPassword2, setPassword2] = useState('');
    const navigate = useNavigate();

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleChangeSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value);
    };

    const handleChangeBirth = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBirth(event.target.value.toString());
    };

    // const validateLastName = (login: string) => {
    //     if (login.length > 0 && login.length < 2){
    //         return (
    //             <div className={"error-block"}>
    //                 Поле должно быть заполненно!
    //             </div>
    //         )
    //     }
    // }

    const handleChangePassword1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword1(event.target.value);
    };

    const handleChangePassword2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword2(event.target.value);
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

    const validatePassword2 = (password1: string, password2: string) => {
        if (password1.length !== 0 && password1 !== password2){
            return (
                <div className={"error-block"}>
                    Пароли должны совпадать
                </div>
            )
        }
    }

    const checkErrors = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (inputFirstName.length === 0 || 
            inputLastName.length === 0 || 
            inputSurname.length === 0 ||
            inputEmail.length === 0 ||
            inputBirth?.toString() === "" ||
            inputPassword1.length < 8 ||
            inputPassword2.length < 8 ||
            inputPassword1 !== inputPassword2){
            alert('Введите правильно данные.\nПоле Surname не обязательно.');
            return;
        }

        const formData = {
            fist_name: inputFirstName,
            last_name: inputLastName,
            surname: inputSurname,
            email: inputEmail,
            password: inputPassword1,
            birth_date: inputBirth,
        };

        console.log(inputBirth)

        try {
            const response = await axios.post("http://localhost:8080/auth/sign-up", formData)

            if (response.status === 201) {
                navigate('/auth/sign-in');
            } else {
                alert('Произошла ошибка при регистрации');
            }


        } catch (e) {
            alert(e)
        }
    };

    return (
        <div className={"auth-page"}>
            <div className={"auth-container"}>
                <div className={"form-container"}>
                    <h3 className={"input-title"} >First name</h3>
                    <input className={'input-data'} value={inputFirstName} onChange={handleChangeFirstName} type="text"/>

                    <h3 className={"input-title"} >Last name</h3>
                    <input className={'input-data'} value={inputLastName} onChange={handleChangeLastName} type="text"/>

                    <h3 className={"input-title"} >Surname</h3>
                    <input className={'input-data'} value={inputSurname} onChange={handleChangeSurname} type="text"/>
                    
                    <h3 className={"input-title"} >Email</h3>
                    <input className={'input-data'} value={inputEmail} onChange={handleChangeEmail} type="text"/>

                    <h3 className={"input-title"} >Birth</h3>
                    <input className={'input-data'}  onChange={handleChangeBirth} type="date"/>

                    <h3 className={"input-title"}>Password</h3>
                    <input className={'input-data'} value={inputPassword1} onChange={handleChangePassword1} type="password"/>
                    {validatePassword1(inputPassword1)}

                    <h3 className={"input-title"}>Repeat password</h3>
                    <input className={'input-data'} value={inputPassword2} onChange={handleChangePassword2} type="password"/>
                    {validatePassword2(inputPassword2, inputPassword1)}

                    <button className={"button-input-data"} onClick={checkErrors}>sign up</button>
                </div>
            </div>
        </div>

    )
}

export default SighUpForm;