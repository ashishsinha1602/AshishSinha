import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  uidb64 = "";
  token = "";
  verification_msg = "";

  constructor(private service: ServiceService, private spinner: NgxSpinnerService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.spinner.show()
    var url = new URL(window.location.href)
    this.uidb64 = url.searchParams.get("uidb64")
    this.token = url.searchParams.get("token")

    this.service.OnGetMethod("/", "email-verification" + "?uidb64=" + this.uidb64
      + "&token=" + this.token).subscribe(res => {
        if (res.status) {
          this.spinner.hide()
          this.verification_msg = res.message;
        }
      },
        err => {
          console.log(err);
          this.spinner.hide()
          this.dialog.open(DialogComponent, {
            width: '270px',
            data: { title: "", content: err.error.message }
          })
        })
  }

}
