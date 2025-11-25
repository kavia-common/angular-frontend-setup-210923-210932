import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { EnvService } from '../../core/services/env.service';

// PUBLIC_INTERFACE
@Directive({
  selector: '[appFeatureFlag]',
  standalone: true
})
export class FeatureFlagDirective {
  private tpl = inject(TemplateRef<any>);
  private vcr = inject(ViewContainerRef);
  private env = inject(EnvService);

  private hasView = false;

  @Input('appFeatureFlag') set flagName(name: string) {
    const flagsRaw = this.env.getString('NG_APP_FEATURE_FLAGS', '') || '';
    const set = new Set(flagsRaw.split(',').map(s => s.trim()).filter(Boolean));
    const shouldShow = set.has(name);
    if (shouldShow && !this.hasView) {
      this.vcr.createEmbeddedView(this.tpl);
      this.hasView = true;
    } else if (!shouldShow && this.hasView) {
      this.vcr.clear();
      this.hasView = false;
    }
  }
}
