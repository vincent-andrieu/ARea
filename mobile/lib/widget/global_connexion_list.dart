import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/service/IService.dart';

class GlobalConnexionList extends StatefulWidget {
  List<IService> list = [];
  GlobalConnexionList(List<IService> src, {Key? key}) : super(key: key) {
    list = src;
    if (list.length != 6) {
      throw Exception("Invalid input size: " + list.length.toString());
    }
    list = src;
  }

  @override
  State<GlobalConnexionList> createState() => GlobalConnexionListState(list);
}

class GlobalConnexionListState extends State<GlobalConnexionList> {
  List<IService> list = [];
  GlobalConnexionListState(List<IService> src) {
    list = src;
  }

  @override
  Widget build(BuildContext context) {
    return FractionallySizedBox(
      widthFactor: 0.4,
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            connexion_with_button(context, (list[0].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[0].getName(), list[0].getIcon(), () {
              if (list[0].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<String> token = list[0].getToken();
                token.whenComplete(() {
                  // TODO SEND TOKEN TO SERVER
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[1].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[1].getName(), list[1].getIcon(), () {
              if (list[1].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<String> token = list[1].getToken();
                token.whenComplete(() {
                  // TODO SEND TOKEN TO SERVER
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[2].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[2].getName(), list[2].getIcon(), () {
              if (list[2].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<String> token = list[2].getToken();
                token.whenComplete(() {
                  // TODO SEND TOKEN TO SERVER
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[3].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[3].getName(), list[3].getIcon(), () {
              if (list[3].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<String> token = list[3].getToken();
                token.whenComplete(() {
                  // TODO SEND TOKEN TO SERVER
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[4].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[4].getName(), list[4].getIcon(), () {
              if (list[4].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<String> token = list[4].getToken();
                token.whenComplete(() {
                  // TODO SEND TOKEN TO SERVER
                });
              }
            }),
            const Padding(padding: EdgeInsets.all(5.0)),
            connexion_with_button(context, (list[5].getConnexionState()) ? "connecté avec " : "se connecter avec ", list[5].getName(), list[5].getIcon(), () {
              if (list[5].getConnexionState()) {
                // TODO PROBABLY NOTHING
              } else {
                Future<String> token = list[5].getToken();
                token.whenComplete(() {
                  // TODO SEND TOKEN TO SERVER
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
      onTap: onTap,
    );
  }
}