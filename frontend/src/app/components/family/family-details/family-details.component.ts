import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Family } from '../../../models/family.model';
import { FamilyService } from '../../../services/api/family.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css']
})
export class FamilyDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentFamily: Family = {
    name: '',
    users: []
  };

  message = '';
  currentUser: User;

  constructor(
    private familyService: FamilyService,
    private route: ActivatedRoute,
    private router: Router,
    tokenStorageService: TokenStorageService) {
      this.currentUser = tokenStorageService.getUser().value ?? {};
    }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getFamily(this.route.snapshot.params["id"]);
    } else {
    }
  }

  getFamily(id: string): void {
    this.familyService.get(id)
      .subscribe({
        next: (data) => {
          this.currentFamily = data;
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

  joinFamily(): void {
    this.message = '';

    this.familyService.join(this.currentFamily.id)
      .subscribe({
        next: (res) => {
          this.currentFamily.users?.push(this.currentUser);
          this.message = res.message ? res.message : `You have joined ${this.currentFamily.name}`;
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

  leaveFamily(): void {
    this.message = '';

    this.familyService.leave(this.currentFamily.id)
      .subscribe({
        next: (res) => {
          this.currentFamily.users?.splice(this.currentFamily.users.findIndex(u => u.id == this.currentUser.id), 1);
          this.message = res.message ? res.message : `You have left ${this.currentFamily.name}`;
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

  updateFamily(): void {
    this.message = '';

    this.familyService.update(this.currentFamily.id, this.currentFamily)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Family was updated successfully!';
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

  deleteFamily(): void {
    this.familyService.delete(this.currentFamily.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/family/all']);
        },
        error: (e: HttpErrorResponse) => console.error(e)
      });
  }

  inFamily(): boolean {
    return !!this.currentFamily?.users?.find(u => u.id == this.currentUser.id);
  }

  ownsFamily(): boolean {
    return this.currentFamily.owner?.id == this.currentUser.id;
  }
}
