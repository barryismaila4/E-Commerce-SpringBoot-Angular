import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeeppublicComponent } from './deeppublic.component';

describe('DeeppublicComponent', () => {
  let component: DeeppublicComponent;
  let fixture: ComponentFixture<DeeppublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeeppublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeeppublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
