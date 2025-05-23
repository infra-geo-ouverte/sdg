export interface IContact {
  name?: string;
  schedule?: string;
  hours?: string;
  phone?: string;
  address?: Address;
  email?: string;
  website?: string;
}

export interface IContactData {
  name?: string;
  schedule?: Range<string>;
  hours?: Range<Time>;
  phone?: string;
  address?: Address;
  email?: string;
  website?: string;
}

export interface Address {
  number: number;
  street: string;
  city: string;
  postalCode: string;
}

export interface Range<T> {
  from: T;
  to: T;
}

export interface Time {
  hours: number;
  minutes?: number;
}
