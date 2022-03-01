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
  Future<bool> Function(IService service, String srv, areaService api)
      callbackAlreadyConnected;
  void Function() onSuccess;
  void Function() onFailed;

  GlobalConnexionList(this.urlSrv, this.list, this.api, this.callback,
      this.callbackAlreadyConnected, this.onSuccess, this.onFailed,
      {Key? key})
      : super(key: key);

  @override
  State<GlobalConnexionList> createState() => GlobalConnexionListState(urlSrv,
      list, api, callback, callbackAlreadyConnected, onSuccess, onFailed);
}

class GlobalConnexionListState extends State<GlobalConnexionList> {
  List<IService> list = [];
  String urlSrv;
  areaService api;
  Future<bool> Function(IService service, String srv, areaService api) callback;
  Future<bool> Function(IService service, String srv, areaService api)
      callbackAlreadyConnected;
  void Function() onSuccess;
  void Function() onFailed;

  GlobalConnexionListState(this.urlSrv, this.list, this.api, this.callback,
      this.callbackAlreadyConnected, this.onSuccess, this.onFailed);

  List<Widget> getWidgetList() {
    List<Widget> listWidget = [];

    for (var i = 0; i < list.length; i++) {
      listWidget.add(connexion_with_button(
          context,
          (list[i].getConnexionState())
              ? "Disconnect from "
              : "Login with ",
          list[i].getName(),
          list[i].getIcon(), () {
        if (list[i].getConnexionState()) {
          Future<bool> resp =
          callbackAlreadyConnected(list[i], urlSrv, api);
          resp.then((value) => {
            Navigator.of(context).pushNamed(
                ModalRoute.of(context)!.settings.name.toString())
          });
        } else {
          Future<bool> success = callback(list[i], urlSrv, api);
          success.then((value) => {
            if (value) {onSuccess()} else {onFailed()}
          });
        }
      }));
      if (i != list.length - 1) {
        listWidget.add(
            const Padding(padding: EdgeInsets.all(5.0))
        );
      }
    }
    return listWidget;
  }

  @override
  Widget build(BuildContext context) {
    return Flexible(
      child: FractionallySizedBox(
        widthFactor: 0.60,
        heightFactor: 0.70,
        child: ListView(children: getWidgetList()),
      ),
    );
  }

  Widget connexion_with_button(BuildContext context, String msg, String name,
      String asset, void Function() onTap) {
    return InkWell(
      child: Container(
        padding: const EdgeInsets.only(
          bottom: 5.0,
          left: 5.0,
          right: 5.0,
          top: 5.0,
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
                      image: AssetImage(asset), fit: BoxFit.fill)),
            ),
            const Padding(padding: EdgeInsets.all(5.0)),
            FittedBox(
              fit: BoxFit.fitWidth,
              child: Text(
                msg + name,
                textAlign: TextAlign.left,
                style: const TextStyle(
                    fontWeight: FontWeight.bold, color: color_list.fourth),
              ),
            )
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
