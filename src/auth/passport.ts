import { Strategy as BearerStrategy } from 'passport-http-bearer'; 
import { findUser } from '../user';
import passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { bindNodeCallback } from 'rxjs';
import { switchMap, tap, map, catchError } from 'rxjs/operators';

passport.use(new BearerStrategy((token, done) => {
    const secret = process.env.HTML_CONVERTER_SECRET;
    bindNodeCallback(jwt.verify)(token, secret).pipe(
        // switchMap(({ id }: any) => findUser(id)),
        // map(doc => doc.data()),
    ).subscribe(({ guid }: any) => {
        if (!guid) {
            return done(null, false); 
        }
            return done(null, guid, { scope: 'all' });
    }, err => done(err));
}));

export const protect = passport.authenticate('bearer', { session: false });