import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Subscribe: React.FC = () => {
    const [inputRootUser, setRootUser] = useState('')
    const handleChangeRootUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRootUser(event.target.value)
    }
    const [albums, setAlbums] = useState<[]>([]!)!;


    useEffect(() => {
        const handleBeforeUnload = () => {
          console.log('Страница загруженна');
        };
        window.addEventListener('beforeload', handleBeforeUnload);
      }, []);

    const handleAddSubscriber = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (inputRootUser){
          try {
            const response = await axios.post<Response>(`http://localhost:8080/api/subscribe?root-email=${inputRootUser}&subs-email=${Cookies.get("userEmail")}`);
            console.log(`http://localhost:8080/api/subscribe?root-email=${inputRootUser}&subs-email=${Cookies.get("userEmail")}`)
            if (response.status === 200) {
                alert("вы успешно подписались");
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
            <form onSubmit={handleAddSubscriber}>
                <input value={inputRootUser} onChange={handleChangeRootUser} type="text" />
                <input type="submit" value="подписаться" />
            </form>
        </div>
    );
};

export default Subscribe;