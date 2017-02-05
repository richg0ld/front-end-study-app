import {Component} from '@angular/core';

@Component({
  selector: 'material-test',
  template:`
    <div>
      <md-toolbar>
        <span>
          <md-icon class="icon-20">pets</md-icon>
          {{testTitle}}
        </span>
        <button md-icon-button (click)="testing(this)">
          <md-icon>more_vert</md-icon>
        </button>
      </md-toolbar>
    </div>
  `,
  styles: [``]
})
export class MaterialTestComponent {
  testTitle = '머터리얼 테스트';
  testing(value): void{
    console.log(this);
  }
}
