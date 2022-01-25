import 'package:flutter/cupertino.dart';

import 'list_custom.dart';
import 'dart:developer' as developer;

class updatedList extends ChangeNotifier {
  late ListCustom list;

  updatedList(String descSrc, List<String> listSrc, String defaultValueSrc) {
    list = ListCustom(descSrc, listSrc, defaultValueSrc, () {
      developer.log("HERE IT'S UPDATE");
      notifyListeners();
    });
  }
}