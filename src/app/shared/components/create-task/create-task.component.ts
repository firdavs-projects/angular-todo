import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {Task} from '../../interfaces';
import {TasksService} from '../../services/tasks.service';
import {HomePageComponent} from '../../../pages/home-page/home-page.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit, OnDestroy {
  form: FormGroup;
  public edit: Task;
  eSub: Subscription;

  constructor(private alert: AlertService,
              private home: HomePageComponent,
              private tasksService: TasksService) {
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      task: new FormControl(this.edit?.task || ''),
    });

    this.eSub = this.tasksService.editTask$.subscribe(edit => {
      this.edit = edit;
      this.form.setValue({task: this.edit.task});
    });
  }

  keyDownFunction(event): void {
    if (event.keyCode === 13) {
      if (this.form.value.task.trim()) {
        const task: Task = {
          date: new Date(),
          task: this.form.value.task,
          completed: false
        };
        this.tasksService.create(task).subscribe((newTask) => {
          this.form.reset();
          this.home.currTasks.unshift(newTask);
          this.alert.openSnackBar('Задача создана', 'Скрыть');
        });

        this.form.reset();
        return;
      }
      this.alert.openSnackBar('Опишите сначала свою задачу', 'Скрыть');
    }
  }

  ngOnDestroy(): void {
    if (this.eSub) {
      this.eSub.unsubscribe();
    }
  }

}
