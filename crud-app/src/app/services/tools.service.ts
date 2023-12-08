import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private _http: HttpClient) { }

  addTool(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/tools', data);
  }

  updateTool(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/tools/${id}`, data);
  }

  getToolList(): Observable<any> {
    return this._http.get('http://localhost:3000/tools');
  }

  deleteTool(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/tools/${id}`);
  }
}
