import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from 'src/app/shared/interfaces';
import {Subscription} from 'rxjs';
import {TasksService} from '../../shared/services/tasks.service';
import {AuthService} from '../../shared/services/auth.service';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  public currTasks: Task[] = [];
  compTasks: Task[] = [];
  tSub: Subscription;
  uSub: Subscription;
  dSub: Subscription;
  loading = false;

  constructor(private tasksService: TasksService,
              private auth: AuthService,
              private alert: AlertService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.tSub = this.tasksService.getAll().subscribe(tasks => {
      this.currTasks = tasks.filter(t => t.completed === false);
      this.compTasks = tasks.filter(t => t.completed === true);
      this.loading = false;
    });
  }

  setCompleted(id: string): void {
    const compTask = this.currTasks.find((t) => t.id === id);
    compTask.completed = true;
    compTask.date = new Date();
    this.uSub = this.tasksService.update(compTask).subscribe(() => {
      this.alert.openSnackBar('Статус задачи - Выполнено!', 'Скрыть');
    });

    this.currTasks = this.currTasks.filter(t => t.id !== id);
    this.compTasks.unshift(compTask);
  }

  setUncompleted(id: string): void {
    const currTask = this.compTasks.find((t) => t.id === id);
    currTask.completed = false;
    currTask.date = new Date();
    this.uSub = this.tasksService.update(currTask).subscribe(() => {
      this.alert.openSnackBar('Задача перенесена на текущие', 'Скрыть');
    });

    this.compTasks = this.compTasks.filter(t => t.id !== id);
    this.currTasks.unshift(currTask);
  }

  delete(id: string, tasks: string): void {
    this.dSub = this.tasksService.remove(id).subscribe(() => {
      this[tasks] = this[tasks].filter(t => t.id !== id);
      this.alert.openSnackBar('Задача была удалена', 'Скрыть');
    });
  }

  edit(id: string, tasks: string): void {
    const task = this[tasks].find(t => t.id === id);
    this.tasksService.set(task);
  }

  ngOnDestroy(): void {
    if (this.tSub) {
      this.tSub.unsubscribe();
    }
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
