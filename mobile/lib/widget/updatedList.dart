import 'list_custom.dart';
import 'package:flutter/cupertino.dart';

class updatedList extends ChangeNotifier {
  late ListCustom list;

  updatedList(String descSrc, List<String> listSrc, String defaultValueSrc) {
    list = ListCustom(descSrc, listSrc, defaultValueSrc, () {
      notifyListeners();
    });
  }
}