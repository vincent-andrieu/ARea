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
import 'package:mobile/widget/global_connexion_list.dart';
import 'create_ifttt.dart';

bool getValue(String key, Map<String, bool> oauth) {
  bool? value = oauth[key];

  if (value == null) {
    return false;
  }
  return value;
}

List<IService> getListService(Map<String, bool> oauth) {
  List<IService> list = [
    github(getValue("github", oauth)),
    twitch(getValue("twitch", oauth)),
    twitter(getValue("twitter", oauth)),
    discord(getValue("discord", oauth)),
    linkedin(getValue("linkedin", oauth)),
    notion(getValue("notion", oauth)),
    unsplash(getValue("unsplash", oauth)),
    dropbox(getValue("dropbox", oauth)),
  ];
  return list;
}

void callbackLogout(BuildContext context, areaService api) {
  api.logout();
  Navigator.popUntil(context, (route) => false);
  Navigator.of(context).pushNamed('/SignIn');
}

class settings_page extends StatelessWidget {
  areaService api;
  late List<IService> serviceList;

  settings_page(this.api, {Key? key}) : super(key: key) {
    serviceList = getListService(api.user!.oauth);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SafeArea(
        child: Center(
        child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              buildTopPage(context),
              const Text(
                'Connected to services',
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: color_list.fourth,
                    fontSize: 20),
                textAlign: TextAlign.center,
              ),
              Text('Welcome ${api.user!.username}',
                  style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      color: color_list.fourth,
                      fontSize: 20)),
              GlobalConnexionList(api.api.srvUrl, serviceList, api,
                  (IService service, String srv, areaService api) {
                return service.addUserService(srv, api);
              }, (IService service, String srv, areaService api) {
                return service.disconnectService(srv, api);
              }, () {
                Navigator.of(context).pushNamed('/Settings');
              }, () {}),
              FractionallySizedBox(
                widthFactor: 0.4,
                child: ElevatedButton(
                    onPressed: () {
                      callbackLogout(context, api);
                    },
                    style: ElevatedButton.styleFrom(
                        primary: color_list.fifth,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.0),
                        )),
                    child: Container(
                        padding: const EdgeInsets.all(20.0),
                        child: const FittedBox(
                          fit: BoxFit.fitWidth,
                          child: Text(
                            'Logout',
                            style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: color_list.third,
                                fontSize: 20),
                          ),
                        ))),
              ),
              const Padding(padding: EdgeInsets.only(top: 20.0)),
            ]),
      ),
    ));
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
                    icon: const Icon(Icons.arrow_back, size: 40.0),
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
                        fontSize: 50),
                    textAlign: TextAlign.center,
                  ),
                ),
              ],
            ),
          )
        ]);
  }
}
