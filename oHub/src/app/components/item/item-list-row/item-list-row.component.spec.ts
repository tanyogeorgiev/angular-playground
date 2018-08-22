import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListRowComponent } from './item-list-row.component';

describe('ItemListRowComponent', () => {
  let component: ItemListRowComponent;
  let fixture: ComponentFixture<ItemListRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemListRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
