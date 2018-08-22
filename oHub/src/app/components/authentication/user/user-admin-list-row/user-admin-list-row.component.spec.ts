import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminListRowComponent } from './user-admin-list-row.component';

describe('UserAdminListRowComponent', () => {
  let component: UserAdminListRowComponent;
  let fixture: ComponentFixture<UserAdminListRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminListRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
