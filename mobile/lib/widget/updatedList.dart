import 'list_custom.dart';
import 'package:flutter/cupertino.dart';

class updatedList extends ChangeNotifier {
  late ListCustom list;

  updatedList(String descSrc, List<String> listSrc, String defaultValueSrc, void Function(String)? onUpdate) {
    list = ListCustom(descSrc, listSrc, defaultValueSrc, (String selected) {
      //notifyListeners();
      if (onUpdate != null) {
        onUpdate(selected);
      }
    });
  }
}