import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGuestsComponent } from './my-guests.component';

describe('MyGuestsComponent', () => {
  let component: MyGuestsComponent;
  let fixture: ComponentFixture<MyGuestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyGuestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
