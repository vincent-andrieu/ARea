import 'package:flutter/material.dart';
import 'package:mobile/api/areaService.dart';
import 'package:mobile/enum/authentication_e.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/service/IService.dart';
import 'package:mobile/service/discord.dart';
import 'package:mobile/service/dropbox.dart';
import 'package:mobile/service/github.dart';
import 'package:mobile/service/linkedin.dart';
import 'package:mobile/service/notion.dart';
import 'package:mobile/service/rss.dart';
import 'package:mobile/service/twitch.dart';
import 'package:mobile/service/twitter.dart';
import 'package:mobile/service/unsplash.dart';
import 'package:mobile/widget/global_connexion_list.dart';
import 'package:mobile/widget/input_custom.dart';

void callbackSignInSwitch(BuildContext context) {
  Navigator.of(context).pushNamed('/SignUp');
}

void callbackSignUpSwitch(BuildContext context) {
  Navigator.of(context).pushNamed('/SignIn');
}

void callbackSignInConnexion(
    BuildContext context, areaService api, String user, String pass) {
  Future<bool> tmp = api.tryConnexion(user, pass);

  tmp.then((value) => {if (value) Navigator.of(context).pushNamed('/List')});
}

void callbackSignUpConnexion(
    BuildContext context, areaService api, String user, String pass) {
  Future<bool> tmp = api.createUserAndConnexion(user, pass);

  tmp.then((value) => {if (value) Navigator.of(context).pushNamed('/List')});
}

class auth_page extends StatelessWidget {
  late areaService api;
  authentication_e type = authentication_e.SIGN_IN;
  String primaryDesc = "";
  String secondaryDesc = "";
  String endPageTips = "";
  void Function(BuildContext context, areaService api, String user, String pass)
      connexionCallBack =
      (BuildContext context, areaService api, String user, String pass) {};
  void Function(BuildContext context) switchCallBack =
      (BuildContext context) {};
  List<IService> serviceList = [
    github(false),
    twitch(false),
    twitter(false),
    discord(false),
    linkedin(false),
    notion(false),
    unsplash(false),
    dropbox(false),
    rss(false),
  ];

  auth_page(authentication_e typeSrc, areaService apiSrc, {Key? key})
      : super(key: key) {
    api = apiSrc;
    type = typeSrc;
    primaryDesc = (type == authentication_e.SIGN_IN) ? "Sign in" : "Sign up";
    secondaryDesc = (type == authentication_e.SIGN_IN) ? "Sign up" : "Sign In";
    endPageTips = (type == authentication_e.SIGN_IN)
        ? "Don’t have an account yet?"
        : "You already have an account ?";
    connexionCallBack = (type == authentication_e.SIGN_IN)
        ? callbackSignInConnexion
        : callbackSignUpConnexion;
    switchCallBack = (type == authentication_e.SIGN_IN)
        ? callbackSignInSwitch
        : callbackSignUpSwitch;
  }

  @override
  Widget build(BuildContext context) {
    InputCustom user = InputCustom('Email', 'Enter your Email address', '');
    InputCustom pass = InputCustom('Password', 'Enter your password', '');
    return Scaffold(
        resizeToAvoidBottomInset: false,
        body: Center(
            child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            const Padding(padding: EdgeInsets.only(top: 40.0)),
            Text(
              primaryDesc,
              style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: color_list.fourth,
                  fontSize: 50),
              textAlign: TextAlign.center,
            ),
            Container(
              padding: const EdgeInsets.only(left: 40.0, right: 40.0),
              child: user,
            ),
            Container(
              padding: const EdgeInsets.only(left: 40.0, right: 40.0),
              child: pass,
            ),
            FractionallySizedBox(
              widthFactor: 0.2,
              child: ElevatedButton(
                onPressed: () {
                  connexionCallBack(
                      context, api, user.controller.text, pass.controller.text);
                },
                style: ElevatedButton.styleFrom(
                    primary: color_list.primary,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    )),
                child: Container(
                  padding: const EdgeInsets.only(
                    top: 10.0,
                    bottom: 10.0,
                  ),
                  child: FittedBox(
                    fit: BoxFit.fitWidth,
                    child: Text(
                      primaryDesc,
                      style: const TextStyle(
                          fontWeight: FontWeight.bold, color: color_list.third),
                    ),
                  ),
                ),
              ),
            ),
            additionnal_connexion_widget(context),
            end_page_widget(context)
          ],
        )));
  }

  Widget end_page_widget(BuildContext context) {
    return Align(
      alignment: Alignment.bottomCenter,
      child: Container(
          height: 100,
          width: double.infinity,
          color: color_list.secondary,
          padding: const EdgeInsets.only(
            top: 10.0,
            bottom: 10.0,
          ),
          child: FractionallySizedBox(
            widthFactor: 1,
            heightFactor: 1,
            child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  FittedBox(
                    fit: BoxFit.fitWidth,
                    child: Text(
                      endPageTips,
                      style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          color: color_list.fourth),
                    ),
                  ),
                  FractionallySizedBox(
                    widthFactor: 0.2,
                    child: ElevatedButton(
                      onPressed: () {
                        switchCallBack(context);
                      },
                      style: ElevatedButton.styleFrom(
                          primary: color_list.primary,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(5.0),
                          )),
                      child: FittedBox(
                        fit: BoxFit.fitWidth,
                        child: Text(
                          secondaryDesc,
                          style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              color: color_list.third),
                        ),
                      ),
                    ),
                  ),
                ]),
          )),
    );
  }

  Widget additionnal_connexion_widget(BuildContext context) {
    return GlobalConnexionList(api.api.srvUrl, serviceList, api,
        (IService service, String srv, areaService api) {
      return service.getToken(srv, api);
    }, (IService service, String srv, areaService api) {
      return service.none();
    }, () {
      Navigator.of(context).pushNamed('/List');
    }, () {});
  }
}
