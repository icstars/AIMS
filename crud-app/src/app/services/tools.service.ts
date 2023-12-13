import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor(private _http: HttpClient) {}

  addTool(data: any): Observable<any> {
    const inputDate = new Date(data.last_sharpened);

    // Check if inputDate is a valid Date object
    if (!isNaN(inputDate.getTime())) {
      const year = inputDate.getFullYear();
      const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
      const day = ('0' + inputDate.getDate()).slice(-2);

      data.last_sharpened = `${year}/${month}/${day}`;
      console.log(data);
      return this._http.post(`http://localhost:3100/tool/add`, data);
    } else {
      // Handle invalid date input
      console.error('Invalid date format');
      return this._http.get('http://localhost:3000/');
    }
  }
  //put
  updateTool(data: any): Observable<any> {
    console.log('data', data);
    return this._http.put(`http://localhost:3100/tool/edit`, data);
  }

  getToolList(): Observable<any> {
    return this._http.get('http://localhost:3100/tools');
  }

  deleteTool(data: any): Observable<any> {
    console.log(data);
    return this._http.post(`http://localhost:3100/tools/delete`, data);
  }
}
