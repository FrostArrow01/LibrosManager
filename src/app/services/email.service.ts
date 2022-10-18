import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Email } from "../models/email";


@Injectable({providedIn: 'root'})
export class EmailService {
    private apiServerUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { } 

    public sendEmail(email: Email): Observable<Email>{
        return this.http.post<Email>(`${this.apiServerUrl}/email/send`, email );
    }

    public sendEmailArgs(email: Email): Observable<Email>{
        return this.http.post<Email>(`${this.apiServerUrl}/email/sendArgs`, email );
    }

   

}