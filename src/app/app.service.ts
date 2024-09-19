import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiUrl = 'YOUR_API_URL';

  constructor(private http: HttpClient) { }

  translate(text: string, targetLanguage: string): Observable<any> {
    const body = {
      q: text,
      target: targetLanguage,
      source: 'en'
    };
    return this.http.post<any>(this.apiUrl, body);
  }

  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  toggleDarkMode() {
    this.darkMode.next(!this.darkMode.value);
  }

}
