import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import{Observable} from "rxjs";
import { map } from 'rxjs/operators';
import{Client} from "../models/Client";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private _afAuth:AngularFireAuth) { }

  login(email:string,password:string){
    return new Promise((resolve, reject) => {
      this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  register(email:string,password:string){
    return new Promise((resolve, reject) => {
      this._afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  getAuth() {
    return this._afAuth.authState.pipe(map(auth=> auth)) //Pratham check code
  }

  logout(){
    this._afAuth.auth.signOut();
  }

}
