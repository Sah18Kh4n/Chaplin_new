import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CockpitService } from './../../../services/cockpit.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
})
export class TemplatesComponent implements OnInit {
  template: any;
  templates: any[];
  show: boolean = false;
  selectedItem: number = 1;
  templateForm: FormGroup;
  game: number =10
  // @ViewChild("skuDemandModelInput", { static: true }) skuDemandModelInput: any;
  // @ViewChild("skuFinancialModelInput", { static: true }) skuFinancialModelInput: any;
  // @ViewChild("uploadOrderLeadTimesInput", { static: true }) uploadOrderLeadTimesInput: any;
  svgs = [
    'SVG files__Alpha icon.svg',
    'SVG files__Beta icon .svg',
    'SVG files__Omega icon.svg',
    'SVG files__Sigma icon .svg',
  ];
  templateData: any;
  templateData1: any;
  templateDetail: any;
  templateData2: any;
  totalTemplate: any[] = [];
  selectedName: any;
  selectedType: any;
  joined: any;

  get f() {
    return this.templateForm.controls;
  }

  getSvg(index) {
    console.log("(index > 3) ? (index % 4) : index", index, (index > 3) ? "abc": index)
    return  "/assets/svgs/" + this.svgs[(index > 3) ? (index % 4) : index];
  }

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private cockpitService: CockpitService
  ) {
    this.getTemplateDetails();
  }

  ngOnInit(): void {


    // this.template = {
    //   templateId: 'Template 01',
    //   name: 'Aplha TP 01',
    //   industry: 'Grain Storage',
    //   description: 'Learn Grain Demand Optimization',
    //   objective: 'Minimize Demand Forecast Error',
    // };

    //   {
    //     "tmplt_id": 1,
    //     "tmplt_name": "Grain Supply Chain",
    //     "tmplt_company_name": "Universal Food Supply Sample Co",
    //     "tmplt_industry": "Agriculture",
    //     "tmplt_desc": "Two echelon grain supply chain network for players to learn the optimizations for grain purchases",
    //     "tmplt_objective": "Maximize Bank balance at end of game play"
    // }

    this.templateForm = this.fb.group({
      scmValue: ['', [Validators.required]],
      scEchelon: ['', [Validators.required]],
      skuDemandModel: ['', [Validators.required]],
      skuFinancialModel: ['', [Validators.required]],
      uploadOrderLeadTimes: ['', [Validators.required]],
      uploadGameRules: ['', [Validators.required]],

      skuDemandModelFile: ['', [Validators.required]],
      skuFinancialModelFile: ['', [Validators.required]],
      uploadOrderLeadTimesFile: ['', [Validators.required]],
      uploadGameRulesFile: ['', [Validators.required]],

      gameObjectives: ['', [Validators.required]],
    });
  }


  // getTemplateDetails() {
  //   this.cockpitService.getTemplateDetails().subscribe((response: any[]) => {
  //     console.log('getTemplateDetails', response);
  //     this.templates = response;
  //     this.template = response[0];
  //   });
  // }

  getTemplateDetails(){
    this.cockpitService.getTemplate().subscribe((response: any) => {
      this.template = response;
      console.log(response)
      this.totalTemplate=this.template.data.scmTmplt
      this.templateData=this.template.data.scmTmplt[0]
      this.templateData1=this.template.data.scmTmplt[1]
      this.templateData2=this.template.data.scmTmplt[2]
      console.log(this.templateData)
    });
  }



  onItemClick(num: number) {
    this.selectedItem = num;
  }

  onShow() {
    this.show = true;
  }

  goToSupplyChain() {
    this.router.navigate(['/app/master/supply-chain-network']);
  }

  onPublish() {
    if (!this.templateForm.valid) {
      Object.keys(this.templateForm.controls).forEach((field) => {
        // {1}
        const control = this.templateForm.get(field); // {2}
        control.markAsTouched({ onlySelf: true }); // {3}
      });
      this.toastr.error('All Fields required');
      return;
    }
  }

  onCancel() {
    this.handleClose();
    this.templateForm.reset();
    this.templateForm.markAsPristine();
    this.templateForm.markAsUntouched();
  }

  onSubmit() {
    console.log('VALS: ', this.templateForm.value);
  }

  onFileChanged(event, type, fileType) {
    const files = event.target.files;
    this.f[type].setValue(files[0]?.name);
    this.f[fileType].setValue(files[0]);
  }

  handleClose() {
    this.show = false;
  }
}
