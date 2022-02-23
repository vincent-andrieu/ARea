import 'dart:developer';

import 'package:mobile/api/areaService.dart';
import 'package:mobile/service/IService.dart';
import 'package:mobile/service/loaded.dart';
import 'package:mobile/service/undefined.dart';

List<IService> serviceListBuilder(areaService api, bool addNone) {
  List<IService> services = [];

  for (var it in api.listService) {
    bool? tmp = api.token?.oauth[it.label];

    if (tmp == null) {
      services.add(loaded(false, it));
    } else {
      services.add(loaded(tmp, it));
    }
  }
  if (addNone) {
    services.add(undefined(false));
  }
  return services;
}
