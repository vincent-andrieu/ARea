class loginResponse {
  String areas = "";
  String _id = "";
  String username = "";
  String password = "";
  int __v = 0;
  String token = "";
  String id = "";

  loginResponse.fromJson(dynamic json)
      : areas = json['areas'],
        _id = json['_id'],
        username = json['username'],
        password = json['password'],
        __v = json['__v'],
        token = json['token'],
        id = json['id'];

  Map<String, dynamic> toJson() {
    return {
      'areas': areas,
      '_id': _id,
      'username': username,
      'password': password,
      '__v': __v.toString(),
      'token': token,
      'id': id
    };
  }
}