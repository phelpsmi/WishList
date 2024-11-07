import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishDetailsComponent } from './wish-details.component';

describe('WishDetailsComponent', () => {
  let component: WishDetailsComponent;
  let fixture: ComponentFixture<WishDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
