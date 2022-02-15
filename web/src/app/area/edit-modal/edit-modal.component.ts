import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import ARea from "@classes/area.class";
import Action from "@classes/action.class";
import Reaction from "@classes/reaction.class";
import { ActionConfig } from "@classes/model/ActionConfig";
import { ReactionConfig } from "@classes/model/ReactionConfig";
import { ServiceType } from "@classes/model/ServiceType";
import { Parameter, ParameterType } from "@classes/model/Parameters";
import { ObjectId } from "@classes/model.class";
import { AreaService } from "@services/area.service";
import { ServiceService } from "@services/service.service";
import { AuthService, ServiceData } from "@services/auth.service";

@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit-modal.component.html',
    styleUrls: ['./edit-modal.component.scss']
})
export class AReaEditModalComponent {
    public form: FormGroup = new FormGroup({
        actionService: new FormControl((this.area?.trigger.action as Action | undefined)?.service, Validators.required),
        reactionService: new FormControl((this.area?.consequence.reaction as Reaction | undefined)?.service, Validators.required)
    });
    public actions: Array<Action> = [];
    public reactions: Array<Reaction> = [];
    public actionServices: Array<ServiceData> = [];
    public reactionServices: Array<ServiceData> = [];
    public eParamType = ParameterType;
    public dateNow = Date.now;

    constructor(
        private _matDialogRef: MatDialogRef<AReaEditModalComponent, ARea | undefined>,
        @Inject(MAT_DIALOG_DATA) public area: ARea | undefined,
        private _authService: AuthService,
        private _areaService: AreaService,
        private _serviceService: ServiceService
    ) {
        this._serviceService.getAction().then((result) => {
            this.actions = result;
            this.actionServices = this._getActionServices();

            const actionServiceForm = this.form.get('actionService');

            if (actionServiceForm?.value)
                this._onActionServiceUpdate(actionServiceForm.value);
            actionServiceForm?.valueChanges.subscribe((value: ServiceType) => this._onActionServiceUpdate(value));
        });
        this._serviceService.getReaction().then((result) => {
            this.reactions = result;
            this.reactionServices = this._getReactionServices();

            const reactionServiceForm = this.form.get('reactionService');

            if (reactionServiceForm?.value)
                this._onReactionServiceUpdate(reactionServiceForm.value);
            reactionServiceForm?.valueChanges.subscribe((value: ServiceType) => this._onReactionServiceUpdate(value));
        });
    }

    public get isEdit(): boolean {
        return !!this.area;
    }

    // Get form values
    public get action(): Action {
        const value: Action | undefined = this.form.get(this.form.get('actionService')?.value + '-action')?.value;

        if (!value)
            throw "Action form not found";
        return value;
    }
    public get actionForm(): FormControl {
        const form = this.form.get(this.form.get('actionService')?.value + '-action');

        if (!form)
            throw "Undefined action form";
        return form as FormControl;
    }

    public get reaction(): Reaction {
        const value: Reaction | undefined = this.form.get(this.form.get('reactionService')?.value + '-reaction')?.value;

        if (!value)
            throw "Reaction form not found";
        return value;
    }
    public get reactionForm(): FormControl {
        const form = this.form.get(this.form.get('reactionService')?.value + '-reaction');

        if (!form)
            throw "Undefined reaction form";
        return form as FormControl;
    }

    // Get service actions
    public get serviceActions(): Array<Action> {
        return this.actions.filter((action) => action.service === (this.form.get('actionService')?.value as ServiceType));
    }
    // Get service reactions
    public get serviceReactions(): Array<Reaction> {
        return this.reactions.filter((reaction) => reaction.service === (this.form.get('reactionService')?.value as ServiceType));
    }

    // Get action parameters
    public get actionParameters(): Array<Parameter> {
        const actionForm = this.form.get(this.form.get('actionService')?.value + '-action');

        if (!actionForm || actionForm.invalid || !actionForm.value)
            return [];
        return (actionForm.value as Action).parameters;
    }
    // Get reaction parameters
    public get reactionParameters(): Array<Parameter> {
        const reactionForm = this.form.get(this.form.get('reactionService')?.value + '-reaction');

        if (!reactionForm || reactionForm.invalid || !reactionForm.value)
            return [];
        return (reactionForm.value as Reaction).parameters;
    }

    // Services getters
    private _getActionServices(): Array<ServiceData> {
        return this.actions.map((action) => {
            if (action.service === ServiceType.RSS)
                return {
                    iconSvgPath: 'assets/icons/rss.svg',
                    label: action.label,
                    name: action.service,
                    redirect: ''
                } as ServiceData;
            if (action.service === ServiceType.CRON)
                return {
                    iconSvgPath: 'assets/icons/calendar.svg',
                    label: action.label,
                    name: action.service,
                    redirect: ''
                } as ServiceData;

            const app = this._authService.apps.find((app) =>
                app.name === action.service
            );

            if (!app)
                throw `Service ${action.service.toString()} app not found`;
            app.label = action.label;
            return app;
        });
    }
    private _getReactionServices(): Array<ServiceData> {
        return this.reactions.map((reaction) => {
            if (reaction.service === ServiceType.RSS)
                return {
                    iconSvgPath: 'assets/icons/rss.svg',
                    label: reaction.label,
                    name: reaction.service,
                    redirect: ''
                } as ServiceData;
            if (reaction.service === ServiceType.CRON)
                return {
                    iconSvgPath: 'assets/icons/calendar.svg',
                    label: reaction.label,
                    name: reaction.service,
                    redirect: ''
                } as ServiceData;

            const app = this._authService.apps.find((app) =>
                app.name === reaction.service
            );

            if (!app)
                throw `Service ${reaction.service.toString()} app not found`;
            app.label = reaction.label;
            return app;
        });
    }

    // Action updates
    private _onActionServiceUpdate(service: ServiceType): void {
        const formControl = new FormControl(this.area?.trigger.action || (this.serviceActions.length === 1 ? this.serviceActions[0] : undefined));
        this.form.setControl(service + '-action', formControl);

        if (formControl.value)
            this._onActionUpdate(formControl.value);
        formControl.valueChanges.subscribe((value: Action) => this._onActionUpdate(value));
    }

    private _onActionUpdate(action: Action): void {
        action.parameters.forEach((param) =>
            this.form.setControl(action.service + '-' + action.type + '-actionParam-' + param.name, new FormControl(this.area ? (this.area.trigger.inputs as { [key: string]: any })[param.name] : undefined))
        );
    }

    // Reaction updates
    private _onReactionServiceUpdate(service: ServiceType): void {
        const formControl = new FormControl(this.area?.consequence.reaction);
        this.form.setControl(service + '-reaction ', formControl);

        if (formControl.value)
            this._onReactionUpdate(formControl.value);
        formControl.valueChanges.subscribe((value: Reaction) => this._onReactionUpdate(value));
    }

    private _onReactionUpdate(reaction: Reaction): void {
        reaction.parameters.forEach((param) =>
            this.form.setControl(reaction.service + '-' + reaction.type + '-reactionParam-' + param.name, new FormControl(this.area ? (this.area?.consequence.inputs as { [key: string]: any })[param.name] : undefined))
        );
    }

    public async submit(): Promise<void> {
        const area: ARea = Object.assign<ARea | undefined, ARea>(this.area, {
            trigger: {
                action: this.action._id as ObjectId,
                inputs: this._getTriggerInputs()
            },
            consequence: {
                reaction: this.reaction._id as ObjectId,
                inputs: this._getConsequenceInputs()
            }
        });

        const result: ARea = await (!this.isEdit ? this._areaService.add(area) : this._areaService.edit(area));

        this._matDialogRef.close(result);
    }

    private _getTriggerInputs(): ActionConfig {
        const action: Action = this.action;
        const result: ActionConfig | { [key: string]: unknown } = {};

        action.parameters.forEach((param) => {
            result[param.name] = this.form.get(action.service + '-' + action.type + '-actionParam-' + param.name)?.value;

            if (param.type === ParameterType.DATETIME)
                result[param.name] = (result[param.name] as Date).getTime();
        });
        return result as unknown as ActionConfig;
    }

    private _getConsequenceInputs(): ReactionConfig {
        const reaction: Reaction = this.reaction;
        const result: ReactionConfig | { [key: string]: unknown } = {};

        reaction.parameters.forEach((param) => {
            result[param.name] = this.form.get(reaction.service + '-' + reaction.type + '-reactionParam-' + param.name)?.value;

            if (param.type === ParameterType.DATETIME)
                result[param.name] = (result[param.name] as Date).getTime();
        });
        return result as unknown as ReactionConfig;
    }
}