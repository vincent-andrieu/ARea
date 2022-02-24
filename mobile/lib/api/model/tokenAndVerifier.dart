class tokenAndVerifier {
  String oauth_token;
  String oauth_verifier;

  tokenAndVerifier(this.oauth_token, this.oauth_verifier);

  tokenAndVerifier.fromJson(dynamic json) :
        oauth_token = json['oauth_token'],
        oauth_verifier = json['oauth_verifier'];

  Map<String, dynamic> toJson() {
    return {
      'oauth_token': oauth_token,
      'oauth_verifier': oauth_verifier,
    };
  }
}
