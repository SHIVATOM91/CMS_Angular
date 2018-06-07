import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecriptionTemplateComponent } from './decription-template.component';

describe('DecriptionTemplateComponent', () => {
  let component: DecriptionTemplateComponent;
  let fixture: ComponentFixture<DecriptionTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecriptionTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecriptionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
