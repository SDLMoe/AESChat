import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  // ElementRef,
  Input,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';

@Directive({
  selector: '[loadingMask]'
})
export class LoadingMaskDirective {

  @Input() isLoading: boolean = false;

  private componentInstance: ComponentRef<LoaderComponent>;

  constructor(
    // ef: ElementRef,
    viewContainerRef: ViewContainerRef,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    const componentFactory = componentFactoryResolver.resolveComponentFactory(LoaderComponent);
    this.componentInstance = viewContainerRef.createComponent(componentFactory);
    const loaderComponentElement = this.componentInstance.location.nativeElement;
    const sibling: HTMLElement = loaderComponentElement.previousSibling;
    setTimeout(() => {
      //console.log(sibling.firstChild);
      sibling.insertBefore(loaderComponentElement, sibling.firstChild);
    }, 100);
    //sibling.insertBefore(loaderComponentElement, sibling.firstChild);
  }

  ngOnChanges(load: SimpleChanges): void {
    //console.log("change: ", this.isLoading);
    this.componentInstance.instance.loader = load.isLoading.currentValue;
  }

  ngOnDestroy(): void {
    if (this.componentInstance) {
      this.componentInstance.destroy();
    }
  }

}
