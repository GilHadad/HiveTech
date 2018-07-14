import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJoinUsComponent } from './dialog-join-us.component';

describe('DialogJoinUsComponent', () => {
  let component: DialogJoinUsComponent;
  let fixture: ComponentFixture<DialogJoinUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogJoinUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogJoinUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
