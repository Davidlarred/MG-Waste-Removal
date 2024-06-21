import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  getIdToken,
  UserCredential,
  onIdTokenChanged,
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User as AppUser, User } from '../models/user.model';
import {
  BehaviorSubject,
  Observable,
  catchError,
  firstValueFrom,
  from,
  map,
  mergeMap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth;
  private db;
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const app = initializeApp(environment.firebaseConfig);
    this.auth = getAuth(app);
    this.db = getFirestore(app);

    onIdTokenChanged(this.auth, (user) => {
      if (user) {
        user.getIdToken(true).then((idToken) => {
          this.updateSessionCookie(idToken);
        });
      }
    });
  }

  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }

  // Enhanced sign-up function
  async signUp(userData: AppUser) {
    const { email, password, firstName, lastName } = userData;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
      // Save additional information in Firestore
      await setDoc(doc(this.db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        emailVerified: false,
      });
      console.log(userCredential);

      return userCredential;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  // Login function
  signIn(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      mergeMap((userCredential) =>
        from(userCredential.user.getIdToken()).pipe(
          mergeMap((idToken) =>
            from(this.setSessionCookie(idToken)).pipe(map(() => userCredential))
          )
        )
      ),
      catchError(this.handleError)
    );
  }

  // Password reset function
  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }

  // Sign out function
  async signOut() {
    try {
      await signOut(this.auth);
      document.cookie =
        'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  // Get current user token
  async getCurrentUserToken(): Promise<string | null> {
    const user = this.auth.currentUser;
    if (user) {
      return await getIdToken(user);
    }
    return null;
  }
  
  // Set session cookie
  private async setSessionCookie(idToken: string) {
    const url = 'https://us-central1-mg-waste-backend.cloudfunctions.net/api/setTokenCookie';
    await firstValueFrom(this.http.post(url, { idToken }, { withCredentials: true }));
  }
  
  // Update session cookie
  private updateSessionCookie(idToken: string) {
    const url = 'https://us-central1-mg-waste-backend.cloudfunctions.net/api/setTokenCookie';
    this.http.post(url, { idToken }, { withCredentials: true }).subscribe();
  }

  private handleError(error: any) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
