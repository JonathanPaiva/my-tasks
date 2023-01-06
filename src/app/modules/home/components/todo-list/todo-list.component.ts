import { Component, DoCheck, OnInit } from '@angular/core';
import { first } from 'rxjs';

//interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, DoCheck {

  constructor() { }

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  public deleteItemTaskList(itemIndex: number) {
    this.taskList.splice(itemIndex, 1);
  }

  public deleteItemAllTaskLisk(){
    const deleteAll = window.confirm("Você deseja deletar todas as tarefas?");

    if (deleteAll){
      this.taskList = [];
    }
  }

  public setEmitTaskList(event: string){
    this.taskList.push({task: event, checked: false});
  }

  public validationInput(event: string, index: number){
    if(!event.length){
      const confirm = window.confirm("Tarefa está vazia, Deseja Deletar?");

      if (confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage(){
    localStorage.setItem("list", JSON.stringify(this.taskList))
  }

  public setOrderList(){
    this.taskList.sort( (first, last) => Number(first.checked) - Number(last.checked));
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.setOrderList();
    this.setLocalStorage();
  }

}
