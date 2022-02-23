import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';

class InputCustom extends StatefulWidget {
  String desc;
  String hint;
  TextInputType? type;
  late TextEditingController controller;

  InputCustom(this.desc, this.hint, String defaultText, this.type, {Key? key})
      : super(key: key) {
    controller = TextEditingController(text: defaultText);
  }

  @override
  State<InputCustom> createState() => InputCustomState(desc, hint, controller, type);
}

class InputCustomState extends State<InputCustom> {
  String desc;
  String hint;
  TextInputType? type;
  final controller;

  InputCustomState(this.desc, this.hint, this.controller, this.type);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      child: TextField(
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
