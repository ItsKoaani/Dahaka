import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {


  constructor(public db: AngularFirestore) { }

  get_user(userid){
    console.log("crud service "+userid);
    return this.db.collection('User', ref => ref.where('userid', '==', userid)).valueChanges();
  }

  getAllUserSummaryDetail(){
    console.log("crud service to get all users");
    return this.db.collection('userSummaryDetail').valueChanges();
  }

  getAllSrDetail(){
    console.log("crud service to get sr details");
    return this.db.collection('srDetail').snapshotChanges();
  }

  getAllStatus(){
    console.log("crud service to get statusList");
    return this.db.collection('srStatus').valueChanges();
  }

  getAllPpm(){
    console.log("crud service to get ppmList");
    return this.db.collection('ppmList').valueChanges();
  }

  getAllCatw(){
    console.log("crud service to get catwList");
    return this.db.collection('catwList').valueChanges();
  }

  insertUserSummaryDetails(record){
    return this.db.collection('userSummaryDetail').add(record);
  }

  insertSrDetails(record){
    return this.db.collection('srDetail').add(record);
  }


  getAllResource(){
    console.log("crud service to get resource list");
    return this.db.collection('resource').valueChanges();
  }

  //to delete sr from sr detaisl table
  delete_employee(recordId){
    this.db.doc('srDetail/'+recordId).delete();
  }

  //to update sr from details table
  update_employee(recordId, record){
    console.log("test at crud service");
    this.db.doc('srDetail/'+recordId).update(record);
  }
}
