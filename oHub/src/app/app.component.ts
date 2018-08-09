import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyCb2vah0Q4loHpvwM2RV6l8dn5EUCNy-F8",
      authDomain: "ohubsystem.firebaseapp.com"
    })
  }
}
