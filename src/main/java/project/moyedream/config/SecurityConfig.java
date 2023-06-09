package project.moyedream.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import project.moyedream.service.CustomOAuth2UserService;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.httpBasic().disable()
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                .formLogin().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/","/css/**","/img/**","/js/**","/h2-console/**").permitAll()
                .anyRequest().authenticated()   // 나머지 URL들은 모두 인증된 사용자(로그인한 사용자)에게만 허용
                .and()
                .logout().logoutSuccessUrl("/")
                .and()
                .oauth2Login()
//                .successHandler(oAuth2SuccessHandler)     // 인증 프로세스에 따라 사용자 정의 로직 실행
                .userInfoEndpoint()        //OAuth 2 로그인 성공 이후 사용자 정보를 가져올 때의 설정등을 담당
                .userService(customOAuth2UserService);  // 로그인이 성공하면 해당 유저의 정보를 갖고 customOAuth2UserService에서 후처리를 함

        return http.build();
    }
}
