import { Component, Input } from '@angular/core';
import Action from "@classes/action.class";

import ARea from "@classes/area.class";
import Reaction from "@classes/reaction.class";

@Component({
    selector: 'app-area-widget',
    templateUrl: './area-widget.component.html',
    styleUrls: ['./area-widget.component.scss']
})
export class AreaWidgetComponent {
    @Input() public area?: ARea;

    public get actionLabel(): string {
        if (!(this.area?.action as Action)?._id)
            throw "Invalid area action class";
        return (this.area?.action as Action).label;
    }
    public get reactionLabel(): string {
        if (!(this.area?.reaction as Reaction)?._id)
            throw "Invalid area reaction class";
        return (this.area?.reaction as Reaction).label;
    }
}