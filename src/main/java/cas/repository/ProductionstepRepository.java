package cas.repository;

import cas.domain.Productionstep;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Productionstep entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductionstepRepository extends JpaRepository<Productionstep, Long> {

}
