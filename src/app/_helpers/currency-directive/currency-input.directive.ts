 import {
  Directive,
  HostListener,
  ElementRef,
  OnInit,
  Input
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Directive({ selector: '[currencyInput]' })
export class CurrencyInputDirective implements OnInit {
  // build the regex based on max pre decimal digits allowed
  private regexString(max?: number) {
    const maxStr = max ? `{0,${max}}` : `+`;
    return `^(\\d${maxStr}(\\.\\d{0,2})?|\\.\\d{0,2})$`;
  }
  private digitRegex: RegExp;
  private setRegex(maxDigits?: number) {
    this.digitRegex = new RegExp(this.regexString(maxDigits), 'g');
  }
  @Input()
  set maxDigits(maxDigits: number) {
    this.setRegex(maxDigits);
  }

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;
    this.setRegex();
  }

  ngOnInit() {
    this.el.value = this.currencyPipe.transform(this.el.value, 'IDR ');
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value) {
    // on focus remove currency formatting
    this.el.value = value.replace(/[^0-9.]+/g, '');
    this.el.select();
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    // on blur, add currency formatting
    this.el.value = this.currencyPipe.transform(value, 'IDR ');
  }

  @HostListener('keydown.control.z', ['$event.target.value'])
  onUndo(value) {
    this.el.value = '';
  }

  // variable to store last valid input
  private lastValid = '';
  @HostListener('input', ['$event'])
  onInput(event) {
    // on input, run regex to only allow certain characters and format
    const cleanValue = (event.target.value.match(this.digitRegex) || []).join(
      ''
    );
    if (cleanValue || !event.target.value) this.lastValid = cleanValue;
    this.el.value = cleanValue || this.lastValid;
  }
}
