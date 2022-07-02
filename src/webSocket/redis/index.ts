import Redis from 'ioredis';

const initRedis = () => {
    const redisCli = new Redis();
    redisCli.on('connect', () => {
        console.log('user-connected');
    });

    return redisCli;
};

export default initRedis;
