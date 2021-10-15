import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const NavBar = () => {
    const {
        authState: {
            user: { username },
        },
        logoutUser,
    } = useContext(AuthContext);

    const logout = () => {
        logoutUser();
    };


    return (
        <div className="navbar">
            <div>Home</div>

            <div className="info">
                <p>Xin chào {username}</p>
                <input type="button" value="Đăng xuất" onClick={logout} />
            </div>
        </div>
    );
};

export default NavBar;
