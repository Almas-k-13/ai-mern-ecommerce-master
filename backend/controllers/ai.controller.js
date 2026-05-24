import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "../models/product.model.js";

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

export const aiRecommendation = async (req, res) => {

    const { message } = req.body;
    try {


        const products = await Product.find({});

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-latest"
        });

        const prompt = `
You are an ecommerce AI assistant.

Available products:
${products.map((p) =>
            `${p.name} - ₹${p.price} - ${p.category}`
        ).join("\n")}

User Query:
${message}

Recommend products professionally.
`;

        const result = await model.generateContent(prompt);

        const response = result.response.text();

        res.json({
            reply: response,
        });

    } catch (error) {

        console.log(error);

        const lowerMsg = message.toLowerCase();

        let fallbackReply = "Sorry, AI is busy right now.";

        if (lowerMsg.includes("shoe")) {

            fallbackReply =
                "I recommend checking our latest shoes collection under your budget.";

        }

        else if (
            lowerMsg.includes("jacket")
        ) {

            fallbackReply =
                "Our winter jackets are currently trending and highly rated.";

        }

        else if (
            lowerMsg.includes("tshirt")
        ) {

            fallbackReply =
                "We have stylish t-shirts available at affordable prices.";

        }

        else if (
            lowerMsg.includes("sherwani")
        ) {

            fallbackReply =
                "Premium sherwani options are available in our ethnic collection.";

        }

        res.json({
            reply: fallbackReply,
        });
    }
};