import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import ARea, { AReaConsequence, AReaTrigger } from "@classes/area.class";
import { DateTimeConfig, DiscordMessageConfig, GithubIssueConfig, GithubPullReqConfig, RSSConfig, TimeConfig, TwitchStreamConfig, TwitterTweetConfig, UnsplashPostConfig } from "@classes/model/ActionConfig";
import { DiscordPostMsgConfig, DropboxUploadConfig, GithubCreateIssueConfig, LinkedinPostConfig, NotionAddMessageConfig, TwitterPostTweetConfig, TwitterUpdatePictureConfig } from "@classes/model/ReactionConfig";
import { AuthService } from "@services/auth.service";
import { isObjectId } from "utils";
import { ServiceType } from "@classes/model/ServiceType";

@Component({
    selector: 'app-area-widget',
    templateUrl: './area-widget.component.html',
    styleUrls: ['./area-widget.component.scss']
})
export class AreaWidgetComponent implements OnInit {
    @Input() public area?: ARea;

    public displayableAreaAction?: {
        title: string;
        subtitle: string;
        svgPath: string;
    };
    public displayableAreaReaction?: {
        title: string;
        subtitle: string;
        svgPath: string;
    };

    constructor(private _authService: AuthService) {}

    ngOnInit(): void {
        if (!this.area || isObjectId(this.area.trigger.action) || isObjectId(this.area.consequence.reaction))
            throw "Invalid area";

        this.displayableAreaAction = {
            title: this.area.trigger.action.label,
            subtitle: this._getActionSubtitle(this.area.trigger),
            svgPath: this._getSvgPath(this.area.trigger.action.service)
        };
        this.displayableAreaReaction = {
            title: this.area.consequence.reaction.label,
            subtitle: this._getReactionSubtitle(this.area.consequence),
            svgPath: this._getSvgPath(this.area.consequence.reaction.service)
        };
    }

    private _getActionSubtitle(trigger: AReaTrigger): string {
        if (isObjectId(trigger.action))
            throw "Invalid area action";

        switch (trigger.action.type) {
        case 'DATETIME':
            return moment((trigger.inputs as DateTimeConfig).time).format('LLL');
        case 'CRON':
            return (trigger.inputs as TimeConfig).time;
        case 'DISCORD_MSG':
            return (trigger.inputs as DiscordMessageConfig).channelId;
        case 'GITHUB_ISSUE':
            return (trigger.inputs as GithubIssueConfig).owner + "/" + (trigger.inputs as GithubIssueConfig).repository;
        case 'GITHUB_PULL_REQ':
            return (trigger.inputs as GithubPullReqConfig).owner + "/" + (trigger.inputs as GithubPullReqConfig).repository;
        case 'RSS_ENTRY':
            return (trigger.inputs as RSSConfig).url;
        case 'TWITCH_STREAM':
            return (trigger.inputs as TwitchStreamConfig).username;
        case 'TWITTER_MSG':
            return (trigger.inputs as TwitterTweetConfig).username;
        case 'UNSPLASH_POST':
            return (trigger.inputs as UnsplashPostConfig).username;
        case 'UNSPLASH_RANDOM_POST':
            return (trigger.inputs as UnsplashPostConfig).username;

        default: {
            console.error("Unknow action type:", trigger.action.type);
            return "";
        }
        }
    }

    private _getReactionSubtitle(consequence: AReaConsequence): string {
        if (isObjectId(consequence.reaction))
            throw "Invalid area reaction";

        switch (consequence.reaction.type) {
        case 'TWITTER_MSG':
            return (consequence.inputs as TwitterPostTweetConfig).message;
        case 'TWITTER_BANNER':
            return (consequence.inputs as TwitterUpdatePictureConfig).nothing;
        case 'TWITTER_PP':
            return (consequence.inputs as TwitterUpdatePictureConfig).nothing;
        case 'LINKEDIN_MSG':
            return (consequence.inputs as LinkedinPostConfig).message;
        case 'DISCORD_MSG':
            return (consequence.inputs as DiscordPostMsgConfig).message;
        case 'GITHUB_ISSUE':
            return (consequence.inputs as GithubCreateIssueConfig).owner + "/" + (consequence.inputs as GithubCreateIssueConfig).repository;
        case 'NOTION_MSG':
            return (consequence.inputs as NotionAddMessageConfig).urlPage;
        case 'DROPBOX_UPLOAD':
            return (consequence.inputs as DropboxUploadConfig).remoteFilepath || "Undefined";

        default: {
            console.error("Unknow reaction type:", consequence.reaction.type);
            return "";
        }
        }
    }

    private _getSvgPath(type: ServiceType): string {
        return this._authService.apps.find((app) => app.name === type)?.redirect || '';
    }
}