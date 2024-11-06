import { Address, Contact, IContactData, Range, Time } from '@igo2/sdg';

export class ContactCustom extends Contact {
  constructor(data: IContactData) {
    super(data);
  }

  protected formatHoursLabel(hours: Range<Time>): string {
    const fromMinutes =
      hours?.from.minutes === undefined
        ? ''
        : `0${hours.from.minutes}`.slice(-2);

    const toMinutes =
      hours?.to.minutes === undefined ? '' : `0${hours.to.minutes}`.slice(-2);

    return `From ${hours?.from.hours} h ${fromMinutes} to ${hours?.to.hours} h ${toMinutes}`;
  }

  protected formatScheduleLabel(schedule: Range<string>): string {
    return `From ${schedule?.from} to ${schedule?.from}`;
  }

  protected override formatPostalCodeLabel(
    address: Address
  ): string | undefined {
    return address?.postalCode
      .toUpperCase()
      .replace(/\W/g, '')
      .replace(/(...)/, '$1 ');
  }
}
