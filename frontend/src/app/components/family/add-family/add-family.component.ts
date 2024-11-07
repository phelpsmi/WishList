import { Component } from '@angular/core';
import { WishService } from 'src/app/services/api/wish.service';
import { Family } from '../../../models/family.model';
import { FamilyService } from '../../../services/api/family.service';

@Component({
  selector: 'app-add-family',
  templateUrl: './add-family.component.html',
  styleUrls: ['./add-family.component.css']
})
export class AddFamilyComponent {

  family: Family = {
    name: '',
  };
  submitted = false;

  constructor(private familyService: FamilyService) { }

  saveFamily(): void {
    const data = {
      name: this.family.name,
    };

    this.familyService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
}
