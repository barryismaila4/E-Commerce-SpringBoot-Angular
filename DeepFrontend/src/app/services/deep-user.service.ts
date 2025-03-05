import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeepUser } from '../models/DeepUser';
import { Router } from '@angular/router'; // Importer Router
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeepUserService {
  private apiUrl = 'http://localhost:8000';  // Endpoint FastAPI

  constructor(private http: HttpClient, private router: Router) { }

  register(user: DeepUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      // On récupère la réponse et on effectue la redirection
      map((response: any) => {
        if (user.email === 'ismaila.barry@esprit.tn' && user.password === 'AA0556563a') {
          // Rediriger vers deepadminserial
          this.router.navigate(['/deepadminserial']);
        } else {
          // Rediriger vers deeppublic
          this.router.navigate(['/deeppublic']);
        }
        return response;
      })
    );
  }
}
