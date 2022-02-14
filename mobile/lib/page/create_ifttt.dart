import 'package:flutter/material.dart';
import 'package:mobile/api/areaService.dart';
import 'package:mobile/api/model/area/Action.dart' as area;
import 'package:mobile/api/model/area/Area.dart';
import 'package:mobile/api/model/area/Parameter.dart';
import 'package:mobile/api/model/area/ParameterType.dart';
import 'package:mobile/api/model/area/Reaction.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/service/IService.dart';
import 'package:mobile/service/discord.dart';
import 'package:mobile/service/dropbox.dart';
import 'package:mobile/service/github.dart';
import 'package:mobile/service/linkedin.dart';
import 'package:mobile/service/notion.dart';
import 'package:mobile/service/rss.dart';
import 'package:mobile/service/date.dart' as areaDate;
import 'package:mobile/service/twitch.dart';
import 'package:mobile/service/twitter.dart';
import 'package:mobile/service/undefined.dart';
import 'package:mobile/service/unsplash.dart';
import 'package:mobile/tools/ActionReactionTools.dart';
import 'package:mobile/widget/DynamicList.dart';
import 'package:mobile/widget/paramsListBuilder.dart';

void buildRedirection(String action, String reaction, BuildContext context) {
  String route = '/Create\${$action|$reaction}';
  Navigator.of(context).pushNamed(route);
}

List<String> getBuildList(List<IService> serviceList, String Function(IService it) callback) {
  List<String> val = [];

  for (var it in serviceList) {
    val.add(callback(it));
  }
  val.add('None');
  return val;
}

void callbackClose(BuildContext context) {
  Navigator.of(context).pop();
}

void callbackSaveIfttt(BuildContext context, areaService api, area.Action action, Reaction reaction, String token) {
  api.createIfttt(Area("", token, action, reaction)).then((value) => {
    if (value) {
      Navigator.of(context).pushNamed('/List')
    }
  });
}

class create_ifttt extends StatelessWidget {
  late areaService api;
  List<IService> serviceList = [
    github(false),
    twitch(false),
    twitter(false),
    discord(false),
    linkedin(false),
    notion(false),
    unsplash(false),
    dropbox(false),
    rss(false),
    areaDate.date(false),
    undefined(false),
  ];

  create_ifttt(this.api, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    DynamicList action = DynamicList(serviceList, true, "Service", "Action");
    DynamicList reaction = DynamicList(serviceList, false, "Service", "Reaction");
    paramsListBuilder actionParameter = paramsListBuilder(api.listService, action.controllerFirst.text, action.controllerSecond.text, true);
    paramsListBuilder reactionParameter = paramsListBuilder(api.listService, reaction.controllerFirst.text, reaction.controllerSecond.text, false);

    return Scaffold(
        body: Center(
        child: Container(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              buildTopPage(context),
              Container(
                padding: const EdgeInsets.only(
                  left: 100.0,
                  right: 100.0,
                ),
                child: Column(
                  children: <Widget>[
                    action.widget,
                    actionParameter.build(context),
                    const Padding(padding: EdgeInsets.only(
                        top: 20.0,
                        bottom: 20.0
                    )),
                    const Icon(
                      Icons.arrow_downward_rounded,
                      color: color_list.primary,
                      size: 100.0,
                    ),
                    action.widget,
                    reactionParameter.build(context),
                    const Padding(padding: EdgeInsets.only(
                        top: 10.0,
                        bottom: 10.0
                    )),
                    Container(
                      padding: const EdgeInsets.only(
                          top: 20.0,
                          bottom: 20.0
                      ),
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () {
                          // TODO IMPLEMENT THIS
                          area.Action actionBuild = area.Action(
                              getActionTypeByDescr(action.controllerSecond.text),
                              [
                                Parameter("", ParameterType.TEXT)
                              ]
                          );
                          Reaction reactionBuild = Reaction(
                              getReactionTypeByDescr(reaction.controllerSecond.text),
                              [
                                Parameter("", ParameterType.TEXT)
                              ]
                          );

                          callbackSaveIfttt(context, api, actionBuild, reactionBuild, api.token!.token);

                          // action.controllerFirst.text
                          // action.controllerSecond.text
                          // reaction.controllerFirst.text
                          // reaction.controllerSecond.text
                        },
                        style: ElevatedButton.styleFrom(
                            primary: color_list.primary,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10.0),
                            )
                        ),
                        child: const Text(
                          'Save',
                          style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: color_list.third,
                              fontSize: 20
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              )
            ]
          )
        ),
      ),
    );
  }

  Widget buildTopPage(BuildContext context) {
    return Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Expanded(
            child: Stack(
              children: [
                const Center(
                  child: Text(
                    'New IFTTT',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: color_list.fourth,
                        fontSize: 50
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
                Positioned(
                  right: 8,
                  child: IconButton(
                    icon: const Icon(
                        Icons.close,
                        size: 40.0
                    ),
                    tooltip: 'Close page',
                    onPressed: () {
                      callbackClose(context);
                    },
                  ),
                ),
              ],
            ),
          )
        ]
    );
  }
}