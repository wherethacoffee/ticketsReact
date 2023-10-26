import React, { useState } from "react";
import "../styles/CrearUsuarioStyle.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../services/admin.services";
import signupLogo from "../images/signup_logo.png";

const CrearUsuario = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      // Llama a la función registerAdmin para enviar los datos a la API
      const response = await registerAdmin({
        username: data.usuario,
        password: data.password,
      });

      if (response.ok) {
        // Si la respuesta es exitosa, muestra una alerta y redirige a la página de inicio
        window.alert("Usuario creado correctamente");
        navigate("/");
      } else {
        // Si la respuesta no es exitosa, maneja el error según tus necesidades
        console.error("Error al crear el usuario:", response.statusText);
      }
    } catch (error) {
      // Maneja errores de red u otros errores
      console.error("Error al crear el usuario:", error);
    }
  };

  return (
    <div className="container">
      <img className="signup-logo" src={signupLogo} alt="Logo"/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="usuario">Ingrese un nombre de usuario</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            required
            className="input-field"
            {...register("usuario", {
              required: "Rellene el campo vacío",
              minLength: {
                value: 5,
                message: "El usuario debe tener al menos 5 caracteres",
              },
            })}
          />
          {errors.usuario && <span>{errors.usuario.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Ingrese una contraseña</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              className="input-field"
              {...register("password", {
                required: "Rellene el campo vacío",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              })}
            />
            <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "ocultar" : "ver"}
            </button>
          </div>
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Vuelva a ingresar su contraseña</label>
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              required
              className="input-field"
              {...register("confirmPassword", {
                required: "Rellene el campo vacío",
                validate: (value) => {
                  const password = getValues("password");
                  return value === password || "Las contraseñas no coinciden";
                },
              })}
            />
            <button
              type="button"
              className="eye-button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "ocultar" : "ver"}
            </button>
          </div>
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>
        {/* ... (otros campos del formulario) ... */}
        <button type="submit" className="btn-submit">
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default CrearUsuario;
