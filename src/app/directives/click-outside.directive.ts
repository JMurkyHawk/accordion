import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
    selector: '[clickOutside]',
    standalone: true
})
export class ClickOutsideDirective {

    constructor(
        private elementRef: ElementRef
    ) {  }

    @Output() public clickOutside = new EventEmitter();

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: any, targetElement: HTMLElement): void {

        if (!targetElement) return;

        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(event);
        }
    }

}
