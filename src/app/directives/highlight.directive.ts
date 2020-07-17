import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el:ElementRef,
    private renderer:Renderer2) { }

    @HostListener('mouseenter') onmouseenter() {
      this.renderer.addClass(this.el.nativeElement,'highlight'); //add class 'highlight' declared in 'style.scss' when the mouse is moved over the element.
    }

    @HostListener('mouseleave') onmouseleave() {
      this.renderer.removeClass(this.el.nativeElement,'highlight'); //removing class 'highlight' declared in 'style.scss' when the mouse is moved away from the element.
    }
}
