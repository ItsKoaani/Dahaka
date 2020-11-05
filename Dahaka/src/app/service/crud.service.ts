import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase/app';

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

  getCurrentUserSummaryDetail(user: String, pStartDate, pEndDate){
    console.log("crud service to get current user timesheet");
    var myStartDate = firebase.firestore.Timestamp.fromDate(new Date(pStartDate*1000));
    var myEndDate = firebase.firestore.Timestamp.fromDate(new Date(pEndDate*1000));
    return this.db.collection('userSummaryDetail', ref => ref.where('assignee' ,'==',"R, Anandan").where('startDate', '>=', myStartDate).where('startDate', '<=', myEndDate)).valueChanges();
  }

  getAllSrDetail(){
    console.log("crud service to get sr details");
    return this.db.collection('srDetail', ref => ref.where('srNumber', '>', 1)).snapshotChanges();
  }

  getAllSrList(){
    console.log("crud service to get sr details");
    return this.db.collection('srDetail'). valueChanges();
  }


  getAllStatus(){
    console.log("crud service to get statusList");
    return this.db.collection("srStatus").valueChanges();
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
  delete_srDetail(recordId){
    this.db.doc('srDetail/'+recordId).delete();
  }

  //to update sr from details table
  update_srDetail(recordId, record){
    console.log("test at crud service");
    this.db.doc('srDetail/'+recordId).update(record);
  }

  
   //screen - profile
   //display user's information from db 
   
   getUserInfo(uid: any){
    console.log("crud service to a user information from db; screen - profile");
    return this.db.collection('user', ref => ref.where('uid', '==', uid)).valueChanges({idField: 'docId'});
  }

   //screen - profile
   //to save display picture url or caption in firestore  
   insertDisplayPictureUrlOrCaption(id, record){
    //  console.log(record);
    //  console.log(id);
      this.db.doc('user/'+id).update(record);
  }



  getAllRecognitionForThisUser(sDate: any, eDate : any){
    var myStartDate = firebase.firestore.Timestamp.fromDate(new Date(sDate*1000));
    var myEndDate = firebase.firestore.Timestamp.fromDate(new Date(eDate*1000));
    return this.db.collection('RECOGNITION', ref => ref.where('DATE', '>=', myStartDate).where('DATE', '<=', myEndDate)).valueChanges();
  }

  //screen - vacation 
  //to get data for vacation screen
  getUserVacation(){
    return this.db.collection('userSummaryDetail', ref => ref.where('request', '==', 1)).valueChanges();
  }

  //screen- accolades
  //to insert new appreciating email to the db
  insertAppreciationEmailDetails(record){
    return this.db.collection('RECOGNITION').add(record);
  }
}
