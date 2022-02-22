import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:mobile/api/areaService.dart';
import 'package:mobile/api/model/area/ActionType.dart' as areaAction;
import 'package:mobile/api/model/area/ReactionType.dart' as areaReaction;
import 'package:mobile/api/model/createAreaRequest.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/service/IService.dart';
import 'package:mobile/tools/ActionReactionTools.dart';

void callbackParams(BuildContext context) {
  Navigator.of(context).pushNamed('/Settings');
}

void callbackNew(BuildContext context) {
  Navigator.of(context).pushNamed('/Create');
}

class list_ifttt extends StatelessWidget {
  late areaService api;

  list_ifttt(areaService apiSrc, {Key? key}) : super(key: key) {
    api = apiSrc;
    log("BUILD LIST");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        body: Center(
        child: Container(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Column(
                children: [
                  buildTopPage(context),
                  Text(
                    'Welcome ${api.token!.username}',
                    style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        color: color_list.fourth,
                        fontSize: 20
                    )
                  )
                ],
              ),
              buildListDisplay(context),
              FractionallySizedBox(
                widthFactor: 0.4,
                child: ElevatedButton(
                  onPressed: () {
                    callbackNew(context);
                  },
                  style: ElevatedButton.styleFrom(
                      primary: color_list.primary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10.0),
                      )
                  ),
                  child: Container(
                    padding: const EdgeInsets.all(20.0),
                    child: const Text(
                      'New',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: color_list.third,
                        fontSize: 20
                      ),
                    ),
                  )
                ),
              ),
            ]
          ),
        ),
      ),
    );
  }

  List<Widget> extractWidgetList(BuildContext context) {
    List<Widget> list = [];

    if (api.token != null) {
      for (var element in api.token!.areas) {
        list.add(buildCard(element.id, element, context));
      }
    }
    return list;
  }

  Widget buildListDisplay(BuildContext context) {
    List<Widget> toDisplay = extractWidgetList(context);
    return Flexible(
        child: FractionallySizedBox(
          heightFactor: 0.9,
          widthFactor: 0.9,
          child: SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: Column(
                children: toDisplay,
              )
          ),
        )
    );
  }

  Widget buildCard(String id, createAreaRequest ifttt, BuildContext context) {
    IService actionName = getServiceActionName(areaAction.stringToEnum(ifttt.trigger.typeData));
    IService reactionName = getServiceReactionName(areaReaction.stringToEnum(ifttt.consequence.typeData));

    return Container(
      padding: const EdgeInsets.only(
          bottom: 20.0
      ),
      child: InkWell(
        onTap: () {
          Navigator.pushNamed(context, '/area', arguments: id);
        },
        child: Container(
            color: color_list.secondary,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                buildSubCard(actionName.getName(), "Number: ${ifttt.trigger.map.length}", actionName.getIcon(), context),
                const Icon(
                  Icons.arrow_forward_outlined,
                  color: color_list.primary,
                  size: 50.0,
                ),
                buildSubCard(reactionName.getName(), "Number: ${ifttt.consequence.map.length}", reactionName.getIcon(), context)
              ],
            )
        ),
      ),
    );
  }

  Widget buildSubCard(String title, String params, String asset, BuildContext context) {
    return Flexible(
      child: FractionallySizedBox(
        widthFactor: 0.9,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              title,
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                color: color_list.fourth,
                fontSize: 40
              ),
            ),
            Text(
              params,
              style: const TextStyle(
                fontWeight: FontWeight.normal,
                color: color_list.fourth,
                fontSize: 20
              ),
            ),
            Container(
              height: 50,
              width: 50,
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: AssetImage(asset),
                  fit: BoxFit.fill
                )
              ),
            ),
          ],
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
                  'List of Areas',
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
                    Icons.settings,
                    size: 40.0
                  ),
                  tooltip: 'Going back',
                  onPressed: () {
                    callbackParams(context);
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