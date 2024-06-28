import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserInfo from "./user-info";
import Subscribe from "./subscribe";
import SubscribeList from "./subscribe-list";

const MainPage: React.FC = () => {

    
    return (
        <div className={"index-page-container"}>
            <UserInfo/>
            <Subscribe/>
            <SubscribeList/>
        </div>
    );
};

export default MainPage;
