import 'area/Area.dart';

class registerResponse {
  String _id = "";
  List<Area> areas = []; // TODO REPLACE STRING BY AREA TYPE
  String username = "";
  int oauthLoginProvider = 0;
  String? oauthLoginProviderId = "";
  String token = "";
  Map<String, bool> oauth = {};

  registerResponse.fromJson(dynamic json)
      : areas = List.from(json['areas']),
        username = json['username'],
        oauthLoginProvider = json['oauthLoginProvider'],
        oauthLoginProviderId = json['oauthLoginProviderId'],
        token = json['token'],
        oauth = Map.from(json['oauth']);

  Map<String, dynamic> toJson() {
    return {
      'areas': areas,
      'username': username,
      'oauthLoginProvider': oauthLoginProvider,
      'oauthLoginProviderId': oauthLoginProviderId,
      'token': token,
      'oauth': oauth
    };
  }
}