import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

interface User {
  id: string;
  name: string;
  coin: string;
  date: string;
  process: 'Buy' | 'Sell';
  amount: string;
}

interface Wallet {
  coin: string;
  percent: number;
  value: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatPaginatorModule,
  ],
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
})
export class Users {
  users: User[] = [
    {
      id: '#1254',
      name: 'Amy Yelsner',
      coin: 'ETH',
      date: 'May 5th',
      process: 'Buy',
      amount: '3.005 BTC',
    },
    {
      id: '#2355',
      name: 'Anna Fali',
      coin: 'BTC',
      date: 'Mar 17th',
      process: 'Buy',
      amount: '0.050 ETH',
    },
    {
      id: '#1235',
      name: 'Stepen Shaw',
      coin: 'ETH',
      date: 'May 24th',
      process: 'Sell',
      amount: '3.050 BTC',
    },
    {
      id: '#2355',
      name: 'Anna Fali',
      coin: 'BTC',
      date: 'Mar 17th',
      process: 'Sell',
      amount: '0.050 ETH',
    },
    {
      id: '#2355',
      name: 'Anna Fali',
      coin: 'BTC',
      date: 'Mar 17th',
      process: 'Sell',
      amount: '0.050 ETH',
    },
  ];

  displayedColumns: string[] = ['id', 'name', 'coin', 'date', 'process', 'amount'];

  addUser() {
    console.log('Add user clicked');
  }
  getInitials(name: string) {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  }
  getColor(coin: string) {
    const colors: any = {
      BTC: '#fbbf24',
      ETH: '#374151',
      GBP: '#10b981',
      EUR: '#84cc16',
      USD: '#06b6d4',
      XAU: '#fbbf24',
    };
    return colors[coin] || '#d1d5db';
  }
}
