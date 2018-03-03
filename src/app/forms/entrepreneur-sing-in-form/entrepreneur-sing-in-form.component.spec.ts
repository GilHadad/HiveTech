import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurSingInFormComponent } from './entrepreneur-sing-in-form.component';

describe('EntrepreneurSingInFormComponent', () => {
  let component: EntrepreneurSingInFormComponent;
  let fixture: ComponentFixture<EntrepreneurSingInFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepreneurSingInFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepreneurSingInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
