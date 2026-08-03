import { OverlayContainer } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TEST_CONFIG } from '../../test-config';
import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let fixture: ComponentFixture<TooltipComponent>;
  let overlayContainer: OverlayContainer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipComponent],
      providers: [...TEST_CONFIG.providers!]
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipComponent);
    overlayContainer = TestBed.inject(OverlayContainer);
    fixture.detectChanges();
  });

  it('displays the popup when the info button is clicked', async () => {
    const trigger = fixture.nativeElement.querySelector(
      '.sdg-tooltip-button'
    ) as HTMLButtonElement;

    trigger.click();
    await fixture.whenStable();

    expect(
      overlayContainer
        .getContainerElement()
        .querySelector('.sdg-tooltip-content')
    ).toBeTruthy();
  });

  it('closes the popup when the close button is clicked', async () => {
    const trigger = fixture.nativeElement.querySelector(
      '.sdg-tooltip-button'
    ) as HTMLButtonElement;
    trigger.click();
    await fixture.whenStable();

    const closeButton = overlayContainer
      .getContainerElement()
      .querySelector('.sdg-tooltip-close') as HTMLButtonElement;
    closeButton.click();
    await fixture.whenStable();

    expect(
      overlayContainer
        .getContainerElement()
        .querySelector('.sdg-tooltip-content')
    ).toBeNull();
  });

  it('closes the popup when the trigger is clicked again', async () => {
    const trigger = fixture.nativeElement.querySelector(
      '.sdg-tooltip-button'
    ) as HTMLButtonElement;
    trigger.click();
    await fixture.whenStable();

    trigger.click();
    await fixture.whenStable();

    expect(
      overlayContainer
        .getContainerElement()
        .querySelector('.sdg-tooltip-content')
    ).toBeNull();
  });

  it('closes the popup when clicking outside it', async () => {
    const trigger = fixture.nativeElement.querySelector(
      '.sdg-tooltip-button'
    ) as HTMLButtonElement;
    trigger.click();
    await fixture.whenStable();

    document.body.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true })
    );
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();

    expect(
      overlayContainer
        .getContainerElement()
        .querySelector('.sdg-tooltip-content')
    ).toBeNull();
  });

  it('opens to the right by default', async () => {
    const trigger = fixture.nativeElement.querySelector(
      '.sdg-tooltip-button'
    ) as HTMLButtonElement;
    trigger.click();
    await fixture.whenStable();

    expect(
      overlayContainer
        .getContainerElement()
        .querySelector('.sdg-tooltip-content.--right')
    ).toBeTruthy();
  });

  it('opens the popup with the selected position', async () => {
    fixture.componentRef.setInput('position', 'top');
    await fixture.whenStable();

    const trigger = fixture.nativeElement.querySelector(
      '.sdg-tooltip-button'
    ) as HTMLButtonElement;
    trigger.click();
    await fixture.whenStable();

    expect(
      overlayContainer
        .getContainerElement()
        .querySelector('.sdg-tooltip-content')
    ).toBeTruthy();
  });

  it('renders the selected trigger icon', async () => {
    fixture.componentRef.setInput('icon', 'help');
    await fixture.whenStable();

    const icon = fixture.nativeElement.querySelector('mat-icon') as HTMLElement;

    expect(icon.textContent?.trim()).toBe('help');
  });
});
