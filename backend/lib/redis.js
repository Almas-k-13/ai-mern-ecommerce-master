import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.UPSTASH_REDIS_URL;

console.log("Redis URL:", redisUrl);

export const redis = new Redis(redisUrl, {
	maxRetriesPerRequest: null,
	enableReadyCheck: false,
});

redis.on("connect", () => {
	console.log("✅ Redis Connected");
});

redis.on("error", (err) => {
	console.log("Redis Error:", err);
});