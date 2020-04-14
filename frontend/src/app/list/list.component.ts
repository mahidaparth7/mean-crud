import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
})
export class UserListComponent {
  columns: Array<Object> = [
    {
      dataIndex: 'firstName',
      title: 'First Name',
    },
    {
      dataIndex: 'lastName',
      title: 'Last Name',
    },
    {
      dataIndex: 'email',
      title: 'Email',
    },
  ];
  title = 'User List';
  message: any;
  users: Array<Object> = [];
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.api.getUsers({ page: 1, limit: 2 }).subscribe((res) => {
      //console.log(data);
      this.users = res.data;
      console.log(this.users);
    });
  }
  editDoc(docId: string) {
    this.router.navigate([`/create/${docId}`]);
  }
  removeDoc(docId: string) {
    return this.api.removeUser(docId).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'S') {
        this.fetchData();
      } else {
        this.message = {
          type: 'success',
          message: res.message,
        };
      }
    });
  }
}
