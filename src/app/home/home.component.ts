import {
  AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, HostListener, Inject,
  OnInit
} from '@angular/core';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {FormDataModel} from './home.model';
import {HomeService} from './home.service';
import {ToastrService} from 'ngx-toastr';
import {HouseRoofType} from '../house-roof-type/house-roof-type.model';
import {Constants} from '../app.constant';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {generateTypeCheckBlock} from '@angular/compiler-cli/src/ngtsc/typecheck/src/type_check_block';
import {DialogContactComponent} from '../dialog-contact/dialog-contact.component';
import {HousePriorityService} from '../house-priority/house-priority.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../auth/auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs/internal/operators';
import {ResultDataService, ResultService} from "../result/result.service";
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [FormDataModel]
})
export class HomeComponent implements OnInit, AfterContentChecked {
  data;
  yearly;
  searchLocation;
  iframeSourceUrl;
  url = 'https://ecoserve-dot-solex-mvp-2.appspot.com/calc/get-results'
  show = false;
  public model = new FormDataModel();
  email = {
    email: this.appConstants.email,
    address: this.searchLocation
  };

  area;
yearlyElectricAfterChange;
  showLoader = false;
  loaderValue = 0;


  waterHeaters = {
    WP: this.translate.instant('Hot-water.Heat-pump'),
    OL: this.translate.instant('Hot-water.oil-gas'),
    EL: this.translate.instant('Hot-water.Electric-boiler')
  };

  houseHeaters = {
    WP: this.translate.instant('heater.Heat-pump'),
    OL: this.translate.instant('heater.oil-gas'),
    EL: this.translate.instant('heater.Electric-boiler')
  };

  isCollapsed = false;
  formSteps = [];
  bsModalRef: BsModalRef;
  activeStep = 0;
  accessToken;
  counter;
  customerInfo;
  oldHeater;
  newHeater;

  constructor(private titleService: Title,
              private resultDataService: ResultDataService,
              private  resultService: ResultService,
              private sanitizer: DomSanitizer,
              private homeService: HomeService,
              private priorityService: HousePriorityService,
              private  toastr: ToastrService,
              private appConstants: Constants,
              private route: ActivatedRoute,
              private modalService: BsModalService,
              private translate: TranslateService,
              private router: Router,
              private http: HttpClient,
              private loader: NgxSpinnerService,
              private authService: AuthService,
              private cdr: ChangeDetectorRef) {
    this.titleService.setTitle('Home page title');
    this.model = this.model || new FormDataModel();
    // this.appConstants.lang = this.route.snapshot.queryParamMap.get('lang');
    // this.homeService.setLanguage(this.appConstants.lang);
    // this.appConstants.setToken(this.route.snapshot.queryParamMap.get('token'));
    this.appConstants.accessToken.subscribe(value => {
      this.accessToken = value as string;
    });
    this.appConstants.searchLocation.subscribe(value => {
      this.searchLocation = value as string;
      console.log(this.searchLocation, 'place');
    });

    // Sample data


    this.formSteps.push({
      label: this.translate.instant('Roof-area.label'),
      key: 'house-roof-area',
      content: 'Mark the entire roof area of ​​your house.'
    });
    this.formSteps.push({
      label: this.translate.instant('House-type.label1'),
      key: 'house-roof-type',
      content: 'Choose your house type.'
    });
    this.formSteps.push({
      label: this.translate.instant('Roof-pitch.label1'),
      key: 'house-pitch',
      content: 'Choose your roof pitch or enter it manually.'
    });
    this.formSteps.push({
      label: this.translate.instant('alignment.label'),
      key: 'house-alignment',
      content: 'Choose your roof pitch or enter it manually.'
    });
    this.formSteps.push({
      label: this.translate.instant('priority.Priority'),
      key: 'house-priority',
      content: 'Select your motivation to use solar by priority.'
    });
    this.formSteps.push({
      label: this.translate.instant('Hot-water.label1'),
      key: 'house-hot-water',
      content: 'Choose your roof pitch or enter it manually.'
    });
    this.formSteps.push({
      label: this.translate.instant('heater.label'),
      key: 'house-heater',
      content: 'Choose your roof pitch or enter it manually.'
    });
    this.formSteps.push({
      label: this.translate.instant('Consumption.label'),
      key: 'house-consumption',
      content: 'Choose your roof pitch or enter it manually.'
    });


    // this.formSteps.push({
    //   label: this.translate.instant('Supplier.label'),
    //   key: 'house-energy',
    //   content: 'Who is your energy supplier'
    // });

    for (const step of this.formSteps) {
      step.isOpen = false;
      step.isVisible = false;
      step.isEnabled = false;
      step.isEditable = true;
    }

    this.formSteps[0].isOpen = true;
    this.formSteps[0].isVisible = true;
    this.formSteps[0].isEnabled = true;
  }


  ngOnInit(): void {
    // this.login();
    this.makeNewLead();
    this.convertLanguage();
    document.body.style.background = '#ffffff';
  }
  ngAfterContentChecked() {
    this.cdr.detectChanges();
    // this.uploadExtraInput()
  }
  convertLanguage() {
    this.translate.setDefaultLang('en');
    if (this.homeService.getLanguage() && this.homeService.getLanguage() !== '') {
      this.translate.use(this.homeService.getLanguage());
    } else {
      this.translate.use('en');
      this.homeService.setLanguage('en');
    }
  }


  // login() {
  //   this.homeService.login('abhinandan.gupta@symbtechnologies.com', 'password').subscribe(response => {
  //       console.log(response);
  //       this.appConstants.setToken(response.access_token);
  //       this.makeNewLead();
  //     },
  //     response => {
  //       if (response && response.error && response.error.error) {
  //         this.toastr.error(response.error.error, 'Opps!');
  //       } else {
  //         this.toastr.error('Unable to complete your request, please try after sometime.', 'Opps!');
  //       }
  //     });
  // }


  // Genrate New Lead Id
  makeNewLead() {
    this.homeService.makeNewLead({
      email: this.appConstants.email,
      address: this.searchLocation
    }).subscribe(res => {
      const response = res as any;
      this.data = response;
      this.model.leadId = this.data.lead_id;
      this.appConstants.setLeadId(this.model.leadId);
      // let urlForIframe = 'https://solcalcmap-dot-solex-mvp-2.oa.r.appspot.com/';
      let urlForIframe = 'https://solcalcmap-dot-solex-mvp-2.appspot.com/';
      urlForIframe += '?user_email=' + this.appConstants.email;
      urlForIframe += '&project_id=' + this.model.leadId;
      urlForIframe += '&token=' + this.accessToken;
      urlForIframe += '&screen=design';
      this.iframeSourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urlForIframe);
    }, error => {
      this.show = false;
      this.toastr.warning('LeadID not present');
    });
  }


  // Upload the roof area
  updateroofArea() {
    this.homeService.updateroofArea({
      email: this.appConstants.email,
      lead_id: this.model.leadId,
      rooftype: this.model.roofType.key,
      tilt: this.model.roofPitch,
      azimuth: this.model.alignment,
      numsurfaces: this.model.roofSurfaceNumber ? 2 : 1
    }).subscribe(res => {
      const response = res as any;
      this.data = response;
      console.log(this.data, 'roofArea');
    }, error => {
      this.toastr.warning('Roof Area not updated Please try again', 'Oops');
    });
  }


  // upload priority list api
  updatePriority(list) {
    this.homeService.updatePriority({
      email: this.appConstants.email,
      lead_id: this.model.leadId,
      prioritylist: list
    }).subscribe(res => {
      const response = res as any;
      this.data = response;
    }, error => {
      if (error && error && error.message) {
        this.toastr.error(error.message);
      }
    });
  }


  // upload extra input such as numof people and heater water when numof people change
  uploadExtraInput1(event) {
    this.model.consumption = event.value;
    console.log(this.model.consumption, 'numpoeple')
    this.oldHeater = this.model.heaterType;
    this.homeService.uploadExtraInput({
      email: this.appConstants.email,
      lead_id: this.model.leadId,
      info: {
        NumPeople: this.model.consumption.numPeople,
        Heating: this.model.heaterType,
        Water: this.model.hotWaterType,
        Type: 'Residential',
      }
    }).subscribe(res => {
      const response = res as any;
      this.model.consumption.YearlyElecRequired = response.energy;
      this.yearlyElectricAfterChange = response.energy;
      this.uploadYearlyElectric();
    }, error => {
      this.toastr.warning('Something went Wrong Please try again', 'Oops');
    });
  }


  // upload extra input
  uploadExtraInput() {
    this.homeService.uploadExtraInput({
      email: this.appConstants.email,
      lead_id: this.model.leadId,
      info: {
        NumPeople: this.model.consumption?.numPeople,
        Heating: this.model.heaterType,
        Water: this.model.hotWaterType,
        Type: 'Residential',
      }
    }).subscribe(res => {
      const response = res as any ;
      this.model.consumption.YearlyElecRequired = response.energy;
      this.yearlyElectricAfterChange = response.energy;
      // this.uploadYearlyElectric();
      // this.activeStep = this.activeStep + 1;
      // this.formSteps[this.activeStep].isVisible = true;
      // this.model.consumption.numPeople = 1;
    },);
  }


  // upload electric energy yearly required get by after extra input api
  uploadYearlyElectric() {
    this.homeService.uploadYearlyElectric({
      email: this.appConstants.email,
      lead_id: this.model.leadId,
      action: 'upload',
      energy: this.model.consumption.YearlyElecRequired,
    }).subscribe(res => {
      const response = res as any;
      this.data = response;
      this.yearly = this.data.YearlyElecRequired;
      // this.uploadElectricId();
      if (this.yearly === undefined || this.yearly === '') {
        this.toastr.warning('There is no Suppliers in your Location Sorry!', 'Oops');
      }
    }, error => {
      this.toastr.warning('Yearly Electric not updated Please try again', 'Oops');
    });
  }

  // upload electric when change manually
  uploadYearlyElectricAfterChange() {
    this.homeService.uploadYearlyElectric({
      email: this.appConstants.email,
      lead_id: this.model.leadId,
      action: 'upload',
      energy: this.model.consumption.YearlyElecRequired,
    }).subscribe(res => {
      const response = res as any;
      this.data = response;
      this.yearly = this.data.YearlyElecRequired;
    }, error => {
      this.toastr.warning('Yearly Electric not updated Please try again', 'Oops');
    });
  }

// upload the electric id from dropdown list
  uploadElectricId() {
    this.homeService.uploadElectricId({
      email: this.appConstants.email,
      lead_id: this.model.leadId,
      action: 'upload',
      elecID: this.model.electric,
    }).subscribe(res => {
      const response = res as any;
      this.data = response;
      this.getResult();
      console.log(this.data, 'yearly');
    }, error => {
      this.toastr.warning('Supplier not updated  Please try again', 'Oops');
    });
  }


  // upload the roof area from map or manually
  uploadMannualArea() {
    this.homeService.uploadMannulaArea({
      email: this.appConstants.email,
      lead_id: this.model.leadId,
      manual_area: this.model.roofArea
    }).subscribe(res => {
      const response = res as any;
      this.data = response;
    });
  }


  // check the area draw in map or not
  checkArea(index, event) {
    this.homeService.checkAreaLoaction({
      email: this.appConstants.email,
      lead_id: this.model.leadId,
      check: 'area'
    }).subscribe(res => {
        const response = res as any;
        this.area = Math.round(response.AreafromMap);
        this.onSubmit(index, event)
        this.toastr.success('Roof area uploaded successfully');

      }, error => {
        this.toastr.warning('Please first draw the area on the map', 'Oops');
      }
    );
  }

  onSubmit(index, event) {
    console.log('Submitted ->' + index, event);
    const step = this.formSteps[index];

    if (this.formSteps[index + 1]) {
      this.formSteps[index + 1].isVisible = true;
    }
    if (step.key === 'house-roof-area') {
      this.model.roofArea = event.roofArea;
      if (!this.model.roofArea) {
        this.model.roofArea = this.area;
      } else if (this.model.roofArea !== this.area) {
        this.uploadMannualArea();
      }
    } else if (step.key === 'house-roof-type') {
      this.model.roofType = event.value;
      this.model.roofSurfaceNumber = event.twoSideOccupy;
      this.model.alignment = 0;
      if (event.value.key && event.value.key === 'flat') {
        this.model.roofPitch = 0;
        this.model.alignment = 0;
        this.formSteps[index + 1].isEditable = false;
        this.formSteps[index + 2].isEditable = false;
        this.updateroofArea();
        this.jumpToStep(index, index + 3);
        return;
      } else {
        this.model.roofPitch = null as number;
        this.model.alignment = null as number;
        this.formSteps[index + 1].isEditable = true;
        this.formSteps[index + 2].isEditable = true;
      }
    } else if (step.key === 'house-pitch') {
      this.model.roofPitch = event.value;
    } else if (step.key === 'house-alignment') {
      this.model.alignment = event.alignment;
      console.log(this.translate.instant('Alignment.label'),'label')
      this.updateroofArea();
    } else if (step.key === 'house-priority') {
      this.updatePriority(event.list);
    } else if (step.key === 'house-hot-water') {
      this.model.hotWaterType = event.value;
    } else if (step.key === 'house-heater') {
      this.model.heaterType = event.value;
      this.uploadExtraInput()
    } else if (step.key === 'house-consumption') {
      this.model.consumption = event.value;
      this.model.electric = event.electricId;
      if (this.yearlyElectricAfterChange !== this.model.consumption.YearlyElecRequired) {
        this.uploadYearlyElectricAfterChange();
      }
      this.uploadElectricId();
      this.updateContactInformations();
    }
    // else if (step.key === 'house-energy') {
    //   this.model.electric = event.value;
    //   console.log(this.model.electric, 'ele')
    //   this.uploadElectricId()
    // }
    if (this.activeStep >= this.formSteps.length - 1) {
      // alert('Done all');
      // document.getElementById('contact').style.display = 'inline-block';
    } else {
      this.activeStep = index + 1;
    }

  }

  showContact() {
    return this.activeStep >= this.formSteps.length - 1;
  }

  skip1(event) {
    this.model.consumption = event.value;
    // this.uploadExtraInput();
    // this.activeStep = this.activeStep + 1;
    // this.formSteps[this.activeStep].isVisible = true;
  }

  showStep(index) {
    console.log('Trying to open: ' + index);
    this.activeStep = index;
  }


  updateContactInformations() {
    this.startTimer();
    const initialState = {
      title: 'Conatct',
      confirmed: false,
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(DialogContactComponent, {initialState});

    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose = (myData) => {
      myData.data.customercontact.lead_id = this.model.leadId;
      this.homeService.updateContactInformations(myData.data).subscribe(reply => {
        const response = reply as any;
        this.bsModalRef.hide();
        this.toastr.success('Quotation upload successfully');
        // this.router.navigate(['result', 'independence']);

      }, error => {
       this.toastr.warning('Contact Information not updated Please try again', 'Oops');
      });
    };
  }

  jumpToStep(fromStep: number, toStep: number) {
    for (let index = fromStep + 1; index <= toStep; index++) {
      this.formSteps[index].isVisible = true;
    }
    this.activeStep = toStep;
  }

  startTimer() {

    this.showLoader = true;
    // this.getResult();
    // this.getData()
    //
    // setInterval(() => {
    //   this.loaderValue++;
    //   if (this.loaderValue === 100) {
    //     clearInterval(this.loaderValue);
    //   }
    // },);
    // const int = setInterval( () => {
    //   this.loaderValue += 1;
    //   if ( this.loaderValue >= 100 ){
    //     clearInterval( int );
    //   } else {
    //     this.loaderValue == ''
    //   }
    // }, 200);

    // setTimeout(() => {
    //     this.router.navigate(['result', 'independence']);
    //   }, 30000);
    // }


  }
  getResult() {
    this.loader.hide();
    this.resultService.getResult().subscribe(res => {
      this.data = res as any;
      this.router.navigate(['result']);
      if (this.data.status) {
      }
      this.resultDataService.setResult(this.data);
    },error => {
      this.toastr.warning('Something went wrong try again', 'Oops');
    });
  }
}
