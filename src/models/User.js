import { auth, firestore } from '../config/firebase';

export default class User {
  constructor(auth) {
    this.uid = auth.uid;
    this.email = auth.email;
    this.displayName = auth.displayName;
    this.isTeacher = false;
    this.hours = 0;
    this.bookings = [];
  }

  async create() {
    if (!this.email) return;
    const userRef = firestore.doc(`users/${this.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
      try {
        await userRef.set({
          email: this.email,
          displayName: this.displayName,
          isTeacher: this.isTeacher,
          hours: this.hours,
          bookings: this.bookings,
          createdAt: new Date(),
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  static register(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  login() {
    return auth.signInWithEmailAndPassword(this.email, this.password);
  }

  static logout() {
    return auth.signOut();
  }

  resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
}
