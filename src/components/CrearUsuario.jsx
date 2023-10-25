import React, { useState } from "react";
import "../styles/CrearUsuarioStyle.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerAdmin } from "../services/admin.services";

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
      <h1>Crear Usuario</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="usuario">Usuario:</label>
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
          <label htmlFor="password">Contraseña:</label>
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
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
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
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
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
