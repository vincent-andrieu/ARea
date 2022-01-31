class registerResponse {
  String _id = "";
  List<String> areas = []; // TODO REPLACE STRING BY AREA TYPE
  String username = "";
  String password = "";
  int oauthLoginProvider = 0;
  String oauthLoginProviderId = "";
  String token = "";

  registerResponse.fromJson(dynamic json)
      : _id = json['_id'],
        areas = List.from(json['areas']),
        username = json['username'],
        password = json['password'],
        oauthLoginProvider = json['oauthLoginProvider'],
        oauthLoginProviderId = json['oauthLoginProviderId'],
        token = json['token'];

  Map<String, dynamic> toJson() {
    return {
      '_id': _id,
      'areas': areas,
      'username': username,
      'password': password,
      'oauthLoginProvider': oauthLoginProvider,
      'oauthLoginProviderId': oauthLoginProviderId,
      'token': token
    };
  }
}