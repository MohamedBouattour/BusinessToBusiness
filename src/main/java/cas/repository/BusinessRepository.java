package cas.repository;

import cas.domain.Business;
import cas.domain.Sector;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Business entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BusinessRepository extends JpaRepository<Business, Long> {
	List<Business>  findBySubsector_Sector_id(Long id);
}
