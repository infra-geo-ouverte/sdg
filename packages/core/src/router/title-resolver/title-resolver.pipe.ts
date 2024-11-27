import { Optional, Pipe, PipeTransform } from '@angular/core';

import { SdgRoute } from '../route.interface';
import { resolveTitle } from '../router';
import { TitleResolver } from './title-resolver';

@Pipe({
  name: 'titleResolver',
  standalone: true
})
export class TitleResolverPipe implements PipeTransform {
  constructor(@Optional() private titleResolver: TitleResolver) {}

  transform(value: SdgRoute): string | undefined {
    return resolveTitle(value, this.titleResolver);
  }
}
