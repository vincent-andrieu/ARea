import 'dart:developer';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/api/areaService.dart';
import 'package:mobile/api/model/area/ActionType.dart' as areaAction;
import 'package:mobile/api/model/area/ReactionType.dart' as areaReaction;
import 'package:mobile/api/model/createAreaRequest.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/service/IService.dart';
import 'package:mobile/tools/ActionReactionTools.dart';
import 'package:mobile/tools/preBuildTools.dart';
import 'package:mobile/tools/serviceListBuilder.dart';
import 'package:mobile/widget/DynamicList.dart';
import 'create_ifttt.dart';

class edit_ifttt extends StatelessWidget {
  late areaService api;

  edit_ifttt(this.api, {Key? key}) : super(key: key);

  createAreaRequest getArea(String id) {
    for (var it in api.token!.areas) {
      if (it.id == id) {
        return it;
      }
    }
    throw "Invalid areas id";
  }

  @override
  Widget build(BuildContext context) {
    String args = ModalRoute.of(context)!.settings.arguments as String;
    createAreaRequest area = getArea(args);

    IService actionName =
        getServiceActionName(areaAction.stringToEnum(area.trigger.typeData));
    IService reactionName = getServiceReactionName(
        areaReaction.stringToEnum(area.consequence.typeData));

    DynamicList action = DynamicList(
        serviceListBuilder(api, true),
        true,
        "Service",
        "Action",
        api.listService,
        preBuildTools(
            actionName.getName(), area.trigger.typeData, area.trigger.map));
    DynamicList reaction = DynamicList(
        serviceListBuilder(api, true),
        false,
        "Service",
        "Reaction",
        api.listService,
        preBuildTools(reactionName.getName(), area.consequence.typeData,
            area.consequence.map));

    return Scaffold(
      body: Center(
        child: Container(
            padding: const EdgeInsets.all(20.0),
            child: SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    buildTopPage(context),
                    Container(
                      padding: const EdgeInsets.only(
                        left: 10.0,
                        right: 10.0,
                      ),
                      child: Column(
                        children: <Widget>[
                          action.widget,
                          const Padding(padding: EdgeInsets.only(
                              top: 10.0,
                              bottom: 10.0
                          )),
                          const Icon(
                            Icons.arrow_downward_rounded,
                            color: color_list.primary,
                            size: 100.0,
                          ),
                          reaction.widget,
                          const Padding(padding: EdgeInsets.only(
                              top: 10.0,
                              bottom: 10.0
                          )),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: () {
                                api.deleteIfttt(args).then((value) => {
                                      if (value)
                                        {
                                          Navigator.of(context)
                                              .pushNamed('/List')
                                        }
                                    });
                              },
                              style: ElevatedButton.styleFrom(
                                  primary: color_list.fifth,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(10.0),
                                  )),
                              child: const FittedBox(
                                fit: BoxFit.fitWidth,
                                child: Text(
                                  'Delete',
                                  style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      color: color_list.third,
                                      fontSize: 20),
                                ),
                              ),
                            ),
                          ),
                          SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: () {
                                api
                                    .updateIfttt(
                                        args,
                                        createAreaRequest(
                                          action.controllerSecond.text,
                                          action.actionParameter.getParams(),
                                          reaction.controllerSecond.text,
                                          reaction.actionParameter.getParams(),
                                        ))
                                    .then((value) => {
                                          if (value)
                                            {
                                              Navigator.of(context)
                                                  .pushNamed('/List')
                                            }
                                        });
                              },
                              style: ElevatedButton.styleFrom(
                                  primary: color_list.primary,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(10.0),
                                  )),
                              child: const FittedBox(
                                fit: BoxFit.fitWidth,
                                child: Text(
                                  'Save',
                                  style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      color: color_list.third,
                                      fontSize: 20),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    )
                  ]),
            )),
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
                    'Edit IFTTT',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: color_list.fourth,
                        fontSize: 50),
                    textAlign: TextAlign.center,
                  ),
                ),
                Positioned(
                  right: 8,
                  child: IconButton(
                    icon: const Icon(Icons.close, size: 40.0),
                    tooltip: 'Close page',
                    onPressed: () {
                      callbackClose(context);
                    },
                  ),
                ),
              ],
            ),
          )
        ]);
  }

/*Widget buildEditing(BuildContext context, createAreaRequest area) {
    DynamicList action = DynamicList(serviceListBuilder(api, true), true, "Service", "Action", api.listService);
    DynamicList reaction = DynamicList(serviceListBuilder(api, true), false, "Service", "Reaction", api.listService);

    action.controllerSecond.text = area.trigger.typeData;
    action.actionParameter.setParams(area.trigger.map);
    reaction.controllerSecond.text = area.consequence.typeData;
    reaction.actionParameter.setParams(area.consequence.map);

    return Container(
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
                const Padding(padding: EdgeInsets.only(
                    top: 20.0,
                    bottom: 20.0
                )),
                const Icon(
                  Icons.arrow_downward_rounded,
                  color: color_list.primary,
                  size: 100.0,
                ),
                reaction.widget,
                const Padding(padding: EdgeInsets.only(
                    top: 10.0,
                    bottom: 10.0
                  )
                ),
              ],
            ),
          )
        ]
      )
    );
  }*/
}
