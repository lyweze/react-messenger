const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose.connect("mongodb://localhost:27017/auth_db", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Определение модели пользователя
const userSchema = new mongoose.Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	isVerified: { type: Boolean, default: false },
	verificationToken: String,
	tokenExpires: Date,
});

const User = mongoose.model("User", userSchema);

// Настройка транспорта для отправки email
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

// Маршрут для регистрации
app.post("/api/auth/register", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Проверка, существует ли уже пользователь с таким email
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "Пользователь с таким email уже существует" });
		}

		// Хеширование пароля
		const hashedPassword = await bcrypt.hash(password, 10);

		// Генерация токена для подтверждения email
		const verificationToken = crypto.randomBytes(20).toString("hex");
		const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 часа

		// Создание нового пользователя
		const newUser = new User({
			email,
			password: hashedPassword,
			verificationToken,
			tokenExpires,
		});

		await newUser.save();

		// Формирование ссылки для подтверждения
		const verificationLink = `${process.env.FRONTEND_URL}/verify/${verificationToken}?email=${email}`;

		// Отправка email для верификации
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject: "Подтверждение регистрации",
			html: `
        <h1>Подтверждение регистрации</h1>
        <p>Для подтверждения вашей учетной записи, пожалуйста, перейдите по ссылке:</p>
        <a href="${verificationLink}">Подтвердить email</a>
        <p>Ссылка действительна в течение 24 часов.</p>
      `,
		};

		await transporter.sendMail(mailOptions);

		res.status(201).json({
			message:
				"Регистрация успешна! Проверьте вашу почту для подтверждения аккаунта.",
		});
	} catch (error) {
		console.error("Ошибка регистрации:", error);
		res.status(500).json({ message: "Ошибка сервера при регистрации" });
	}
});

// Маршрут для подтверждения email
app.get("/api/auth/verify", async (req, res) => {
	try {
		const { token, email } = req.query;

		// Поиск пользователя по токену и email
		const user = await User.findOne({
			email,
			verificationToken: token,
			tokenExpires: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({
				message:
					"Недействительная ссылка подтверждения или срок ее действия истек",
			});
		}

		// Подтверждение аккаунта пользователя
		user.isVerified = true;
		user.verificationToken = undefined;
		user.tokenExpires = undefined;
		await user.save();

		res.status(200).json({ message: "Email успешно подтвержден" });
	} catch (error) {
		console.error("Ошибка при подтверждении email:", error);
		res.status(500).json({ message: "Ошибка сервера при подтверждении email" });
	}
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`);
});
// Экспорт приложения для тестирования
module.exports = app;
// Обработка ошибок
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Что-то пошло не так!");
});
// Обработка 404 ошибок
app.use((req, res) => {
    res.status(404).send("Страница не найдена");
});