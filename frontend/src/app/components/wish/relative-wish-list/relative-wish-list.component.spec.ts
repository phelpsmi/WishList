import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativeWishListComponent } from './relative-wish-list.component';

describe('WishListComponent', () => {
  let component: RelativeWishListComponent;
  let fixture: ComponentFixture<RelativeWishListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelativeWishListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelativeWishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
