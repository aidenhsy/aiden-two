import { auth, firestore } from '../config/firebase';
import firebase from 'firebase/app';

export default class Booking {
  constructor(obj) {
    this.startAt = obj.startAt || null;
    this.endAt = obj.endAt || null;
    this.student = obj.student || null;
    this.teacher = obj.teacher;
    this.createdAt = obj.createdAt || new Date();
  }

  async create() {
    try {
      const data = await firestore.collection('bookings').add({
        startAt: this.startAt,
        endAt: this.endAt,
        student: this.student,
        teacher: this.teacher,
        createdAt: new Date(),
      });
      this.id = data.id;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getBooking(bookingIDs) {
    let bookingObjects = await firestore
      .collection('bookings')
      .where(firebase.firestore.FieldPath.documentId(), 'in', bookingIDs)
      .get();
    return bookingObjects.docs.map((t) => {
      let data = t.data();
      data.id = t.id;
      return data;
    });
  }
}
