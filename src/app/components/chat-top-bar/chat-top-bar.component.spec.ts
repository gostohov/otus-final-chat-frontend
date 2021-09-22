import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTopBarComponent } from './chat-top-bar.component';

describe('ChatTopBarComponent', () => {
  let component: ChatTopBarComponent;
  let fixture: ComponentFixture<ChatTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatTopBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
