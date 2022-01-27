import session from 'express-session';
import {Query} from 'express-serve-static-core'
declare module 'express-session' {
  export interface Session {
    user: object;
  }
}
