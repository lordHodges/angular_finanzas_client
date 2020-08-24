import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/_services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-costos-vent',
  templateUrl: './form-costos-vent.component.html',
  styleUrls: ['./form-costos-vent.component.less'],
})
export class FormCostosVentComponent implements OnInit {
  form: FormGroup;
  isAddMode: boolean;
  id: string;
  submitted = false;
  loading = false;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
      responsable: ['', Validators.required],
      respaldo: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    if (this.isAddMode) {
      this.registrarEgreso();
    } else {
      this.editarEgreso();
    }
  }
  registrarEgreso() {}
  editarEgreso() {}
}
