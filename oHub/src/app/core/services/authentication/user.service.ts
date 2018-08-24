import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as firebase from 'firebase';
import { map, catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '../../models/input-models/user.model';
import { UserRole } from '../../models/input-models/user-role.model';
const baseUrl = `https://ohubsystem.firebaseio.com/users/`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string
  user: UserModel
  constructor(

    private http: HttpClient,
    private router: Router

  ) {
    this.token = this.getToken()
  }

  getAllUsers() {
    let token = localStorage.getItem('token')
    return this.getAllUserInternal(token)
  }

  getuserInformation(uid?: string) {
    if (!uid) {
      let userId = firebase.auth().currentUser.uid

      if (userId) {
        let token = localStorage.getItem('token')
        return this.getUserInformationInternal(userId, token)
      }
    }
    else {
      let token = localStorage.getItem('token')
      return this.getUserInformationInternal(uid, token)
    }
  }

  getRolesByUserId(id: string, token: string) {
    return this.getRolesInternal(id, token)
  }
  updateAdminUserInformation(userModel: UserModel) {
    let db = firebase.database()

    return db.ref('users').child(userModel.id).set({

      'firstName': userModel.firstName,
      'lastName': userModel.lastName,
      'username': userModel.username,
      'phone': userModel.phone,
      'workPosition': userModel.workPosition,
      'roles': userModel.roles
    }).then(() => {
      this.user = userModel
    })
  }

  updateUserInformation(userModel: UserModel) {
    let userId = firebase.auth().currentUser.uid
    let token = localStorage.getItem('token')
    if (userId) {
      let db = firebase.database()
      return db.ref('users').child(userId).set({

        'firstName': userModel.firstName,
        'lastName': userModel.lastName,
        'username': userModel.username,
        'phone': userModel.phone,
        'workPosition': userModel.workPosition,
        'roles': userModel.roles

      }).then(() => {
        this.user = userModel
      })
    }
  }

  private getUserInformationInternal(id: string, token: string) {
    return this.http.get(`${baseUrl}${id}/.json?auth=${token}`)
      .pipe(map((res: Response) => {
        return res
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })

      );
  }
  private getRolesInternal(id: string, token: string) {

    return this.http.get(`${baseUrl}${id}.json?auth=${token}`)
      .pipe(map((res: Response) => {
     //   console.log(res)
        return res
      }));

  }

  private getAllUserInternal(token) {
    return this.http.get(`${baseUrl}/.json?auth=${token}`)
      .pipe(map((res: UserModel[]) => {
        console.log('response ' + JSON.stringify(res))
        const usersKey = Object.keys(res);
        const users: UserModel[] = [];
        for (let i of usersKey) {
          users.push(new UserModel(i, res[i].firstName, res[i].lastName, res[i].username,
            res[i].phone, res[i].workPosition, res[i].roles));
        }


        return users
      }),
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })

      );
  }
  setRoles() {
    let userId = firebase.auth().currentUser.uid
    let token = localStorage.getItem('token')
    if (userId) {
      this.getRolesByUserId(userId, token)
        .subscribe((data) => {
          this.user = {
            'id': this.getCurrentUserUid(),
            'firstName': data['firstName'],
            'lastName': data['lastNamev'],
            'username': data['username'],
            'phone': data['phone'],
            'workPosition': data['workPosition'],
            'roles': data['roles']
          }

          let dataRoles = data['roles']
          const userRoles: UserRole = data['roles']
          this.user.roles = userRoles

        })
    }
    else {
      this.user = new UserModel('', 'Guest', '', '', '', '', new UserRole(false, true))
    }
  }
  private getToken() {
    return localStorage.getItem('token')
  }
  private getCurrentUserUid() {
    return firebase.auth().currentUser.uid
  }
}
