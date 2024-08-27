import { NgFor, NgIf, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  input,
  output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { IgoLanguageModule } from '@igo2/core/language';

@Component({
  selector: 'sdg-paginator',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgStyle,
    IgoLanguageModule,
    MatButtonModule,
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {
  constructor() {}

  nbOfElementsInList = input.required<number>();
  nbOfElementsPerPage = input.required<number>();
  middlePagesMaxRange = input<number>(1);
  initialPage = input<number>(1);
  isHandset = input<boolean>();

  pageChange = output<number>();

  currentPage: number = 0;
  nbOfPages: number = 0;

  firstPages: number[] = [];
  middlePages: number[] = [];
  lastPages: number[] = [];
  pages: number[] = [];

  ngOnInit() {
    this.currentPage = this.initialPage();

    this.getNbOfPages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      !changes.nbOfElementsPerPage.isFirstChange() &&
      changes.nbOfElementsPerPage
    ) {
      this.currentPage = 1;
      this.pageChange.emit(this.currentPage);

      this.getNbOfPages();
    }
  }

  private getNbOfPages() {
    this.nbOfPages = Math.ceil(
      this.nbOfElementsInList() / this.nbOfElementsPerPage()
    );

    this.getPages();
  }

  private createPagesArray(start: number, finish: number) {
    return Array.from({ length: finish - start + 1 }, (_, a) => a + start);
  }

  private getPages() {
    this.firstPages = [];
    this.middlePages = [];
    this.lastPages = [];
    this.pages = [];

    if (this.nbOfPages > 6) {
      this.firstPages = this.getFirstPages();
      this.middlePages = this.getMiddlePages();
      this.lastPages = this.getLastPages();
    } else {
      this.pages = Array.from({ length: this.nbOfPages }, (v, k) => k + 1);
    }
  }

  private getFirstPages() {
    if (this.currentPage <= 3) {
      return this.createPagesArray(1, 3);
    } else {
      return this.createPagesArray(1, 1);
    }
  }

  private getMiddlePages() {
    if (this.currentPage >= 4 && this.currentPage <= this.nbOfPages - 3) {
      return this.createPagesArray(
        !this.isHandset() && this.currentPage - this.middlePagesMaxRange() > 2
          ? this.currentPage - this.middlePagesMaxRange()
          : this.currentPage - 1,
        !this.isHandset() &&
          this.currentPage + this.middlePagesMaxRange() < this.nbOfPages - 1
          ? this.currentPage + this.middlePagesMaxRange()
          : this.currentPage + 1
      );
    } else {
      return [];
    }
  }

  private getLastPages() {
    if (this.currentPage >= this.nbOfPages - 2) {
      return this.createPagesArray(this.nbOfPages - 2, this.nbOfPages);
    } else {
      return this.createPagesArray(this.nbOfPages, this.nbOfPages);
    }
  }

  goToPreviousPage() {
    if (this.currentPage !== 1) {
      this.currentPage -= 1;
      this.getPages();
      this.pageChange.emit(this.currentPage);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getPages();
    this.pageChange.emit(this.currentPage);
  }

  goToNextPage() {
    if (this.currentPage !== this.nbOfPages) {
      this.currentPage += 1;
      this.getPages();
      this.pageChange.emit(this.currentPage);
    }
  }
}
