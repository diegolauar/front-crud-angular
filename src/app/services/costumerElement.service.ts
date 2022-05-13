import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostumerElement } from '../models/CostumerElement';

@Injectable()
export class CostumerElementService {
  elementApiUrl = 'http://localhost:3001/costumer';
  constructor(private http: HttpClient) { }

  getElements(): Observable<CostumerElement[]> {
    return this.http.get<CostumerElement[]>(this.elementApiUrl);
  }

  createElements(element: CostumerElement): Observable<CostumerElement> {
    return this.http.post<CostumerElement>(this.elementApiUrl, element);
  }

  editElement(element: CostumerElement): Observable<CostumerElement> {
    console.log('ediiiiit element')
    return this.http.put<CostumerElement>(`${this.elementApiUrl}/${element.cpf}`, element);
  }

  deleteElement(cpf: string): Observable<any> {
    return this.http.delete<any>(`${this.elementApiUrl}/${cpf}`);
  }
}
