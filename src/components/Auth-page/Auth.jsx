import React from "react";
import "./Auth.css";

("use strict");

const LoginForm = ({ onToggleForm }) => {
	return (
		<div className="auth-form">
			<h2 className="auth-title">Вход</h2>
			<div className="form-group">
				<label htmlFor="login-phone">Телефон</label>
				<input
					type="tel"
					id="login-phone"
					className="auth-input"
					placeholder="+7 (___) ___-__-__"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="login-password">Пароль</label>
				<input
					type="password"
					id="login-password"
					className="auth-input"
					placeholder="Введите пароль"
				/>
			</div>
			<button
				className="auth-button"
				onClick={() => {
					alert("Вход выполнен");
					localStorage.setItem("isLogin", "true");
					window.location.reload();
				}}
			>
				ВОЙТИ
			</button>
			<div className="form-footer">
				<span>Нет аккаунта? </span>
				<a
					href="#"
					className="form-link"
					onClick={(e) => {
						e.preventDefault();
						onToggleForm();
					}}
				>
					Зарегистрироваться
				</a>
			</div>
		</div>
	);
};

const RegisterForm = ({ onToggleForm }) => {
	return (
		<div className="auth-form">
			<h2 className="auth-title">Регистрация</h2>
			<div className="form-group">
				<label htmlFor="register-name">Имя</label>
				<input
					type="text"
					id="register-name"
					className="auth-input"
					placeholder="Ваше имя"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="register-phone">Телефон</label>
				<input
					type="tel"
					id="register-phone"
					className="auth-input"
					placeholder="+7 (___) ___-__-__"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="register-password">Пароль</label>
				<input
					type="password"
					id="register-password"
					className="auth-input"
					placeholder="Придумайте пароль"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="register-confirm-password">Подтверждение пароля</label>
				<input
					type="password"
					id="register-confirm-password"
					className="auth-input"
					placeholder="Повторите пароль"
				/>
			</div>
			<button
				className="auth-button"
				onClick={() => alert("Регистрация выполнена")}
			>
				ЗАРЕГИСТРИРОВАТЬСЯ
			</button>
			<div className="form-footer">
				<span>Уже есть аккаунт? </span>
				<a
					href="#"
					className="form-link"
					onClick={(e) => {
						e.preventDefault();
						onToggleForm();
					}}
				>
					Войти
				</a>
			</div>
		</div>
	);
};

const Auth = () => {
	const [isLogin, setIsLogin] = React.useState(true); // true = форма входа, false = форма регистрации

	const toggleForm = () => {
		setIsLogin((prevIsLogin) => !prevIsLogin);
	};

	return (
		<div className="auth-container">
			<div className="auth-card">
				<div className="auth-header">
					<h1 className="auth-brand">Аутентификация</h1>
				</div>
				{isLogin ? (
					<LoginForm onToggleForm={toggleForm} />
				) : (
					<RegisterForm onToggleForm={toggleForm} />
				)}
			</div>
		</div>
	);
};

export default Auth;
