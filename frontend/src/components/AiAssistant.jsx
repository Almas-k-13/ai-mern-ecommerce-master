import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const AiAssistant = () => {
	const navigate = useNavigate();
	const [activeAi, setActiveAi] = useState(false);

	const speak = (message) => {
		const utterance = new SpeechSynthesisUtterance(message);
		window.speechSynthesis.speak(utterance);
	};
	const askAI = async (message) => {

		try {

			const res = await axios.post(
					"/api/ai/recommend",
				{ message }
			);

			const reply = res.data.reply;

			console.log(reply);

			speak(reply);

		} catch (error) {

			console.log(error);

			speak("AI service is unavailable");
		}
	};

	const SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;

	if (!SpeechRecognition) {
		return null;
	}

	const recognition = new SpeechRecognition();

	recognition.onresult = (e) => {
		const transcript = e.results[0][0].transcript.toLowerCase();

		console.log(transcript);

		if (
			transcript.includes("home") ||
			transcript.includes("open home") ||
			transcript.includes("go to home")
		) {
			speak("Opening home page");
			navigate("/");
		}

		else if (
			transcript.includes("cart") ||
			transcript.includes("open cart") ||
			transcript.includes("go to cart")
		) {
			speak("Opening cart");
			navigate("/cart");
		}

		else if (
			transcript.includes("tshirt") ||
			transcript.includes("t shirts") ||
			transcript.includes("open tshirts")
		) {
			speak("Opening tshirts category");
			navigate("/category/t-shirts");
		}

		else if (
			transcript.includes("jacket") ||
			transcript.includes("jackets") ||
			transcript.includes("open jackets")
		) {
			speak("Opening jackets category");
			navigate("/category/jackets");
		}

		else if (
			transcript.includes("shoe") ||
			transcript.includes("shoes") ||
			transcript.includes("open shoes")
		) {
			speak("Opening shoes category");
			navigate("/category/shoes");
		}

		else if (
			transcript.includes("admin") ||
			transcript.includes("open admin")
		) {
			speak("Opening admin dashboard");
			navigate("/secret-dashboard");
		}

		else {

			speak("Searching AI recommendation");

			askAI(transcript);
		}
	};

	recognition.onend = () => {
		setActiveAi(false);
	};

	const startListening = () => {
		setActiveAi(true);

		askCommand();

		setTimeout(() => {
			recognition.start();
		}, 2000);
	};

	const askCommand = () => {
		speak("Hello Almas, How can I help you?");
	};

	return (
		<div
			onClick={startListening}
			className="fixed bottom-5 left-5 z-50 cursor-pointer"
		>
			<div
				className={`w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-3xl transition-all duration-300 ${activeAi ? "scale-125 shadow-[0_0_40px_#10b981]" : ""
					}`}
			>
				🤖
			</div>
		</div>
	);
};

export default AiAssistant;