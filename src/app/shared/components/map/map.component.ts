import * as L from 'leaflet';

import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
/*colors are
#ff8000 ornage
#4d39ff purple
#0081ea blue
*/
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map;
  @Input('latlong') latlong: number[] = [51.5, -0.09];
  @ViewChild('mapContainer') mapContainer: ElementRef;

  colors = {
    orange: '#ff8000',
    purple: '#4d39ff',
    blue: '#0081ea',
  };

  private initMap(latlong): void {
    this.map = L.map('map', {
      center: latlong,
      zoom: 13,
    });

    const FarmerIcon = L.Icon.extend({
      options: {
        // shadowUrl: '/assets/img/map/farmer1.png',
        iconSize: [38, 38],
        // shadowSize: [50, 64],
        // iconAnchor: [22, 94],
        // shadowAnchor: [4, 62],
        // popupAnchor: [-3, -76],
      },
    });

    const FactoryIcon = L.Icon.extend({
      options: {
        // shadowUrl: '/assets/img/map/factory1.png',
        iconSize: [38, 38],
        // shadowSize: [50, 64],
        // iconAnchor: [22, 94],
        // shadowAnchor: [4, 62],
        // popupAnchor: [-3, -76],
      },
    });

    const SilosIcon = L.Icon.extend({
      options: {
        // shadowUrl: '/assets/img/map/silos1.png',
        iconSize: [38, 38],
        // shadowSize: [50, 64],
        // iconAnchor: [22, 94],
        // shadowAnchor: [4, 62],
        // popupAnchor: [-3, -76],
      },
    });

    let farmerIcon = new FarmerIcon({ iconUrl: '/assets/img/map/farmer1.png' }),
      factoryIcon = new FactoryIcon({
        iconUrl: '/assets/img/map/factory1.png',
      }),
      silosIcon = new SilosIcon({ iconUrl: '/assets/img/map/silos1.png' });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    let marker1 = L.marker([51.5, -0.09], { icon: farmerIcon })
      .bindPopup('I am a Farmer.')
      .addTo(this.map);

    let marker2 = L.marker([51.49, -0.083], { icon: factoryIcon })
      .bindPopup('I am a Factory.')
      .addTo(this.map);

    let marker3 = L.marker([51.51, -0.01], { icon: factoryIcon })
      .bindPopup('I am a Factory.')
      .addTo(this.map);

    let marker4 = L.marker([51.49, -0.1], { icon: silosIcon })
      .bindPopup('I am a Silos.')
      .addTo(this.map);

    let marker5 = L.marker([51.497, -0.15], { icon: silosIcon })
      .bindPopup('I am a Silos.')
      .addTo(this.map);

    console.log('marker1.getLatLng()', marker1.getLatLng());
    // let latlngs = [
    //   marker1.getLatLng(),
    //   marker2.getLatLng(),
    //   marker3.getLatLng(),
    //   marker4.getLatLng(),
    //   marker5.getLatLng(),
    // ];

    let farmerSilosLatLng1 = [marker1.getLatLng(), marker4.getLatLng()];

    let farmerSilosLatLng2 = [marker1.getLatLng(), marker5.getLatLng()];

    let farmerFactoryLatLng1 = [marker1.getLatLng(), marker2.getLatLng()];

    let farmerFactoryLatLng2 = [marker1.getLatLng(), marker3.getLatLng()];

    let factorySilosLatLng1 = [marker1.getLatLng(), marker4.getLatLng()];

    let factorySilosLatLng2 = [marker1.getLatLng(), marker5.getLatLng()];

    // let polyline = L.polyline(latlngs, {color: '#03cba2', weight: '3', dashArray: '5, 5', dashOffset: '20'}).addTo(this.map);
    L.polyline(farmerSilosLatLng1, {
      color: this.colors.orange,
      weight: '3',
      dashArray: '5, 5',
      dashOffset: '20',
    }).addTo(this.map);

    L.polyline(farmerSilosLatLng2, {
      color: this.colors.orange,
      weight: '3',
      dashArray: '5, 5',
      dashOffset: '20',
    }).addTo(this.map);

    L.polyline(farmerFactoryLatLng1, {
      color: this.colors.blue,
      weight: '3',
      dashArray: '5, 5',
      dashOffset: '20',
    }).addTo(this.map);

    L.polyline(farmerFactoryLatLng2, {
      color: this.colors.blue,
      weight: '3',
      dashArray: '5, 5',
      dashOffset: '20',
    }).addTo(this.map);

    L.polyline(factorySilosLatLng1, {
      color: this.colors.purple,
      weight: '3',
      dashArray: '5, 5',
      dashOffset: '20',
    }).addTo(this.map);
    L.polyline(factorySilosLatLng2, {
      color: this.colors.purple,
      weight: '3',
      dashArray: '5, 5',
      dashOffset: '20',
    }).addTo(this.map);
    //dashed path is placed on top of the black-outlined white line
    let path = {
      color: '#000000',
      weight: 3,
      opacity: 1,
      dashArray: '5,10',
    };
    tiles.addTo(this.map);

    this.addControlPlaceholders(this.map);

    // Change the position of the Zoom Control to a newly created placeholder.
    this.map.zoomControl.setPosition('verticalcenterright');

    // You can also put other controls in the same placeholder.
    L.control
      .scale({
        position: 'verticalcenterright',
      })
      .addTo(this.map);

    // this.map.createPane('labels');
  }

  constructor() {}

  getLatLongsFromMarkers(coords) {}

  ngAfterViewInit(): void {
    this.subscribeResize();
    if (this.latlong) this.initMap(this.latlong);
  }

  addControlPlaceholders(map) {
    var corners = map._controlCorners,
      l = 'leaflet-',
      container = map._controlContainer;

    function createCorner(vSide, hSide) {
      var className = l + vSide + ' ' + l + hSide;

      corners[vSide + hSide] = L.DomUtil.create('div', className, container);
    }

    createCorner('verticalcenter', 'left');
    createCorner('verticalcenter', 'right');
  }

  subscribeResize() {
    const resizeObserver = new ResizeObserver(() => {
      this.map.invalidateSize();
    });

    resizeObserver.observe(this.mapContainer.nativeElement);
  }
}
