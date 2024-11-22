import Redis from "ioredis";

const redisConfigure = {
    hostname: process.env.REDIS_HOST || "127.0.0.1",
    port: parseInt(process.env.REDIS_PORT || "6379"),
}

export const RedisClient = new Redis(redisConfigure)

RedisClient.on("connect", ()=>{
    console.log("Redis Connect Successfuly")
})

RedisClient.on("error", (err)=>{
    console.log("Redis Connection Failed",err)
})