import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import AlertMessage from "../../Layout/AlertMessage";

const RegisterForm = () => {
    const [alert, setAlert] = useState(null);

    //Context
    const { registerUser } = useContext(AuthContext);

    //Local state
    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
    });

    const { username, password, confirmPassword } = registerUser;

    //Handle onchange and onsubmit
    const onChangeRegisterForm = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value,
        });
    };

    const register = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert({ type: "danger", message: "Mật khẩu không khớp" });
            setTimeout(() => setAlert(null), 5000);
        }
        try {
            const registerData = await registerUser(registerForm);
            if (!registerData.success) {
                setAlert({ type: "danger", message: registerData.message });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div>
                <form action="" className="login-form" onSubmit={register}>
                    <h2>Đăng nhập</h2>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="username"
                            placeholder="User name"
                            value={username}
                            onChange={onChangeRegisterForm}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={onChangeRegisterForm}
                        />
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={confirmPassword}
                            placeholder="Confirm password"
                            onChange={onChangeRegisterForm}
                        />
                    </div>
                    <AlertMessage info={alert} />

                    <div className="submit">
                        <span>Bạn đã có tài khoản? </span>
                        <a href="/login">Đăng nhập</a>
                        <input
                            className="submit-btn"
                            type="submit"
                            value="Đăng ký"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
