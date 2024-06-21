import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';

admin.initializeApp();
const app = express();

const allowedOrigins = [
  'http://localhost:4200', // Development URL
  'https://your-production-url.com' // Production URL
];

app.use(cookieParser());

const setCorsHeaders = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin || '';
  console.log(`Origin: ${origin}`);
  if (allowedOrigins.includes(origin)) {
    console.log('Setting CORS headers for allowed origin');
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  }
  if (req.method === 'OPTIONS') {
    console.log('Handling preflight request');
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.sendStatus(204);
    return;
  }
  next();
};

app.use(setCorsHeaders);

app.post('/setTokenCookie', async (req: Request, res: Response) => {
  console.log('Received request to set token cookie');
  const idToken = req.body.idToken;
  if (!idToken) {
    console.log('ID token missing');
    return res.status(400).send('ID token missing');
  }
  try {
    const expiresIn = 1 * 60 * 60 * 1000; // 1 hour
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
    const options = { maxAge: expiresIn, httpOnly: true, secure: true, sameSite: 'strict' as const };
    res.cookie('session', sessionCookie, options);
    console.log('Session cookie set successfully');
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log('Unauthorized request:', error);
    return res.status(401).send('Unauthorized request');
  }
});

exports.api = functions.https.onRequest(app);
