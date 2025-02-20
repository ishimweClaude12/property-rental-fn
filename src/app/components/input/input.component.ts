import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputType } from '../../models/input.types';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label: string = 'Label';
  @Input() hasLabel: boolean = false;
  @Input({ required: true }) type: InputType = 'TEXT';
  @Input() placeholder: string = '';
  @Input() value: string = '';
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

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
    this.change.emit(event);
  }

  onInputBlur(event: Event) {
    this.blur.emit(event);
  }

  onInputFocus(event: Event) {
    this.focus.emit(event);
  }

  onInputKeyUp(event: Event) {
    this.keyUp.emit(event);
  }

  onInputKeyDown(event: Event) {
    this.keyDown.emit(event);
  }

  onInputKeyPress(event: Event) {
    this.keyPress.emit(event);
  }

  onLeadingIconClick(event: Event) {
    this.leadingIconClick.emit(event);
  }

  onTrailingIconClick(event: Event) {
    this.trailingIconClick.emit(event);
  }
}
