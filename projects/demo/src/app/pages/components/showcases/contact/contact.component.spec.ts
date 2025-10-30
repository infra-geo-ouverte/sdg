import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from 'projects/demo/src/test-config';

import { ContactDemoComponent } from './contact.component';

describe('ContactDemoComponent', () => {
  let component: ContactDemoComponent;
  let fixture: ComponentFixture<ContactDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDemoComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
