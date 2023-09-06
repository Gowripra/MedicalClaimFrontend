import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimprocessorComponent } from './claimprocessor.component';

describe('ClaimprocessorComponent', () => {
  let component: ClaimprocessorComponent;
  let fixture: ComponentFixture<ClaimprocessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimprocessorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimprocessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
