import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import AlertMessage from "../../Layout/AlertMessage";

const AdminLoginForm = () => {
    const [alert, setAlert] = useState(null);

    //Context
    const { loginUser } = useContext(AuthContext);

    //Local state
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });

    const { username, password } = loginForm;

    //Handle onchange and onsubmit
    const onChangeLoginForm = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        });
    };

    const login = async (e) => {
        e.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if (!loginData.success) {
                setAlert({
                    type: "danger",
                    message: "Tài khoản không tồn tại!",
                });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form action="" className="login-form" onSubmit={login}>
                <h2>Đăng nhập</h2>
                <div className="input-wrapper">
                    <input
                        type="text"
                        name="username"
                        required
                        placeholder="User name"
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </div>
                <div className="input-wrapper">
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </div>
                <AlertMessage info={alert} />
                <div className="submit">
                    <span>Bạn chưa có tài khoản? </span>
                    <a href="/register">Đăng ký</a>
                    <input
                        className="submit-btn"
                        type="submit"
                        value="Đăng nhập"
                    />
                </div>
            </form>
        </div>
    );
};
export default AdminLoginForm;
