import { Component, OnInit, Renderer2 } from '@angular/core';
import * as firebase from 'firebase';
import { Router, NavigationStart } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/authentication/login-form/login-form.component';
import { RegisterFormComponent } from './components/authentication/register-form/register.form.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  constructor(private rendered: Renderer2, private router: Router) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart
          && (event.url.startsWith('/auth') || event.url === '/')
          && (!event.url.startsWith('/auth/user'))) {
          this.rendered.addClass(document.body, 'backbody')
        }
        else if (event instanceof NavigationStart) {
          this.rendered.removeClass(document.body, 'backbody')
        }


      })
  }
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyCb2vah0Q4loHpvwM2RV6l8dn5EUCNy-F8",
      authDomain: "ohubsystem.firebaseapp.com",
      databaseURL: "https://ohubsystem.firebaseio.com/",
    })
  }
}
