import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyholderdashboardComponent } from './policyholderdashboard.component';

describe('PolicyholderdashboardComponent', () => {
  let component: PolicyholderdashboardComponent;
  let fixture: ComponentFixture<PolicyholderdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyholderdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyholderdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
