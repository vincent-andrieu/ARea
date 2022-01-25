import 'package:flutter/material.dart';
import 'package:mobile/api/areaService.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/service/IService.dart';
import 'package:mobile/service/discord.dart';
import 'package:mobile/service/github.dart';
import 'package:mobile/service/linkedin.dart';
import 'package:mobile/service/notion.dart';
import 'package:mobile/service/twitch.dart';
import 'package:mobile/service/twitter.dart';
import 'package:mobile/widget/updatedList.dart';
import 'dart:developer' as developer;


List<String> getBuildList(List<IService> serviceList, String Function(IService it) callback) {
  List<String> val = [];

  for (var it in serviceList) {
    val.add(callback(it));
  }
  val.add('None');
  return val;
}

List<String> buildSinceName(List<IService> serviceList, String name, List<String> Function(IService it) callback) {
  List<String> tmp = [];

  developer.log(name);
  for (var it in serviceList) {
    if (it.getName() == name) {
      tmp = callback(it);
      break;
    }
  }
  tmp.add('None');
  return tmp;
}

void callbackClose(BuildContext context) {
  Navigator.of(context).pop();
}

void callbackSaveIfttt(BuildContext context) {
  // TODO FILL THIS
  Navigator.of(context).pushNamed('/List');
}

class create_ifttt extends StatelessWidget {
  late areaService api;
  List<IService> serviceList = [
    github(),
    twitch(),
    twitter(),
    discord(),
    linkedin(),
    notion()
  ];

  create_ifttt(areaService apiSrc, {Key? key}) : super(key: key) {
    api = apiSrc;
  }

  @override
  Widget build(BuildContext context) {
    updatedList parameter = updatedList("Parameter", const <String>['\$MSG', '\$NAME', 'None'], 'None');
    updatedList service = updatedList("Service", getBuildList(serviceList, (IService it) => it.getName()), 'None');
    updatedList condition = updatedList("Condition", buildSinceName(serviceList, service.list.defaultValue, (it) => it.getAction()), 'None');

    updatedList toService = updatedList("Service", getBuildList(serviceList, (IService it) => it.getName()), 'None');
    updatedList toAction = updatedList("Action", const <String>['New message', 'New status', 'None'], 'None');
    updatedList toParameter = updatedList("Parameter", const <String>['Hello world', 'None'], 'None');

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
                    // TODO ADD SEPARATION
                    const Icon(
                      Icons.arrow_downward_rounded,
                      color: color_list.primary,
                      size: 100.0,
                    ),
                    // TODO
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
                          callbackSaveIfttt(context);
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