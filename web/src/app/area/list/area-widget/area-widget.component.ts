import { Component, Input } from '@angular/core';
import ARea from "@classes/area.class";

@Component({
    selector: 'app-area-widget',
    templateUrl: './area-widget.component.html',
    styleUrls: ['./area-widget.component.scss']
})
export class AreaWidgetComponent {
    @Input() public area?: ARea;
}