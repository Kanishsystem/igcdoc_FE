import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { SmartModelComponent } from '../core/components/smart-model/smart-model.component';

@Injectable({
  providedIn: 'root'
})
export class SmartmodelService {

  private modalComponentRef: ComponentRef<SmartModelComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  /**
   * 
   * @param ref 
   */
  setModalComponentRef(ref: ComponentRef<SmartModelComponent>): void {
    this.modalComponentRef = ref;
  }
  /**
   * 
   * @param viewContainerRef 
   */
  openModal(viewContainerRef: ViewContainerRef): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(SmartModelComponent);
    const componentRef = factory.create(viewContainerRef.injector);
    this.modalComponentRef = componentRef;
    viewContainerRef.insert(componentRef.hostView);
  }
  /**
   * 
   */
  closeModal(): void {
    if (this.modalComponentRef) {
      this.modalComponentRef.destroy();
    }
  }
}
