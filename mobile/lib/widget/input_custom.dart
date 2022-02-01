import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';

class InputCustom extends StatefulWidget {
  String desc = "";
  String hint = "";
  late TextEditingController controller;

  InputCustom(String descSrc, String hintSrc, String defaultText, {Key? key}) : super(key: key) {
    desc = descSrc;
    hint = hintSrc;
    controller = TextEditingController(text: defaultText);
  }

  @override
  State<InputCustom> createState() => InputCustomState(desc, hint, controller);
}

class InputCustomState extends State<InputCustom> {
  String desc = "";
  String hint = "";
  late final controller;

  InputCustomState(String descSrc, String hintSrc, TextEditingController controllerSrc) {
    desc = descSrc;
    hint = hintSrc;
    controller = controllerSrc;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(
          left: 40.0,
          right: 40.0
      ),
      width: double.infinity,
      child: TextField(
        controller: controller,
        decoration: InputDecoration(
            border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10.0)
            ),
            hintText: hint,
            labelText: desc,
            labelStyle: const TextStyle(
              fontWeight: FontWeight.bold,
              color: color_list.fourth,
            )
        ),
      ),
    );
  }
}