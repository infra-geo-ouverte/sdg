import { Component, Signal } from '@angular/core';

import { Contact, ContactComponent, IContact, IContactData } from '@igo2/sdg';
import { BreakpointService } from '@igo2/sdg/core';

import {
  ExampleViewerComponent,
  ExternalLinkComponent
} from 'projects/demo/src/app/components';

import { ContactCustom } from './contact-custom';

const currentDate = new Date();

const nextDate = new Date(currentDate);
nextDate.setDate(currentDate.getDate() + 5);

const contactData: IContactData = {
  name: 'John Doe',
  schedule: {
    from: new Intl.DateTimeFormat('fr-ca', { weekday: 'long' }).format(
      currentDate
    ),
    to: new Intl.DateTimeFormat('fr-ca', { weekday: 'long' }).format(nextDate)
  },
  hours: {
    from: {
      hours: currentDate.getHours()
    },
    to: {
      hours: currentDate.getHours(),

      minutes: currentDate.getMinutes()
    }
  },
  phone: '4185551234',
  address: {
    number: 2525,
    street: 'boulevard Laurier',
    city: 'Québec',
    postalCode: 'g1v2l2'
  },
  email: 'a@gmail.com',
  website: 'https://google.com'
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ExampleViewerComponent, ExternalLinkComponent, ContactComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactDemoComponent {
  /** La classe Contact offre un préformattage selon le modèle de donnée IContactData */
  contact = new Contact(contactData);

  /** On peut toujours modifié cette classe de base pour permettre un comportement personnalisé */
  contactCustomModel = new ContactCustom(contactData);

  /** Ou utilisé un objet directement */
  contactObject: IContact = {
    address: {
      city: 'Québec',
      number: 2525,
      postalCode: 'G1V 2L2',
      street: 'boulevard Laurier'
    },
    email: 'test@gmail.com',
    hours: 'De 17 h à 17 h 02',
    name: 'John Doe',
    phone: '418 555-1234',
    schedule: 'Du lundi au vendredi',
    website: 'http://localhost:4200/composants/showcases/coordonnees'
  };

  constructor(private breakpointService: BreakpointService) {}

  get isHandset(): Signal<boolean> {
    return this.breakpointService.isHandset;
  }
}
