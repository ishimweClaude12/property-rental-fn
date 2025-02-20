import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputType } from '../../models/input.types';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent), // Register this component as a ControlValueAccessor
      multi: true, // Allow multiple value accessors
    },
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {
  private _value: string = ''; // Internal value
  private onChange: any = () => {}; // Callback for value changes
  private onTouched: any = () => {}; // Callback for touch events

  @Input() label: string = 'Label';
  @Input() hasLabel: boolean = false;
  @Input({ required: true }) type: InputType = 'TEXT';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;
  @Input() hasError: boolean = false;
  @Input() error: string = '';
  @Input() maxLength: number = 100;
  @Input() minLength: number = 0;
  @Input() pattern: string = '';
  @Input() autocomplete: string = 'on';
  @Input() autofocus: boolean = false;
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) id: string = '';
  @Input() customStyles: string = '';
  @Input() style: string = '';
  @Input() hasLeadingIcon: boolean = false;
  @Input() hasTrailingIcon: boolean = false;
  @Input() leadingIcon: string = '';
  @Input() trailingIcon: string = '';
  passwordVisible: boolean = false;

  @Output() valueChange: EventEmitter<string> = new EventEmitter();
  @Output() change: EventEmitter<Event> = new EventEmitter();
  @Output() blur: EventEmitter<Event> = new EventEmitter();
  @Output() focus: EventEmitter<Event> = new EventEmitter();
  @Output() keyUp: EventEmitter<Event> = new EventEmitter();
  @Output() keyDown: EventEmitter<Event> = new EventEmitter();
  @Output() keyPress: EventEmitter<Event> = new EventEmitter();
  @Output() input: EventEmitter<Event> = new EventEmitter();
  @Output() leadingIconClick: EventEmitter<Event> = new EventEmitter();
  @Output() trailingIconClick: EventEmitter<Event> = new EventEmitter();

  // Called when the input value changes
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this._value = target.value; // Update the internal value
    this.onChange(this._value); // Notify Angular of the change
    this.valueChange.emit(this._value); // Emit the value change event
    this.change.emit(event); // Emit the change event
  }

  // ControlValueAccessor methods

  // Called when the form control value changes from the outside
  writeValue(value: any): void {
    this._value = value || ''; // Update the internal value
  }

  // Register a callback to update the model value
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register a callback to mark the control as touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Called when the form control's disabled state changes
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Event handlers

  onInputBlur(event: Event): void {
    this.onTouched(); // Notify Angular that the input was touched
    this.blur.emit(event);
  }

  onInputFocus(event: Event): void {
    this.focus.emit(event);
  }

  onInputKeyUp(event: Event): void {
    this.keyUp.emit(event);
  }

  onInputKeyDown(event: Event): void {
    this.keyDown.emit(event);
  }

  onInputKeyPress(event: Event): void {
    this.keyPress.emit(event);
  }

  onLeadingIconClick(event: Event): void {
    this.leadingIconClick.emit(event);
  }

  onTrailingIconClick(event: Event): void {
    this.passwordVisible = !this.passwordVisible;
    this.trailingIconClick.emit(event);
  }
}
