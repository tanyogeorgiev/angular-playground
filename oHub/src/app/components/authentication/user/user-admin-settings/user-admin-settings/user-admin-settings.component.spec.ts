import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminSettingsComponent } from './user-admin-settings.component';

describe('UserAdminSettingsComponent', () => {
  let component: UserAdminSettingsComponent;
  let fixture: ComponentFixture<UserAdminSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
