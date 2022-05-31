import {
  firebaseDatabase,
  firebaseDatabaseRef,
  firebaseSet,
} from "../firebase";

export default class DbService {
  static async add(T: any, uid: string) {
    await firebaseSet(firebaseDatabaseRef(firebaseDatabase, uid), T);
    throw new Error("Method not implemented.");
  }
  static update() {
    throw new Error("Method not implemented.");
  }
  static delete() {
    throw new Error("Method not implemented.");
  }
  static list(): any[] {
    throw new Error("Method not implemented.");
  }
}
