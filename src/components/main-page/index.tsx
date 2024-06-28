import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../../css/main-page.scss";

interface User {
    Email: string;
    UserName: string;
    Birth: string;
}

interface SubscriptionData {
    [key: string]: User;
}

interface NewTokens {
    access_token: string;
    refresh_token: string;
}

const MainPage: React.FC = () => {
    const [subs, setSubs] = useState<SubscriptionData>({});
    const navigate = useNavigate();
    const [albums, setAlbums] = useState<[]>([]!)!;
    const [inputRootUser, setRootUser] = useState('')
     
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<SubscriptionData>("http://localhost:8080/api/subscription-list", {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    }
                });
               
                setSubs(response.data);

                
            } catch (error: any) {
                if (error.response?.status === 401){
                    let reqData = {
                        email: Cookies.get("userEmail"),
                        refresh_token: Cookies.get("refreshToken")
                    }
                    try {
                        const responseUpdate = await axios.post<NewTokens>("http://localhost:8080/auth/update-access-token", reqData)
                        const data = responseUpdate.data;
                        Cookies.set('accessToken', data.access_token, { expires: 7, secure: true });
                        Cookies.set('refreshToken', data.refresh_token, { expires: 7, secure: true });
                        window.location.reload()
                    } catch (error: any){
                        navigate('/auth/sign-in');
                    }
                    
                }
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleBeforeUnload = () => {
          console.log('Страница загруженна');
        };
        window.addEventListener('beforeload', handleBeforeUnload);
    }, []);

    const handleClickUnsubscribe = async (email: string) => {
        try {
            const response = await axios.post<Response>(
              `http://localhost:8080/api/unsubscribe?root-email=${email}&subs-email=${Cookies.get("userEmail")}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
              }
            );
    
            if (response.status === 200) {
                alert("вы успешно отписались");
                const subscriptionResponse = await axios.get<SubscriptionData>("http://localhost:8080/api/subscription-list", {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    }
                });
               
                setSubs(subscriptionResponse.data);
            } else {
                alert("ошибка при входе");
            }
        } catch (err) {
            console.log(err);
        }
    }
    

    const availableSubscriptions = () => {
        let subscriptionsList: React.ReactNode[] = [];

        Object.entries(subs).forEach(([email, user]) => {
            subscriptionsList.push(
                <li className={"sub-elem"} key={email}>
                    {email} {user.UserName} {user.Birth} <button onClick={() => handleClickUnsubscribe(email)}>Отписаться</button>
                </li>
            );
        });

        return <ul>{subscriptionsList}</ul>;
    };

    const handleChangeRootUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRootUser(event.target.value)
    }

    const handleAddSubscriber = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (inputRootUser){
          try {
            const response = await axios.post<Response>(
              `http://localhost:8080/api/subscribe?root-email=${inputRootUser}&subs-email=${Cookies.get("userEmail")}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
              }
            );
          
            if (response.status === 200) {
                alert("вы успешно подписались");
                const response = await axios.get<SubscriptionData>("http://localhost:8080/api/subscription-list", {
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`
                }
              });
             
              setSubs(response.data);
            } else {
                alert("ошибка при входе");
            }
          } catch (err){
            console.log(err)
            
          }
        }
        
    }
    
    return (
        <div className={"index-page-container"}>
            <div className={"user-info-container"}>
                <strong>Добро пожаловать {Cookies.get("userEmail")}</strong>
            </div>
            <div className={"subscribe-container"}>
                <form onSubmit={handleAddSubscriber}>
                    <input className={"input-data"} value={inputRootUser} onChange={handleChangeRootUser} type="text" />
                    <input type="submit" value="подписаться" />
                </form>
            </div>
            <div className={"subs-list-container"}>
                {Object.keys(subs).length > 0 && availableSubscriptions()}
            </div>
        </div>
    );
};

export default MainPage;
