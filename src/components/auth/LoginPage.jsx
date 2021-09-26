import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./login.css";

export const LoginPage = () => {
    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        l_email: "ivangrestorres@hotmail.com",
        l_password: "123456",
    });

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        r_name: "",
        r_email: "",
        r_password: "",
        r_password2: "",
    });

    const { l_email, l_password } = formLoginValues;
    const { r_name, r_email, r_password, r_password2 } = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(startLogin(l_email, l_password));
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (r_password !== r_password2) {
            return Swal.fire("Error", "Las contraseñas deben ser iguales");
        }

        dispatch(startRegister(r_name, r_email, r_password));
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name={"l_email"}
                                value={l_email}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name={"l_password"}
                                value={l_password}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                value={r_name}
                                name={"r_name"}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                value={r_email}
                                name={"r_email"}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                value={r_password}
                                name={"r_password"}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                value={r_password2}
                                name={"r_password2"}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
