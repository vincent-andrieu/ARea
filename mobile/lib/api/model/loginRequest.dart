class loginRequest {
  String username = "";
  String password = "";

  loginRequest(String user, String pass) {
    username = user;
    password = pass;
  }

  loginRequest.fromJson(Map<String, dynamic> json)
      : username = json['username'],
        password = json['password'];

  Map<String, dynamic> toJson() {
    return {
      'username': username,
      'password': password
    };
  }
}