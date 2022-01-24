import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';

class InputCustom extends StatefulWidget {
  String desc = "";
  String hint = "";

  InputCustom(String descSrc, String hintSrc, {Key? key}) : super(key: key) {
    desc = descSrc;
    hint = hintSrc;
  }

  @override
  State<InputCustom> createState() => InputCustomState(desc, hint);
}

class InputCustomState extends State<InputCustom> {
  String desc = "";
  String hint = "";

  InputCustomState(String descSrc, String hintSrc) {
    desc = descSrc;
    hint = hintSrc;
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