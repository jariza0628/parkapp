import { Component, Input  } from '@angular/core';

/**
 * Generated class for the CarspaceComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'carspace',
  templateUrl: 'carspace.html'
})
export class CarspaceComponent {
  @Input() puesto: string;
  @Input() hora: string;
  text: string;

  constructor() {
    console.log('Hello CarspaceComponent Component');
    this.text = 'Hello World';
  }

}
