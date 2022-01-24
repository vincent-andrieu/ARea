import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';

class GlobalConnexionList extends StatefulWidget {
  List<bool> list = [];
  GlobalConnexionList(List<bool> src, {Key? key}) : super(key: key) {
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
  List<bool> list = [];
  GlobalConnexionListState(List<bool> src) {
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
            connexion_with_button(context, (list[0]) ? "connecté avec " : "se connecter avec ", "Github", "assets/discord.png", () {
              if (list[0]) {
                // TODO
              } else {

              }
            }),
            const Padding(padding: EdgeInsets.all(10.0)),
            connexion_with_button(context, (list[1]) ? "connecté avec " : "se connecter avec ", "Twitch", "assets/discord.png", () {
              if (list[1]) {
                // TODO
              } else {

              }
            }),
            const Padding(padding: EdgeInsets.all(10.0)),
            connexion_with_button(context, (list[2]) ? "connecté avec " : "se connecter avec ", "Twitter", "assets/discord.png", () {
              if (list[2]) {
                // TODO
              } else {

              }
            }),
            const Padding(padding: EdgeInsets.all(10.0)),
            connexion_with_button(context, (list[3]) ? "connecté avec " : "se connecter avec ", "Discord", "assets/discord.png", () {
              if (list[3]) {
                // TODO
              } else {

              }
            }),
            const Padding(padding: EdgeInsets.all(10.0)),
            connexion_with_button(context, (list[4]) ? "connecté avec " : "se connecter avec ", "Linkedin", "assets/discord.png", () {
              if (list[4]) {
                // TODO
              } else {

              }
            }),
            const Padding(padding: EdgeInsets.all(10.0)),
            connexion_with_button(context, (list[5]) ? "connecté avec " : "se connecter avec ", "Notion", "assets/discord.png", () {
              if (list[5]) {
                // TODO
              } else {

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