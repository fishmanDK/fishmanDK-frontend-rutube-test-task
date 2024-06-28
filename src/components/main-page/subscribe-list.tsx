// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios, { AxiosError } from "axios";
// import Cookies from "js-cookie";

// interface User {
//     Email: string;
//     UserName: string;
//     Birth: string;
// }

// interface SubscriptionData {
//     [key: string]: User;
// }

// interface NewTokens {
//     access_token: string,
//     refresh_token: string
// }

// const SubscribeList: React.FC = () => {
//     const [subs, setSubs] = useState<SubscriptionData>({});
//     const navigate = useNavigate();

    
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get<SubscriptionData>("http://localhost:8080/api/subscription-list", {
//                     headers: {
//                         Authorization: `Bearer ${Cookies.get("accessToken")}`
//                     }
//                 });
               
//                 setSubs(response.data);

                
//             } catch (error: any)  {
//                 if (error.response.status === 401){
//                     let reqData = {
//                         email: Cookies.get("userEmail"),
//                         refresh_token: Cookies.get("refreshToken")
//                     }
//                     try {
//                         const responseUpdate = await axios.post<NewTokens>("http://localhost:8080/auth/update-access-token", reqData)
//                         const data = responseUpdate.data;
//                         Cookies.set('accessToken', data.access_token, { expires: 7, secure: true });
//                         Cookies.set('refreshToken', data.refresh_token, { expires: 7, secure: true });
//                         window.location.reload()
//                     } catch (error: any){
//                         console.log(error);
//                     }
                    
//                 }
//                 console.log(error);
//             }
//         };

//         fetchData();
//     }, []);
    

//     const availableSubscriptions = () => {
//         let subscriptionsList: React.ReactNode[] = [];

//         Object.entries(subs).forEach(([email, user]) => {
//             subscriptionsList.push(
//                 <li key={email}>
//                     {email} {user.UserName} {user.Birth}
//                 </li>
//             );
//         });

//         return <ul>{subscriptionsList}</ul>;
//     };

//     return (
//         <>
//          {Object.keys(subs).length > 0 && availableSubscriptions()}
//         </>
//     );
// };

// export default SubscribeList;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios"; // Импортируем AxiosError
import Cookies from "js-cookie";

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

const SubscribeList: React.FC = () => {
    const [subs, setSubs] = useState<SubscriptionData>({});
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<SubscriptionData>("http://localhost:8080/api/subscription-list", {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`
                    }
                });
               
                setSubs(response.data);

                
            } catch (error: any) { // Изменяем тип ошибки на 'any' для безопасности
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
                        console.log(error);
                    }
                    
                }
                console.log(error);
            }
        };

        fetchData();
    }, []);
    

    const availableSubscriptions = () => {
        let subscriptionsList: React.ReactNode[] = [];

        Object.entries(subs).forEach(([email, user]) => {
            subscriptionsList.push(
                <li key={email}>
                    {email} {user.UserName} {user.Birth}
                </li>
            );
        });

        return <ul>{subscriptionsList}</ul>;
    };

    return (
        <>
         {Object.keys(subs).length > 0 && availableSubscriptions()}
        </>
    );
};

export default SubscribeList;
