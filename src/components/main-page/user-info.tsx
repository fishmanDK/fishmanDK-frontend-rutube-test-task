import Cookies from "js-cookie";

const UserInfo: React.FC = () => {

    return (
        <div className={"index-page-container"}>
            <strong>Добро пожаловать {Cookies.get("userEmail")}</strong>
        </div>
    );
};

export default UserInfo;