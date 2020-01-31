import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ToastGroupComponent} from './toast-group.component';

describe('MessageComponent', () => {
  let component: ToastGroupComponent;
  let fixture: ComponentFixture<ToastGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToastGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
