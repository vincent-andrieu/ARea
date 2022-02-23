import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/widget/areaTimePicker.dart';
import 'package:mobile/widget/input_custom.dart';

class ITransfer {
  String getKey() {
    return "";
  }

  String getValue() {
    return "";
  }

  Widget getWidget() {
    return Column();
  }
}

class textInputTransfer extends ITransfer {
  late InputCustom data;
  String key;

  textInputTransfer(
      this.key, String descSrc, String hintSrc, String defaultText) {
    data = InputCustom(descSrc, hintSrc, defaultText, null);
  }

  @override
  String getKey() {
    return key;
  }

  @override
  String getValue() {
    return data.controller.text;
  }

  @override
  Widget getWidget() {
    return data;
  }
}

class numberInputTransfer extends ITransfer {
  late InputCustom data;
  String key;

  numberInputTransfer(
      this.key, String descSrc, String hintSrc, String defaultText) {
    data = InputCustom(descSrc, hintSrc, defaultText, TextInputType.number);
  }

  @override
  String getKey() {
    return key;
  }

  @override
  String getValue() {
    return data.controller.text;
  }

  @override
  Widget getWidget() {
    return data;
  }
}

class timePickerInputTransfer extends ITransfer {
  late areaTimePicker data;
  String key;

  timePickerInputTransfer(this.key, String descSrc, String hintSrc, String defaultText) {
    data = areaTimePicker(descSrc, hintSrc, defaultText);
  }

  @override
  String getKey() {
    return key;
  }

  @override
  String getValue() {
    return data.controller.text;
  }

  @override
  Widget getWidget() {
    return data;
  }
}

class urlInputTransfer extends ITransfer {
  late InputCustom data;
  String key;

  urlInputTransfer(
      this.key, String descSrc, String hintSrc, String defaultText) {
    data = InputCustom(descSrc, hintSrc, defaultText, TextInputType.url);
  }

  @override
  String getKey() {
    return key;
  }

  @override
  String getValue() {
    return data.controller.text;
  }

  @override
  Widget getWidget() {
    return data;
  }
}