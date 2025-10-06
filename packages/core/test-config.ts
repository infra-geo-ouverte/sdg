import { provideZonelessChangeDetection } from '@angular/core';
import { TestModuleMetadata } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

export const TEST_CONFIG: TestModuleMetadata = {
  providers: [provideRouter([]), provideZonelessChangeDetection()]
};
