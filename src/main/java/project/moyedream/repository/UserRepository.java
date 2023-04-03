package project.moyedream.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.moyedream.domain.user.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
}
