import Redis from 'ioredis';

const initRedis = () => {
    const redisCli = new Redis();
    redisCli.on('connect', () => {
        console.log('reddis client connected');
    });

    return redisCli;
};

export default initRedis;
