import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateUserPageComponent } from './private-user-page.component';

describe('PrivateUserPageComponent', () => {
  let component: PrivateUserPageComponent;
  let fixture: ComponentFixture<PrivateUserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateUserPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
