import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/api/areaService.dart';
import 'package:mobile/api/model/area.dart';
import 'package:mobile/service/IService.dart';
import 'package:mobile/service/discord.dart';
import 'package:mobile/service/github.dart';
import 'package:mobile/service/linkedin.dart';
import 'package:mobile/service/notion.dart';
import 'package:mobile/service/twitch.dart';
import 'package:mobile/service/twitter.dart';
import 'package:mobile/page/color_list.dart';
import 'dart:developer' as developer;
import 'create_ifttt.dart';

class edit_ifttt extends StatelessWidget {
  late areaService api;
  List<IService> serviceList = [
    github(),
    twitch(),
    twitter(),
    discord(),
    linkedin(),
    notion()
  ];

  edit_ifttt(this.api, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    String args = ModalRoute.of(context)!.settings.arguments as String;
    developer.log(args);
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
                        Container(
                          padding: const EdgeInsets.only(
                              top: 20.0,
                              bottom: 20.0
                          ),
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: () {
                              // TODO EDIT
                              api.deleteIfttt("");
                            },
                            style: ElevatedButton.styleFrom(
                                primary: color_list.primary,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10.0),
                                )
                            ),
                            child: const Text(
                              'Delete',
                              style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  color: color_list.third,
                                  fontSize: 20
                              ),
                            ),
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.only(
                              top: 20.0,
                              bottom: 20.0
                          ),
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: () {
                              // TODO EDIT
                              api.updateIfttt("", Area("", ""));
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
                    'Edit IFTTT',
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