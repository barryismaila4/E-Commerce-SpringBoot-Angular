import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepproduitComponent } from './deepproduit.component';

describe('DeepproduitComponent', () => {
  let component: DeepproduitComponent;
  let fixture: ComponentFixture<DeepproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeepproduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeepproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
