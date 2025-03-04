import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepcategoryComponent } from './deepcategory.component';

describe('DeepcategoryComponent', () => {
  let component: DeepcategoryComponent;
  let fixture: ComponentFixture<DeepcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeepcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeepcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
