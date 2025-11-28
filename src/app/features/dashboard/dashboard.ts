import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, ScaleType, Color } from '@swimlane/ngx-charts';
import { CurveFactory, curveMonotoneX } from 'd3-shape';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgxChartsModule, NgxChartsModule, MatCardModule, MatGridListModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard {
  // Chart dimensions
  chartWidth = 730;
  chartHeight = 350;
  curve = curveMonotoneX;
  // Summary card stats
  stats = [
    { label: 'Total Users', value: 1250 },
    { label: 'Active Sessions', value: 312 },
    { label: 'New Signups', value: 48 },
    { label: 'Revenue', value: '$12,480' },
  ];

  // Chart 1 - Line
  lineData = [
    {
      name: 'Users',
      series: [
        { name: 'Mon', value: 320 },
        { name: 'Tue', value: 450 },
        { name: 'Wed', value: 520 },
        { name: 'Thu', value: 610 },
        { name: 'Fri', value: 680 },
        { name: 'Sat', value: 720 },
        { name: 'Sun', value: 800 },
      ],
    },
  ];

  // Chart 2 - Bar
  barData = [
    { name: 'Google', value: 389 },
    { name: 'Facebook', value: 250 },
    { name: 'Twitter', value: 180 },
    { name: 'LinkedIn', value: 140 },
  ];

  // ✅ FIXED
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3f51b5', '#e91e63', '#4caf50', '#ff9800'],
  };

  constructor() {}
}
