import { Component, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { PaginatorComponent } from '@igo2/sdg';

import { AppService } from '../../../../app.service';
import { ExampleViewerComponent } from '../../../../components/example-viewer/example-viewer.component';
import { ExternalLinkComponent } from '../../../../components/external-link/external-link.component';

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
  constructor(private appService: AppService) {}

  initialPageIndex: number = 2;

  pageSizes: number[] = [2, 3, 5, 10, 15];
  selectedPageSize: number = 2;

  list = Array.from({ length: 35 }, (_, a) => a);

  shownList: number[] = [];

  get isHandset(): Signal<boolean> {
    return this.appService.isHandset;
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
