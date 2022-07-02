import Redis from 'ioredis';
import { firebaseAuthSocket } from '../../middlewares/auth';
import { Socket } from 'socket.io';
import moment from 'moment';
import { CONNECTION } from '../webSS';
class Authenticaton {
    constructor(readonly redisClient: Redis, readonly socket: Socket) {}
    public async jwtWatcher() {
        const authenticatedUser = await firebaseAuthSocket(this.socket.handshake.auth.token);
        if (!firebaseAuthSocket(this.socket.handshake.auth.token)) {
            console.log('has been disconnected ');
            this.socket.disconnect();
            return false;
        }
        const existedUser = await this.redisClient.hgetall(this.socket.handshake.auth.token);
        if (Object.keys(existedUser).length === 0) {
            const time = moment.unix(authenticatedUser.exp).diff(moment.now(), 'second');
            const newUser: any = {
                uid: authenticatedUser.uid,
                name: authenticatedUser.name,
                connection: this.socket.id,
            };
            await this.redisClient.hmset(this.socket.handshake.auth.token, newUser);
            await this.redisClient.sadd(`connections-${authenticatedUser.uid}`, this.socket.id);
            await this.redisClient.expire(this.socket.handshake.auth.token, time);
            return true;
        }

        await this.redisClient.hdel(this.socket.handshake.auth.token, 'connection');
        await this.redisClient.hmset(this.socket.handshake.auth.token, { connection: this.socket.id });
        return true;
    }
}
export default Authenticaton;
