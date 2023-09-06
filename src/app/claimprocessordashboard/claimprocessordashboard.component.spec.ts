import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimprocessordashboardComponent } from './claimprocessordashboard.component';

describe('ClaimprocessordashboardComponent', () => {
  let component: ClaimprocessordashboardComponent;
  let fixture: ComponentFixture<ClaimprocessordashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimprocessordashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimprocessordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
