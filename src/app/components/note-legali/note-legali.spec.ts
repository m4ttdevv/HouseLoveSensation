import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteLegali } from './note-legali';

describe('NoteLegali', () => {
  let component: NoteLegali;
  let fixture: ComponentFixture<NoteLegali>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteLegali]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteLegali);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
