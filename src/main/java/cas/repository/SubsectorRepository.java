package cas.repository;

import cas.domain.Subsector;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Subsector entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubsectorRepository extends JpaRepository<Subsector, Long> {

}
