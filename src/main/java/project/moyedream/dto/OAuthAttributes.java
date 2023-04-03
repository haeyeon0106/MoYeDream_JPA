package project.moyedream.dto;

import lombok.Builder;
import lombok.Getter;
import project.moyedream.domain.user.Role;
import project.moyedream.domain.user.User;

import java.util.Map;

@Getter
public class OAuthAttributes {
    private final Map<String, Object> attributes;
    private final String attributeKey;
    private final String email;
    private final String name;
    private final String picture;

    @Builder
    public OAuthAttributes(Map<String,Object> attributes, String attributeKey, String email, String name, String picture){
        this.attributes = attributes;
        this.attributeKey = attributeKey;
        this.email = email;
        this.name = name;
        this.picture = picture;
    }
    public static OAuthAttributes of(String attributeKey,Map<String,Object> attributes){
        return ofKakao("email",attributes);
    }

    private static OAuthAttributes ofKakao(String attributeKey, Map<String, Object> attributes) {
        Map<String,Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String,Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

        return OAuthAttributes.builder()
                .name((String) kakaoProfile.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .picture((String) kakaoProfile.get("thumbnail_image_url"))
                .attributes(kakaoAccount)
                .attributeKey(attributeKey)
                .build();
    }

    public User toEntity(){
        return User.builder()
                .name(name)
                .email(email)
                .picture(picture)
                .role(Role.USER)
                .build();
    }
}
