import {
  Address,
  IContact,
  IContactData,
  Range,
  Time
} from './contact.interface';

export class Contact implements IContact {
  name?: string;
  schedule?: string;
  hours?: string;
  phone?: string;
  address?: Address;
  email?: string;
  website?: string;

  constructor(contact: IContactData) {
    if (contact.name) {
      this.name = contact.name;
    }

    if (contact.schedule) {
      this.schedule = this.formatScheduleLabel(contact.schedule);
    }

    if (contact.hours) {
      this.hours = this.formatHoursLabel(contact.hours);
    }

    if (contact.phone) {
      this.phone = this.formatPhoneLabel(contact.phone);
    }

    if (contact.address) {
      this.address = contact.address;
      this.address.postalCode =
        this.formatPostalCodeLabel(contact.address) ?? '';
    }

    if (contact.email) {
      this.email = contact.email;
    }

    if (this.website) {
      this.website = contact.website;
    }
  }

  protected formatScheduleLabel(schedule: Range<string>): string {
    return `Du ${schedule?.from} au ${schedule?.from}`;
  }

  protected formatHoursLabel(hours: Range<Time>): string {
    const fromMinutes =
      hours?.from.minutes === undefined
        ? ''
        : `0${hours.from.minutes}`.slice(-2);

    const toMinutes =
      hours?.to.minutes === undefined ? '' : `0${hours.to.minutes}`.slice(-2);

    return `De ${hours?.from.hours} h ${fromMinutes} à ${hours?.to.hours} h ${toMinutes}`;
  }

  protected formatPhoneLabel(phone: string): string | undefined {
    const cleaned = phone?.replace(/\D/g, '');
    const match = cleaned?.match(/^(\d{3})(\d{3})(\d{4})$/);

    return match ? `${match[1]} ${match[2]}-${match[3]}` : undefined;
  }

  protected formatPostalCodeLabel(address: Address): string | undefined {
    return address?.postalCode
      .toUpperCase()
      .replace(/\W/g, '')
      .replace(/(...)/, '$1 ');
  }
}
