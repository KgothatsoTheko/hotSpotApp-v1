import { Component, ChangeDetectorRef } from '@angular/core';
import { MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {

  constructor(private cdr: ChangeDetectorRef) {
    this.getMyCurrentLocation();
  }

  markerOptions2: google.maps.MarkerOptions = { draggable: false };

  markerOptions: google.maps.MarkerOptions = { 
    draggable: false,
    icon: {
      url: '../../../assets/human-icon.png', // Path to your custom image
      scaledSize: new google.maps.Size(50, 50), // Scale the image to desired size
    }
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerPositions2: google.maps.LatLngLiteral[] = [];

  center!: google.maps.LatLngLiteral ; // Center is initially null
  zoom = 15;
  display!: google.maps.LatLngLiteral;

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPositions2.push(event.latLng.toJSON());
    }
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.display = event.latLng.toJSON();
    }
  }

  getMyCurrentLocation(): void {
    navigator.geolocation.getCurrentPosition(location => {
      this.center = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      };
      this.markerPositions.push(this.center); // Add marker at current location
      // Trigger change detection to ensure the map is updated
      this.cdr.detectChanges();
    });
  }
}
