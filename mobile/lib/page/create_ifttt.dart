import 'package:flutter/material.dart';
import 'package:mobile/api/areaService.dart';
import 'package:mobile/api/model/createAreaRequest.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/service/IService.dart';
import 'package:mobile/tools/serviceListBuilder.dart';
import 'package:mobile/widget/DynamicList.dart';

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

void callbackSaveIfttt(BuildContext context, createAreaRequest newArea, areaService api) {
  api.createIfttt(newArea).then((value) => {
    if (value) {
      Navigator.of(context).pushNamed('/List')
    }
  });
}

class create_ifttt extends StatelessWidget {
  late areaService api;
  late List<IService> serviceList;

  create_ifttt(this.api, {Key? key}) : super(key: key) {
    serviceList = serviceListBuilder(api, true);
  }

  @override
  Widget build(BuildContext context) {
    DynamicList action = DynamicList(serviceList, true, "Service", "Action", api.listService, null);
    DynamicList reaction = DynamicList(serviceList, false, "Service", "Reaction", api.listService, null);

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
                            Container(
                              padding: const EdgeInsets.only(
                                  top: 20.0,
                                  bottom: 20.0
                              ),
                              width: double.infinity,
                              child: ElevatedButton(
                                onPressed: () {
                                  callbackSaveIfttt(
                                      context,
                                      createAreaRequest(
                                        action.controllerSecond.text,
                                        action.actionParameter.getParams(),
                                        reaction.controllerSecond.text,
                                        reaction.actionParameter.getParams(),
                                      ),
                                      api
                                  );

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
                                child: const FittedBox(
                                  fit: BoxFit.fitWidth,
                                  child: Text(
                                  'Save',
                                  style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      color: color_list.third
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    )
                  ]
                ),
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