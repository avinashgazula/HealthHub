import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from './../../services/location/location.service';

@Component({
  selector: 'healthhub-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  detailsForm: FormGroup;

  constructor(private fb: FormBuilder, private locationService: LocationService) { }

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      specialization: ['', [Validators.required]],
      location: ['', [Validators.required]],
      fee: ['', Validators.required, Validators.min(0), Validators.max(100000)],
      description: ['']
    });
  }

  getFeeError = () => {
    if (this.fee.hasError('required')) {
      return 'Consultation fee is required';
    }
    return 'Enter a valid fee in $';
  };

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        const longitude = position.coords.longitude.toString();
        const latitude = position.coords.latitude.toString();
        console.log(`Location: ${latitude}, ${longitude}`);

        this.locationService.getAddress(latitude, longitude).subscribe(data => {
          console.log(data.results[1].formatted_address);
          let address = data.results[1].formatted_address;
          this.detailsForm.setValue({ location: address })

        })
      });
    } else {
      console.log("No support for geolocation")
    }
  }

  save = () => {

  }


  public get specialization() {
    return this.detailsForm.get('specialization')
  }

  public get location() {
    return this.detailsForm.get('location')
  }

  public get fee() {
    return this.detailsForm.get('fee')
  }

  public get description() {
    return this.detailsForm.get('description')
  }

}
