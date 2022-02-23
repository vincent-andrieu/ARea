import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';

class InputCustom extends StatefulWidget {
  String desc;
  String hint;
  bool isPassword;
  TextInputType? type;
  late TextEditingController controller;

  InputCustom(this.desc, this.hint, String defaultText, this.isPassword, this.type, {Key? key})
      : super(key: key) {
    controller = TextEditingController(text: defaultText);
  }

  @override
  State<InputCustom> createState() => InputCustomState(desc, hint, controller, isPassword, type);
}

class InputCustomState extends State<InputCustom> {
  String desc;
  String hint;
  TextInputType? type;
  bool isPassword;
  final controller;

  InputCustomState(this.desc, this.hint, this.controller, this.isPassword, this.type);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      child: TextField(
        obscureText: isPassword,
        keyboardType: type,
        controller: controller,
        decoration: InputDecoration(
            border:
                OutlineInputBorder(borderRadius: BorderRadius.circular(10.0)),
            hintText: hint,
            labelText: desc,
            labelStyle: const TextStyle(
              fontWeight: FontWeight.bold,
              color: color_list.fourth,
            )),
      ),
    );
  }
}
