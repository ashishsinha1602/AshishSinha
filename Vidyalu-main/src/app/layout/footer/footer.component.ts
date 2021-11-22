import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { AdminserviceService } from '../../admin/admin-service/adminservice.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  newsletter_form = new FormGroup({
    email: new FormControl('', [Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  });

  constructor(private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private service: AdminserviceService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  SubmitNewsletter() {
    let param = {
      email: this.newsletter_form.value.email
    }
  }

}
