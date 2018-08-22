import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListRowComponent } from './client-list-row.component';

describe('ClientListRowComponent', () => {
  let component: ClientListRowComponent;
  let fixture: ComponentFixture<ClientListRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientListRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
