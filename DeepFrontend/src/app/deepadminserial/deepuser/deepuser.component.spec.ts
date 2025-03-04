import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepuserComponent } from './deepuser.component';

describe('DeepuserComponent', () => {
  let component: DeepuserComponent;
  let fixture: ComponentFixture<DeepuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeepuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeepuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
