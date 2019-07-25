import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import{Observable} from "rxjs";
import{Client} from "../models/Client";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsCollection:AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client:Observable<Client>;

  constructor(private _afs:AngularFirestore) {
    this.clientsCollection = this._afs.collection("clients", ref => ref.orderBy("lastName","asc"));
   }


//Services start below // Taken from https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md
  getClients():Observable<Client[]>{
  this.clients = this.clientsCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Client;
      data.id = a.payload.doc.id;
      return data;
    }))
  );

  return this.clients;
  }

  newClient(client:Client){
    this.clientsCollection.add(client);
  }

  getClient(id:string):Observable<Client>{
    this.clientDoc = this._afs.doc<Client>(`clients/${id}`); //This is to find the individul doc
    this.client = this.clientDoc.snapshotChanges().pipe(map(a => {
        if(a.payload.exists === false){
          return null;
        }else{
        const data = a.payload.data() as Client;
        data.id = a.payload.id;
        return data;
        }
      }
    ));

    return this.client;
  }

  updateClient(client:Client){
    this.clientDoc = this._afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client:Client){
    this.clientDoc = this._afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }

}
