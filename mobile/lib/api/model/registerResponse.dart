import 'area/Area.dart';
import 'createAreaRequest.dart';

class registerResponse {
  String _id = "";
  List<createAreaRequest> areas = []; // TODO REPLACE STRING BY AREA TYPE
  String username = "";
  String token = "";
  Map<String, bool> oauth = {};

  registerResponse.fromJson(dynamic json)
      : areas = [],
        username = json['username'],
        token = json['token'],
        oauth = Map.from(json['oauth']);

  Map<String, dynamic> toJson() {
    return {
      'areas': areas,
      'username': username,
      'token': token,
      'oauth': oauth
    };
  }
}
