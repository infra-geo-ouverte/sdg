import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { PaginatorComponent } from '@igo2/sdg-common';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

@Component({
  selector: 'app-paginator',
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    PaginatorComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorDemoComponent implements OnInit {
  initialPageIndex = 2;

  pageSizes: number[] = [2, 3, 5, 10, 15];
  selectedPageSize = 2;

  list = Array.from({ length: 35 }, (_, a) => a);

  shownList: number[] = [];

  ngOnInit() {
    this.setShownList(this.initialPageIndex);
  }

  private setShownList(pageIndex: number) {
    this.shownList = this.list.slice(
      this.selectedPageSize * pageIndex,
      this.selectedPageSize * (pageIndex + 1)
    );
  }

  onPageChange(newPageIndex: number) {
    this.setShownList(newPageIndex);
  }
}
