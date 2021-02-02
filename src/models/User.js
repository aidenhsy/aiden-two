import { auth, firestore } from '../config/firebase';
import Booking from '../models/Booking';

export default class User {
  constructor(auth) {
    this.uid = auth.uid;
    this.email = auth.email;
    this.displayName = auth.displayName;
    this.isAdmin = auth.isAdmin || false;
    this.hours = auth.hours || 0;
    this.bookings = auth.bookings || [];
    this.createdAt = auth.createdAt || new Date();
  }

  async create() {
    if (!this.email) return;
    const userRef = firestore.doc(`users/${this.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
      try {
        console.log(this);
        await userRef.set({
          uid: this.uid,
          email: this.email,
          displayName: this.displayName,
          isAdmin: this.isAdmin,
          hours: this.hours,
          bookings: this.bookings,
          createdAt: new Date(),
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  //document snapshot have a id property
  static async getUser(uid) {
    const user = await firestore.doc(`users/${uid}`).get();
    let userObj = user.data();
    userObj.bookings = await Booking.getBooking(userObj.bookings);
    return userObj;
  }

  async addBooking(time) {
    const newBooking = new Booking({ startAt: time, teacher: this.uid });
    const data = await newBooking.create();
    const fetchedUser = await User.getUser(this.uid);
    const bookings = fetchedUser.bookings;
    bookings.push(newBooking);
    console.log(bookings);
    return firestore
      .doc(`users/${this.uid}`)
      .update({ bookings: bookings.map((booking) => booking.id) });
  }

  static register(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  static login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  static logout() {
    return auth.signOut();
  }

  resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
}
