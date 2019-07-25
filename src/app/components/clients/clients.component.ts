import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../services/client.service";
import {Client} from "../../models/Client"

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  totalOwed:number;

  constructor(private _clientservice:ClientService) { }

  ngOnInit() {
    this._clientservice.getClients().subscribe(clients=>{
      this.clients = clients;
      this.getTotalOwed();
    })
  }

  getTotalOwed(){
    this.totalOwed = this.clients.reduce((total,client)=>{
      return total + parseFloat(client.balance.toString());
    },0)
  }

}
