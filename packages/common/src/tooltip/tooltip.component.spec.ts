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

  it('adds required ARIA attributes to trigger button', () => {
    const trigger = fixture.nativeElement.querySelector(
      '.sdg-tooltip-button'
    ) as HTMLButtonElement;

    expect(trigger.getAttribute('aria-label')).toBe("Ouvrir l'infobulle");
    expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    expect(trigger.getAttribute('aria-controls')).toContain('sdg-tooltip-');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
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
    expect(document.activeElement).toBe(trigger);
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

  it('does not restore trigger focus when clicking outside it', async () => {
    const trigger = fixture.nativeElement.querySelector(
      '.sdg-tooltip-button'
    ) as HTMLButtonElement;
    const outsideButton = document.createElement('button');
    document.body.append(outsideButton);
    trigger.click();
    await fixture.whenStable();

    outsideButton.focus();
    outsideButton.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true })
    );
    await fixture.whenStable();

    expect(document.activeElement).toBe(outsideButton);
    outsideButton.remove();
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
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  it('opens the popup with the selected position class', async () => {
    vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(
      1000
    );
    vi.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(
      800
    );
    fixture.componentRef.setInput('position', 'top');
    await fixture.whenStable();

    const trigger = fixture.nativeElement.querySelector(
      '.sdg-tooltip-button'
    ) as HTMLButtonElement;
    vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue(
      new DOMRect(400, 300, 40, 40)
    );
    trigger.click();
    await fixture.whenStable();

    expect(
      overlayContainer
        .getContainerElement()
        .querySelector('.sdg-tooltip-content.--top')
    ).toBeTruthy();
  });

  it('renders the title when provided', async () => {
    fixture.componentRef.setInput('title', 'My title');
    await fixture.whenStable();

    const trigger = fixture.nativeElement.querySelector(
      '.sdg-tooltip-button'
    ) as HTMLButtonElement;
    trigger.click();
    await fixture.whenStable();

    const panel = overlayContainer
      .getContainerElement()
      .querySelector('.sdg-tooltip-content') as HTMLElement;
    const title = overlayContainer
      .getContainerElement()
      .querySelector('.sdg-tooltip-title') as HTMLElement;

    expect(title.textContent?.trim()).toBe('My title');
    expect(panel.getAttribute('role')).toBe('dialog');
    expect(panel.getAttribute('aria-labelledby')).toBe(title.id);
    expect(panel.getAttribute('aria-label')).toBeNull();
  });

  it('does not render the title element when title is not provided', async () => {
    const trigger = fixture.nativeElement.querySelector(
      '.sdg-tooltip-button'
    ) as HTMLButtonElement;
    trigger.click();
    await fixture.whenStable();

    expect(
      overlayContainer.getContainerElement().querySelector('.sdg-tooltip-title')
    ).toBeNull();

    const panel = overlayContainer
      .getContainerElement()
      .querySelector('.sdg-tooltip-content') as HTMLElement;
    expect(panel.getAttribute('aria-labelledby')).toBeNull();
    expect(panel.getAttribute('aria-label')).toBe("Ouvrir l'infobulle");
  });

  it('uses a custom aria label when provided', async () => {
    fixture.componentRef.setInput('buttonAriaLabel', "Plus d'informations");
    await fixture.whenStable();

    const trigger = fixture.nativeElement.querySelector(
      '.sdg-tooltip-button'
    ) as HTMLButtonElement;

    expect(trigger.getAttribute('aria-label')).toBe("Plus d'informations");
  });

  it('uses the default aria label when configured labels are empty', async () => {
    fixture.componentRef.setInput('buttonAriaLabel', '  ');
    fixture.componentRef.setInput('buttonTooltip', '');
    fixture.componentRef.setInput('labels', { openTooltip: '' });
    await fixture.whenStable();

    const trigger = fixture.nativeElement.querySelector(
      '.sdg-tooltip-button'
    ) as HTMLButtonElement;

    expect(trigger.getAttribute('aria-label')).toBe("Ouvrir l'infobulle");
  });

  it('renders the selected trigger icon', async () => {
    fixture.componentRef.setInput('icon', 'help');
    await fixture.whenStable();

    const icon = fixture.nativeElement.querySelector('mat-icon') as HTMLElement;

    expect(icon.textContent?.trim()).toBe('help');
  });
});
