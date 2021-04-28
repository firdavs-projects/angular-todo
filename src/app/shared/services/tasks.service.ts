import {Injectable} from '@angular/core';
import {FbCreateResponse, Task} from '../interfaces';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public editTask$ = new Subject<Task>();

  constructor(private http: HttpClient) {
  }

  set(task: Task): void {
    this.editTask$.next({...task});
  }

  // get(): Task {
  //   const task = this.edit;
  //   this.edit = null;
  //   return task;
  // }

  create(task: Task): Observable<Task> {
    return this.http.post(`${environment.fbDbUrl}/tasks.json`, task)
      .pipe(
        map((res: FbCreateResponse) => {
          return {
            ...task,
            id: res.name,
            date: new Date(task.date)
          };
        })
      );
  }

  getAll(): Observable<Task[]> {
    return this.http.get(`${environment.fbDbUrl}/tasks.json`)
      .pipe(map((res: { [key: string]: any }) => {
        return Object
          .keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }));
      }));
  }

  // getById(id: string): Observable<Task> {
  //   return this.http.get<Task>(`${environment.fbDbUrl}/tasks/${id}.json`)
  //     .pipe(
  //       map((task: Task) => {
  //         return {
  //           ...task,
  //           id,
  //           date: new Date(task.date)
  //         };
  //       })
  //     );
  // }

  update(task: Task): Observable<Task> {
    return this.http.patch<Task>(`${environment.fbDbUrl}/tasks/${task.id}.json`, task);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/tasks/${id}.json`);
  }
}
