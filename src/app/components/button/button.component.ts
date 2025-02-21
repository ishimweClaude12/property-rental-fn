import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonTypes } from '../../models/button.types';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: ButtonTypes = 'Default';
  @Input() disabled: boolean = false;
  @Input() leadingIcon: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() text: string = '';
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() width: string = 'auto';
  @Input() height: string = 'auto';
  @Input() color: string = '';
  @Input() backgroundColor: string = '';
  @Input() borderRadius: string = '';
  @Input() boxShadow: string = '';
  @Input() fontSize: string = '';
  @Input() trailingIcon: string = '';
  @Input() label: string = '';

  @Output() click = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled) {
      this.click.emit();
    }
  }

  getButtonClasses(): { [key: string]: boolean } {
    return {
      'button-active': this.type === 'Active',
      'button-dormant': this.type === 'Dormant',
      'button-disabled': this.disabled || this.type === 'Disabled',
      'button-danger': this.type === 'Danger',
      'button-pressed': this.type === 'Pressed',
      'button-default': this.type === 'Default',
      'button-small': this.size === 'small',
      'button-medium': this.size === 'medium',
      'button-large': this.size === 'large',
      'button-primary': this.variant === 'primary',
      'button-secondary': this.variant === 'secondary',
      'button-outline': this.variant === 'outline',
    };
  }

  getButtonStyles(): { [key: string]: string } {
    return {
      width: this.width,
      height: this.height,
      color: this.color,
      'background-color': this.backgroundColor,
      'border-radius': this.borderRadius,
      'box-shadow': this.boxShadow,
      'font-size': this.fontSize,
    };
  }
}
