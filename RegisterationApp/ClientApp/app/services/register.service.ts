import { Injectable } from '@angular/core';
import { RegistrationInfo } from '../models/register.info';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class RegisterService {

    constructor(private http: Http) { }

    register(register: RegistrationInfo): Observable<Response> {

        return this.http.post('/api/register', register);
    }
}