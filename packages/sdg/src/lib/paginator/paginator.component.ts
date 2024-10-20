import { DOCUMENT, NgFor, NgIf, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
  effect,
  inject,
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
export class PaginatorComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document) {
    effect(() => {
      const pageSize = this.pageSize();
      if (!this.initialPageIndexFirstChange) {
        this.currentPageIndex = 0;
        this.pageChange.emit(this.currentPageIndex);

        this.getNbOfPages(pageSize);
      } else {
        this.initialPageIndexFirstChange = false;
      }
    });
  }
  injector = inject(Injector);

  listLength = input.required<number>();
  pageSize = input.required<number>();
  middlePagesMaxRange = input<number>(1);
  initialPageIndex = input<number>(0);
  isHandset = input<boolean>();

  pageChange = output<number>();

  initialPageIndexFirstChange = true;

  currentPageIndex = 0;
  nbOfPages = 0;

  firstPagesIndexes: number[] = [];
  middlePagesIndexes: number[] = [];
  lastPagesIndexes: number[] = [];
  pagesIndexes: number[] = [];

  ngOnInit() {
    this.currentPageIndex = this.initialPageIndex();

    this.getNbOfPages(this.pageSize());
  }

  private getNbOfPages(pageSize: number) {
    this.nbOfPages = Math.ceil(this.listLength() / pageSize);

    this.getPages();
  }

  private createPagesArray(startIndex: number, finishIndex: number) {
    return Array.from(
      { length: finishIndex - startIndex + 1 },
      (_, a) => a + startIndex
    );
  }

  private getPages() {
    this.firstPagesIndexes = [];
    this.middlePagesIndexes = [];
    this.lastPagesIndexes = [];
    this.pagesIndexes = [];

    if (this.nbOfPages > 6) {
      this.firstPagesIndexes = this.getFirstPages();
      this.middlePagesIndexes = this.getMiddlePages();
      this.lastPagesIndexes = this.getLastPages();
    } else {
      this.pagesIndexes = Array.from({ length: this.nbOfPages }, (v, k) => k);
    }

    this.document
      .getElementsByTagName('sdg-header')
      .item(0)
      ?.scrollIntoView(true);
  }

  private getFirstPages() {
    if (this.currentPageIndex <= 2) {
      return this.createPagesArray(0, 2);
    } else {
      return this.createPagesArray(0, 0);
    }
  }

  private getMiddlePages() {
    if (
      this.currentPageIndex >= 3 &&
      this.currentPageIndex <= this.nbOfPages - 4
    ) {
      return this.createPagesArray(
        !this.isHandset() &&
          this.currentPageIndex - this.middlePagesMaxRange() > 1
          ? this.currentPageIndex - this.middlePagesMaxRange()
          : this.currentPageIndex - 1,
        !this.isHandset() &&
          this.currentPageIndex + this.middlePagesMaxRange() <
            this.nbOfPages - 2
          ? this.currentPageIndex + this.middlePagesMaxRange()
          : this.currentPageIndex + 1
      );
    } else {
      return [];
    }
  }

  private getLastPages() {
    if (this.currentPageIndex >= this.nbOfPages - 3) {
      return this.createPagesArray(this.nbOfPages - 3, this.nbOfPages - 1);
    } else {
      return this.createPagesArray(this.nbOfPages - 1, this.nbOfPages - 1);
    }
  }

  goToPreviousPage() {
    if (this.currentPageIndex !== 0) {
      this.currentPageIndex -= 1;
      this.getPages();
      this.pageChange.emit(this.currentPageIndex);
    }
  }

  goToPage(pageIndex: number) {
    this.currentPageIndex = pageIndex;
    this.getPages();
    this.pageChange.emit(this.currentPageIndex);
  }

  goToNextPage() {
    if (this.currentPageIndex !== this.nbOfPages - 1) {
      this.currentPageIndex += 1;
      this.getPages();
      this.pageChange.emit(this.currentPageIndex);
    }
  }
}
