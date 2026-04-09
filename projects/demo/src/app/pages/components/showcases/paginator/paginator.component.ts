import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import {
  ExternalLinkComponent,
  FormFieldLabelComponent,
  PaginatorComponent
} from '@igo2/sdg-common';

import { ExampleViewerComponent } from '../../../../components';

@Component({
  selector: 'app-paginator',
  imports: [
    ExampleViewerComponent,
    ExternalLinkComponent,
    PaginatorComponent,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    FormFieldLabelComponent
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
