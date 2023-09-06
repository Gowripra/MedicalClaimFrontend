import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyholderComponent } from './policyholder.component';

describe('PolicyholderComponent', () => {
  let component: PolicyholderComponent;
  let fixture: ComponentFixture<PolicyholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
