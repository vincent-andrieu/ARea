import 'package:flutter/cupertino.dart';
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

  textInputTransfer(this.key, String descSrc, String hintSrc, String defaultText) {
    data = InputCustom(descSrc, hintSrc, defaultText);
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