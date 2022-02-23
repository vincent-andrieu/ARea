class parameterFetch {
  String name = "";
  String label = "";
  String type = "";

  parameterFetch();

  parameterFetch.fromJson(dynamic json)
      : name = json['name'],
        label = json['label'],
        type = json['type'];
}
