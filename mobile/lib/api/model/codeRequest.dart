class codeRequest {
  String code;

  codeRequest(this.code);

  codeRequest.fromJson(dynamic json) : code = json['code'];

  Map<String, dynamic> toJson() {
    return {'code': code};
  }
}
