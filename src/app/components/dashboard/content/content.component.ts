import { Component, OnInit } from '@angular/core';

import { faArrowUp, faArrowDown, faSync } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

export interface MovementElement {
  operation: string;
  amount: number;
  balance: number;
  date: string;
}

const ELEMENT_DATA: MovementElement[] = [
  { operation: 'Depósito', amount: 1000, balance: 1000, date: '2020-01-01' },
  { operation: 'Extracción', amount: 500, balance: 500, date: '2020-01-01' },
  { operation: 'Depósito', amount: 1000, balance: 1000, date: '2020-01-01' },
  { operation: 'Extracción', amount: 500, balance: 500, date: '2020-01-01' },
  { operation: 'Depósito', amount: 1000, balance: 1000, date: '2020-01-01' },
  { operation: 'Extracción', amount: 500, balance: 500, date: '2020-01-01' },
  { operation: 'Depósito', amount: 1000, balance: 1000, date: '2020-01-01' },
  { operation: 'Extracción', amount: 500, balance: 500, date: '2020-01-01' },
  { operation: 'Depósito', amount: 1000, balance: 1000, date: '2020-01-01' },
];


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faSync = faSync;

  constructor(private apiService: ApiService) { }

  accountName: string = '';
  balance: number = 0;
  movements: MovementElement[] = [];

  ngOnInit(): void {
    this.apiService.getUserInfo().subscribe({
      next: (user: any) => {
        this.accountName = user.name;
        this.balance = user.balance;
        this.movements = user.movements;
      },
      error: (err: any) => {
        console.log("Error fetching user info: ", err);
      },
    })
  }

  displayedColumns: string[] = ['operation', 'amount', 'balance', 'date'];
  dataSource = ELEMENT_DATA;
}
