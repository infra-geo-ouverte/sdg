import { Component, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { PaginatorComponent } from '@igo2/sdg';
import { BreakpointService } from '@igo2/sdg/core';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

@Component({
  selector: 'app-paginator',
  standalone: true,
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

  constructor(private breakpointService: BreakpointService) {}

  get isHandset(): Signal<boolean> {
    return this.breakpointService.isHandset;
  }

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
