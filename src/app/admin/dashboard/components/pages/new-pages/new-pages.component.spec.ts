import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPagesComponent } from './new-pages.component';

describe('NewPagesComponent', () => {
  let component: NewPagesComponent;
  let fixture: ComponentFixture<NewPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
