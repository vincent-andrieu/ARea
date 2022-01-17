import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/page/color_list.dart';

class ListCustom extends StatefulWidget {
  List<String> list = <String>[];
  String defaultValue = "";

  ListCustom(List<String> listSrc, String defaultValueSrc, {Key? key}) : super(key: key) {
    list = listSrc;
    defaultValue = defaultValueSrc;
  }

  @override
  State<ListCustom> createState() => ListCustomState(list, defaultValue);
}

class ListCustomState extends State<ListCustom> {
  String dropdownValue = "";
  List<String> list = <String>[];

  ListCustomState(List<String> listSrc, String defaultValue) {
    list = listSrc;
    dropdownValue = defaultValue;
  }

  @override
  Widget build(BuildContext context) {
    return DropdownButton<String>(
      value: dropdownValue,
      icon: const Icon(Icons.arrow_downward),
      style: const TextStyle(color: color_list.fourth),
      underline: Container(
        height: 2,
        color: color_list.fourth,
      ),
      onChanged: (String? newValue) {
        setState(() {
          dropdownValue = newValue!;
        });
      },
      items: list.map<DropdownMenuItem<String>>((String value) {
        return DropdownMenuItem<String>(
          value: value,
          child: Text(value),
        );
      }).toList(),
    );
  }
}