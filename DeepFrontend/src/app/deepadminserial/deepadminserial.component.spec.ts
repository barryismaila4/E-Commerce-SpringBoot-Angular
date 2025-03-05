import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepadminserialComponent } from './deepadminserial.component';

describe('DeepadminserialComponent', () => {
  let component: DeepadminserialComponent;
  let fixture: ComponentFixture<DeepadminserialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeepadminserialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeepadminserialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
