import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * A directive that adds fallback handling for images.
 * It sets appropriate image dimensions and handles error events to load a Scioto-branded placeholder.
 */
@Directive({
  standalone: true,
  selector: '[imgFallback]'
})
export class ImgFallbackDirective {
  @Input() imgFallback: string = '/assets/scioto-placeholder-small.svg';
  @Input() width: number = 400;
  @Input() height: number = 225;
  private hasError = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Set explicit width and height to match the container dimensions
    this.el.nativeElement.style.width = `${this.width}px`;
    this.el.nativeElement.style.height = `${this.height}px`;
    this.el.nativeElement.style.objectFit = 'cover';
  }

  @HostListener('error')
  onError() {
    if (!this.hasError) {
      this.hasError = true; // Prevent infinite loop if fallback also fails
      this.el.nativeElement.src = this.imgFallback;
      this.el.nativeElement.style.objectFit = 'contain'; // Switch to contain for the placeholder
    }
  }
} 