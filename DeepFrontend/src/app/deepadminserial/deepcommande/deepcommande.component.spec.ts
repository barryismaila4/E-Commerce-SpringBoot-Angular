import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepcommandeComponent } from './deepcommande.component';

describe('DeepcommandeComponent', () => {
  let component: DeepcommandeComponent;
  let fixture: ComponentFixture<DeepcommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeepcommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeepcommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
