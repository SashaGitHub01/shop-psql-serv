import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt, JwtFromRequestFunction, } from 'passport-jwt';
import { User } from '../models/index';
import express from 'express';
import bcrypt, { hash } from 'bcryptjs';

const getToken = (req: express.Request) => {
   const getJwtFunc: JwtFromRequestFunction = ExtractJwt.fromHeader('token');

   const token = getJwtFunc(req);

   if (token) {
      return token;
   }

   if (req.session) {
      return req.session.token as string;
   }

   return null;
}

passport.use(new LocalStrategy(
   async (username, password, done) => {
      try {

         const user = await User.findOne({ where: { email: username } });

         if (!user) {
            return done(null, false);
         }
         const isEqual = await bcrypt.compare(password, user.password);

         if (!isEqual) {
            return done(null, false);
         }

         return done(null, user);
      } catch (err) {
         return done(null, false)
      }
   }
));

passport.use(new JwtStrategy({
   secretOrKey: process.env.SECRET_KEY || '12345',
   jwtFromRequest: getToken as JwtFromRequestFunction
},
   async (payload, done) => {
      try {
         if (payload.id || payload.user.id) {
            return done(null, payload.id || payload.user.id);
         } else {
            return done(null, false);
         }

      } catch (err) {
         return done(err, false);
      }
   }));

passport.serializeUser((id: any, done) => {
   done(null, id);
});

passport.deserializeUser(async (id: string, done) => {
   const user = await User.findOne({ where: { id } });

   done(null, user);
});

export { passport };