import { Component, ElementRef, Input, ViewChild, OnInit, AfterViewInit, EventEmitter, Output } from '@angular/core'
import { Map, Marker, NavigationControl } from 'maplibre-gl'
import { CommonModule } from '@angular/common'
import { DialogModule } from 'primeng/dialog'

@Component({
  imports: [CommonModule, DialogModule],
  selector: 'app-map-view',
  standalone: true,
  template: `
  <p-dialog header="Mapa" [(visible)]="display" [modal]="true" [style]="{ width: '60vw' }" [draggable]="false" [resizable]="false" (onHide)="cerrarMapa()">
    <div class="text-center h-1rem">
      <p><i>{{ this.address }}</i></p>
    </div>
    <br>
    <div class="map-frame">
      <div *ngIf="isLoading" class="loader">Loading...</div>
      <div class="map" #map></div>
    </div>
  </p-dialog>
`,
styles: [
  '.map-container { top: 0; left: 0; right: 0; bottom: 0; margin: 10px;}',
  '.map-frame { border: 2px solid black; height: 100%; position: relative;}',
  '.map { position: relative !important; width: 100%; height: 500px;}',
  '.loader { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5rem; }',
  ':host ::ng-deep { .geoapify-autocomplete-input { border: 1px solid #ced4da; border-radius: 6px; } .geoapify-autocomplete-input:hover { border-color: #3B82F6; } }'
]
})

export class MapaViewComponent implements OnInit, AfterViewInit {
  @Input() latitud!: number;
  @Input() longitud!: number;
  @Input() address!: string;

  @Output() res: EventEmitter<boolean> = new EventEmitter();

  map: any;
  onlyMarker: any;
  display = true;
  isLoading = true;

  @ViewChild('map', { static: true })
  private readonly mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const center: [number, number] = [this.longitud, this.latitud];

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: 'https://maptiler.tdconsulting.es/styles/basic-preview/style.json',
      center,
      zoom: 17
    });

    // Añadir control de navegación
    this.map.addControl(new NavigationControl(), 'top-right');

    // Esperar a que el mapa se cargue completamente
    this.map.on('load', () => {
      this.isLoading = false; // Ocultar loader cuando el mapa esté cargado

      // Añadir marcador
      this.onlyMarker = new Marker({ color: '#FF0000' })
        .setLngLat([this.longitud, this.latitud])
        .addTo(this.map);
    });
  }

  cerrarMapa(): void {
    this.res.emit(false);
  }
}