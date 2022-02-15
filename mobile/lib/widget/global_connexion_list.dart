import 'dart:developer';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/api/areaService.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/service/IService.dart';

class GlobalConnexionList extends StatefulWidget {
  List<IService> list;
  String urlSrv;
  areaService api;
  GlobalConnexionList(this.urlSrv, this.list, this.api, {Key? key}) : super(key: key);

  @override
  State<GlobalConnexionList> createState() => GlobalConnexionListState(urlSrv, list, api);
}

class GlobalConnexionListState extends State<GlobalConnexionList> {
  List<IService> list = [];
  String urlSrv;
  areaService api;
  GlobalConnexionListState(this.urlSrv, this.list, this.api);

  @override
  Widget build(BuildContext context) {
    return FractionallySizedBox(
      widthFactor: 0.45,
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            connexion_with_button(context, (list[0].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[0].getName(), list[0].getIcon(), () {
              if (list[0].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<bool> success = list[0].getToken(urlSrv, api);
                success.then((value) => {
                  if (value) {
                    list[0].nowConnected(),
                    Navigator.of(context).pushNamed('/List')
                  } else {
                    // TODO FAILED TO CONNECT WITH THIS SERVICE
                  }
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[1].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[1].getName(), list[1].getIcon(), () {
              if (list[1].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<bool> success = list[1].getToken(urlSrv, api);
                success.then((value) => {
                  if (value) {
                    list[1].nowConnected(),
                    Navigator.of(context).pushNamed('/List')
                  } else {
                    // TODO FAILED TO CONNECT WITH THIS SERVICE
                  }
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[2].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[2].getName(), list[2].getIcon(), () {
              if (list[2].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<bool> success = list[2].getToken(urlSrv, api);
                success.then((value) => {
                  if (value) {
                    list[2].nowConnected(),
                    Navigator.of(context).pushNamed('/List')
                  } else {
                    // TODO FAILED TO CONNECT WITH THIS SERVICE
                  }
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[3].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[3].getName(), list[3].getIcon(), () {
              if (list[3].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<bool> success = list[3].getToken(urlSrv, api);
                success.then((value) => {
                  if (value) {
                    list[3].nowConnected(),
                    Navigator.of(context).pushNamed('/List')
                  } else {
                    // TODO FAILED TO CONNECT WITH THIS SERVICE
                  }
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[4].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[4].getName(), list[4].getIcon(), () {
              if (list[4].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<bool> success = list[4].getToken(urlSrv, api);
                success.then((value) => {
                  if (value) {
                    list[4].nowConnected(),
                    Navigator.of(context).pushNamed('/List')
                  } else {
                    // TODO FAILED TO CONNECT WITH THIS SERVICE
                  }
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[5].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[5].getName(), list[5].getIcon(), () {
              if (list[5].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<bool> success = list[5].getToken(urlSrv, api);
                success.then((value) => {
                  if (value) {
                    list[5].nowConnected(),
                    Navigator.of(context).pushNamed('/List')
                  } else {
                    // TODO FAILED TO CONNECT WITH THIS SERVICE
                  }
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[6].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[6].getName(), list[6].getIcon(), () {
              if (list[6].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<bool> success = list[6].getToken(urlSrv, api);
                success.then((value) => {
                  if (value) {
                    list[6].nowConnected(),
                    Navigator.of(context).pushNamed('/List')
                  } else {
                    // TODO FAILED TO CONNECT WITH THIS SERVICE
                  }
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[7].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[7].getName(), list[7].getIcon(), () {
              if (list[7].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<bool> success = list[7].getToken(urlSrv, api);
                success.then((value) => {
                  if (value) {
                    list[7].nowConnected(),
                    Navigator.of(context).pushNamed('/List')
                  } else {
                    // TODO FAILED TO CONNECT WITH THIS SERVICE
                  }
                });
              }
            }),
          ]
      ),
    );
  }

  Widget connexion_with_button(BuildContext context, String msg, String name, String asset, void Function() onTap) {
    return InkWell(
      child: Container(
        padding: const EdgeInsets.only(
          bottom: 10.0,
          left: 20.0,
          right: 20.0,
          top: 10.0,
        ),
        decoration: BoxDecoration(
          color: color_list.third,
          border: Border.all(
            color: color_list.fourth,
            width: 2,
          ),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
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
            const Padding(padding: EdgeInsets.all(10.0)),
            Text(
              msg + name,
              textAlign: TextAlign.left,
              style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: color_list.fourth,
                  fontSize: 20
              ),
            ),
          ],
        ),
      ),
      onTap: () {
        log('Connect with');
        onTap();
      },
    );
  }
}