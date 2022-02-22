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
  Future<bool> Function(IService service, String srv, areaService api) callback;
  void Function() onSuccess;
  void Function() onFailed;

  GlobalConnexionList(this.urlSrv, this.list, this.api, this.callback, this.onSuccess, this.onFailed, {Key? key}) : super(key: key);

  @override
  State<GlobalConnexionList> createState() => GlobalConnexionListState(urlSrv, list, api, callback, onSuccess, onFailed);
}

class GlobalConnexionListState extends State<GlobalConnexionList> {
  List<IService> list = [];
  String urlSrv;
  areaService api;
  Future<bool> Function(IService service, String srv, areaService api) callback;
  void Function() onSuccess;
  void Function() onFailed;
  GlobalConnexionListState(this.urlSrv, this.list, this.api, this.callback, this.onSuccess, this.onFailed);

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
                Future<bool> success = callback(list[0], urlSrv, api);
                success.then((value) => {
                  if (value) {
                    onSuccess()
                  } else {
                    onFailed()
                  }
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[1].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[1].getName(), list[1].getIcon(), () {
              if (list[1].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<bool> success = callback(list[1], urlSrv, api);
                success.then((value) => {
                  if (value) {
                    onSuccess()
                  } else {
                    onFailed()
                  }
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[2].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[2].getName(), list[2].getIcon(), () {
              if (list[2].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<bool> success = callback(list[2], urlSrv, api);
                success.then((value) => {
                  if (value) {
                    onSuccess()
                  } else {
                    onFailed()
                  }
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[3].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[3].getName(), list[3].getIcon(), () {
              if (list[3].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<bool> success = callback(list[3], urlSrv, api);
                success.then((value) => {
                  if (value) {
                    onSuccess()
                  } else {
                    onFailed()
                  }
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[4].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[4].getName(), list[4].getIcon(), () {
              if (list[4].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<bool> success = callback(list[4], urlSrv, api);
                success.then((value) => {
                  if (value) {
                    onSuccess()
                  } else {
                    onFailed()
                  }
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[5].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[5].getName(), list[5].getIcon(), () {
              if (list[5].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<bool> success = callback(list[5], urlSrv, api);
                success.then((value) => {
                  if (value) {
                    onSuccess()
                  } else {
                    onFailed()
                  }
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[6].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[6].getName(), list[6].getIcon(), () {
              if (list[6].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<bool> success = callback(list[6], urlSrv, api);
                success.then((value) => {
                  if (value) {
                    onSuccess()
                  } else {
                    onFailed()
                  }
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[7].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[7].getName(), list[7].getIcon(), () {
              if (list[7].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<bool> success = callback(list[7], urlSrv, api);
                success.then((value) => {
                  if (value) {
                    onSuccess()
                  } else {
                    onFailed()
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