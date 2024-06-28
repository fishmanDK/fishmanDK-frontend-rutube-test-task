import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const UserInfo: React.FC = () => {

    return (
        <div className={"index-page-container"}>
            <strong>Добро пожаловать {Cookies.get("userEmail")}</strong>
        </div>
    );
};

export default UserInfo;