import { auth, firestore } from '../config/firebase';

export default class User {
  constructor(auth) {
    this.uid = auth.uid;
    this.email = auth.email;
    this.displayName = auth.displayName;
    this.isTeacher = auth.isTeacher || false;
    this.hours = auth.hours || 0;
    this.bookings = auth.bookings || [];
  }

  async create() {
    if (!this.email) return;
    const userRef = firestore.doc(`users/${this.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
      try {
        await userRef.set({
          uid: this.uid,
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

  static async getUser(uid) {
    const user = await firestore.doc(`users/${uid}`).get();
    return user.data();
  }

  static login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  static logout() {
    return auth.signOut();
  }

  async addHours(addedHours) {
    const fetchedUser = await User.getUser(this.uid);
    const currentHours = fetchedUser.hours;
    const newHours = currentHours + addedHours;
    await firestore.doc(`users/${this.uid}`).update({ hours: newHours });
  }

  resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
}
