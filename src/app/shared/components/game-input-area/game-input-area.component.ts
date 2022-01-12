import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game-input-area',
  templateUrl: './game-input-area.component.html',
  styleUrls: ['./game-input-area.component.css']
})
export class GameInputAreaComponent implements OnInit {

  error: any;
  loading = false;
  returnUrl: string = "";
  loginForm: FormGroup;

  get f() {
    return this.loginForm.controls;
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private fb: FormBuilder,
    private logger: ToastrService
  ) {}

  ngOnInit() {   
    this.loginForm = this.fb.group({
      farmer1: ["", [Validators.required]],
      farmer2: ["", [Validators.required]],
      farmer3: ["", [Validators.required]]
    });
  }

  handleSubmit() {

  }

}
