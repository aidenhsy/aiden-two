import { auth, firestore } from '../config/firebase';
import firebase from 'firebase/app';

export default class Booking {
  constructor(obj) {
    this.id = obj.id || null;
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
      await firestore.doc(`bookings/${data.id}`).update({
        id: data.id,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(id) {
    const response = await firestore.doc(`bookings/${id}`).delete();
    return response;
  }

  static addStudent(bookingId, studentId) {
    return firestore.doc(`bookings/${bookingId}`).update({
      student: studentId,
    });
  }

  static deleteStudent(bookingId) {
    return firestore.doc(`bookings/${bookingId}`).update({ student: null });
  }

  static async getAvailabilities() {
    const querySnapshot = await firestore
      .collection('bookings')
      .where('student', '==', null)
      .get();

    return querySnapshot.docs.map((doc) => doc.data());
  }

  static async getBooking(bookingIDs) {}
}
