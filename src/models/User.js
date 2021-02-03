import { auth, firestore } from '../config/firebase';
import Booking from '../models/Booking';
import moment from 'moment';

export default class User {
  constructor(auth) {
    this.id = auth.uid || auth.id;
    this.email = auth.email;
    this.displayName = auth.displayName;
    this.isAdmin = auth.isAdmin || false;
    this.hours = auth.hours || 0;
    this.bookings = auth.bookings || [];
    this.createdAt = auth.createdAt || new Date();
  }

  async create() {
    if (!this.email) return;
    const userRef = firestore.doc(`users/${this.id}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
      try {
        await userRef.set({
          id: this.id,
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
  static async getUser(id) {
    const user = await firestore.doc(`users/${id}`).get();
    return user.data();
  }

  async addBooking(time) {
    const newBooking = new Booking({
      startAt: time,
      teacher: this.id,
      endAt: moment(time).add(60, 'm').toISOString(),
    });
    const data = await newBooking.create();
    const fetchedUser = await User.getUser(this.id);
    const bookings = fetchedUser.bookings;
    bookings.push(data.id);
    console.log(bookings);
    return firestore.doc(`users/${this.id}`).update({ bookings: bookings });
  }

  async deleteBooking(id) {
    const fetchedUser = await User.getUser(this.id);
    const bookings = fetchedUser.bookings;
    const updatedBookings = bookings.filter((booking) => booking !== id);
    await Booking.delete(id);
    return firestore
      .doc(`users/${this.id}`)
      .update({ bookings: updatedBookings });
  }

  async getBookings() {
    const fetchedUser = await User.getUser(this.id);
    const bookingIds = fetchedUser.bookings;
    const bookings = () => {
      return Promise.all(
        bookingIds.map(async (id) => {
          const bookings = await firestore.doc(`bookings/${id}`).get();
          return bookings.data();
        })
      );
    };
    return bookings();
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
