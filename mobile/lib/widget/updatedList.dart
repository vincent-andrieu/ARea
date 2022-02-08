import 'dart:developer';

import 'list_custom.dart';
import 'package:flutter/cupertino.dart';

class updatedList extends ChangeNotifier {
  late ListCustom list;

  updatedList(String descSrc, List<String> listSrc, String defaultValueSrc, void Function(String)? onUpdate) {
    list = ListCustom(descSrc, listSrc, defaultValueSrc, (String selected) {
      log("JE FONCTIONNE");
      if (onUpdate != null) {
        onUpdate(selected);
      }
      notifyListeners();
    });
  }
}