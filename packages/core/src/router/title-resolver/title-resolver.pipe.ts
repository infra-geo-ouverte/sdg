import { Pipe, PipeTransform, inject } from '@angular/core';

import { SdgRoute } from '../route.interface';
import { resolveTitle } from '../router';
import { TitleResolver } from './title-resolver';

@Pipe({
  name: 'titleResolver',
  standalone: true
})
export class TitleResolverPipe implements PipeTransform {
  private titleResolver = inject(TitleResolver, { optional: true });

  transform(value: SdgRoute): string | undefined {
    return resolveTitle(value, this.titleResolver);
  }
}
