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
import 'package:mobile/widget/global_connexion_list.dart';
import 'create_ifttt.dart';

void callbackLogout(BuildContext context) {
  // TODO FILL THIS
  Navigator.of(context).pushNamed('/SignIn');
}

class settings_page extends StatelessWidget {
  late areaService api;
  List<IService> serviceList = [
    github(),
    twitch(),
    twitter(),
    discord(),
    linkedin(),
    notion()
  ];

  settings_page(areaService apiSrc, {Key? key}) : super(key: key) {
    api = apiSrc;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Center(
        child: Container(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              buildTopPage(context),
              const Text(
                'Connection aux services',
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: color_list.fourth,
                    fontSize: 20
                ),
                textAlign: TextAlign.center,
              ),
              GlobalConnexionList(serviceList),
              FractionallySizedBox(
                widthFactor: 0.4,
                child: ElevatedButton(
                  onPressed: () {
                    callbackLogout(context);
                  },
                  style: ElevatedButton.styleFrom(
                    primary: color_list.fifth,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    )
                  ),
                  child: Container(
                    padding: const EdgeInsets.all(20.0),
                    child: const Text(
                      'Logout',
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: color_list.third,
                          fontSize: 20
                      ),
                    ),
                  )
                ),
              ),
              const Padding(
                  padding: EdgeInsets.only(top: 20.0)
              ),
            ]
          ),
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
                Positioned(
                  left: 8,
                  child: IconButton(
                    icon: const Icon(
                        Icons.arrow_back,
                        size: 40.0
                    ),
                    tooltip: 'Retour arrière',
                    onPressed: () {
                      callbackClose(context);
                    },
                  ),
                ),
                const Center(
                  child: Text(
                    'Settings',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: color_list.fourth,
                        fontSize: 50
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ],
            ),
          )
        ]
    );
  }
}