import 'package:flutter/material.dart';
import 'package:mobile/enum/authentication_e.dart';
import 'package:mobile/page/color_list.dart';
import 'package:mobile/widget/global_connexion_list.dart';
import 'package:mobile/widget/input_custom.dart';

void callbackSignInSwitch() {
  // TODO FILL THIS
}

void callbackSignUpSwitch() {
  // TODO FILL THIS
}

void callbackSignInConnexion() {
  // TODO FILL THIS
}

void callbackSignUpConnexion() {
  // TODO FILL THIS
}

class auth_page extends StatefulWidget {
  authentication_e type = authentication_e.SIGN_IN;

  auth_page(authentication_e typeSrc, {Key? key}) : super(key: key) {
    type = typeSrc;
  }

  @override
  State<auth_page> createState() => _auth_pageState(type);
}

class _auth_pageState extends State<auth_page> {
  authentication_e type = authentication_e.SIGN_IN;
  String primaryDesc = "";
  String secondaryDesc = "";
  String endPageTips = "";
  void Function() connexionCallBack = () {};
  void Function() switchCallBack = () {};

  _auth_pageState(authentication_e typeSrc) {
    type = typeSrc;
    primaryDesc = (type == authentication_e.SIGN_IN) ? "Sign in" : "Sign up";
    secondaryDesc = (type == authentication_e.SIGN_IN) ? "Sign up" : "Sign In";
    endPageTips = (type == authentication_e.SIGN_IN) ? "Don’t have an account yet?" : "You already have an account ?";
    connexionCallBack = (type == authentication_e.SIGN_IN) ? callbackSignInConnexion : callbackSignUpConnexion;
    switchCallBack = (type == authentication_e.SIGN_IN) ? callbackSignInSwitch : callbackSignUpSwitch;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: <Widget>[
        const Padding(
            padding: EdgeInsets.only(top: 40.0)
        ),
        Text(
          primaryDesc,
          style: const TextStyle(
              fontWeight: FontWeight.bold,
              color: color_list.fourth,
              fontSize: 50
          ),
          textAlign: TextAlign.center,
        ),
        Container(
          padding: const EdgeInsets.only(
              left: 40.0,
              right: 40.0
          ),
          child: InputCustom('Email', 'Enter your Email address'),
        ),
        Container(
          padding: const EdgeInsets.only(
              left: 40.0,
              right: 40.0
          ),
          child: InputCustom('Password', 'Enter your password'),
        ),
        FractionallySizedBox(
          widthFactor: 0.2,
          child: ElevatedButton(
            onPressed: connexionCallBack,
            style: ElevatedButton.styleFrom(
                primary: color_list.primary,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0),
                )
            ),
            child: Container(
              padding: const EdgeInsets.only(
                top: 10.0,
                bottom: 10.0,
              ),
              child: Text(
                primaryDesc,
                style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    color: color_list.third,
                    fontSize: 30
                ),
              ),
            ),
          ),
        ),
        additionnal_connexion_widget(context),
        end_page_widget(context)
      ],
    );
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
                Text(
                  endPageTips,
                  style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      color: color_list.fourth,
                      fontSize: 20
                  ),
                ),
                FractionallySizedBox(
                  widthFactor: 0.2,
                  child: ElevatedButton(
                    onPressed: switchCallBack,
                    style: ElevatedButton.styleFrom(
                        primary: color_list.primary,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(5.0),
                        )
                    ),
                    child: Text(
                      secondaryDesc,
                      style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          color: color_list.third,
                          fontSize: 20
                      ),
                    ),
                  ),
                ),
              ]
          ),
        )
      ),
    );
  }

  Widget additionnal_connexion_widget(BuildContext context) {
    return GlobalConnexionList(const [
      false,
      false,
      false,
      false,
      false,
      false
    ]);
  }
}