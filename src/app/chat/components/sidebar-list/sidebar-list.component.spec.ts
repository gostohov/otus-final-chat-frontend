import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarList } from './sidebar-list.component';

describe('ContactListComponent', () => {
  let component: SidebarList;
  let fixture: ComponentFixture<SidebarList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarList ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
