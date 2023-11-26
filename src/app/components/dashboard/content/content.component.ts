import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalComponent } from './modal/modal.component';

import { faArrowUp, faArrowDown, faSync } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';

export interface MovementElement {
  operation: string;
  amount: number;
  balance: number;
  date: string;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faSync = faSync;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  accountName: string = '';
  balance: number = 0;

  ngOnInit(): void {
    this.apiService.getUserInfo().subscribe({
      next: (user: any) => {
        this.accountName = user.name;
        this.balance = user.balance;
        this.dataSource = user.movements.slice(-10).reverse();
      },
      error: (err: any) => {
        console.log("Error fetching user info: ", err);
        this.router.navigate(['/login']);
      },
    })
  }

  displayedColumns: string[] = ['operation', 'amount', 'balance', 'date'];
  dataSource: MovementElement[] = [];

  modal: boolean = false;

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }
}
