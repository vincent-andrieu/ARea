import 'package:flutter/material.dart';
import 'package:mobile/api/areaService.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/service/IService.dart';
import 'package:mobile/service/discord.dart';
import 'package:mobile/service/dropbox.dart';
import 'package:mobile/service/github.dart';
import 'package:mobile/service/linkedin.dart';
import 'package:mobile/service/notion.dart';
import 'package:mobile/service/twitch.dart';
import 'package:mobile/service/twitter.dart';
import 'package:mobile/service/unsplash.dart';
import 'package:mobile/widget/updatedList.dart';
import 'package:mobile/api/model/area.dart';

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

void callbackSaveIfttt(BuildContext context, areaService api, String actionLabel, String reactionLabel) {
  api.createIfttt(Area("", actionLabel, reactionLabel)).then((value) => {
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
  ];
  late IService serviceAction;
  late IService serviceReaction;

  create_ifttt(this.api, this.serviceAction, this.serviceReaction, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    updatedList service = updatedList("Service", getBuildList(serviceList, (IService it) => it.getName()), serviceAction.getName(), (String selected) {
      buildRedirection(selected, serviceReaction.getName(), context);
    });
    updatedList condition = updatedList("Condition", serviceAction.getAction(), 'None', null);
    updatedList parameter = updatedList("Parameter", serviceAction.getParams(), 'None', null);

    updatedList toService = updatedList("Service", getBuildList(serviceList, (IService it) => it.getName()), serviceReaction.getName(), (String selected) {
      buildRedirection(serviceAction.getName(), selected, context);
    });
    updatedList toAction = updatedList("Action", serviceReaction.getReaction(), 'None', null);
    updatedList toParameter = updatedList("Parameter", serviceReaction.getParams(), 'None', null);

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
                    service.list,
                    const Padding(padding: EdgeInsets.only(
                        top: 10.0,
                        bottom: 10.0
                    )),
                    condition.list,
                    const Padding(padding: EdgeInsets.only(
                        top: 10.0,
                        bottom: 10.0
                    )),
                    parameter.list,
                    const Padding(padding: EdgeInsets.only(
                        top: 20.0,
                        bottom: 20.0
                    )),
                    const Icon(
                      Icons.arrow_downward_rounded,
                      color: color_list.primary,
                      size: 100.0,
                    ),
                    const Padding(padding: EdgeInsets.only(
                        top: 20.0,
                        bottom: 20.0
                    )),
                    toService.list,
                    const Padding(padding: EdgeInsets.only(
                        top: 10.0,
                        bottom: 10.0
                    )),
                    toAction.list,
                    const Padding(padding: EdgeInsets.only(
                        top: 10.0,
                        bottom: 10.0
                    )),
                    toParameter.list,
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
                          callbackSaveIfttt(context, api, condition.list.dropdownValue, toAction.list.dropdownValue);
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