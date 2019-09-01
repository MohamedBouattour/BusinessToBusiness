package cas.web.rest;

import cas.domain.Sector;
import cas.repository.SectorRepository;
import cas.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link cas.domain.Sector}.
 */
@RestController
@RequestMapping("/api")
public class SectorResource {

    private final Logger log = LoggerFactory.getLogger(SectorResource.class);

    private static final String ENTITY_NAME = "sector";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SectorRepository sectorRepository;

    public SectorResource(SectorRepository sectorRepository) {
        this.sectorRepository = sectorRepository;
    }

    /**
     * {@code POST  /sectors} : Create a new sector.
     *
     * @param sector the sector to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sector, or with status {@code 400 (Bad Request)} if the sector has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sectors")
    public ResponseEntity<Sector> createSector(@Valid @RequestBody Sector sector) throws URISyntaxException {
        log.debug("REST request to save Sector : {}", sector);
        if (sector.getId() != null) {
            throw new BadRequestAlertException("A new sector cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sector result = sectorRepository.save(sector);
        return ResponseEntity.created(new URI("/api/sectors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sectors} : Updates an existing sector.
     *
     * @param sector the sector to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sector,
     * or with status {@code 400 (Bad Request)} if the sector is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sector couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sectors")
    public ResponseEntity<Sector> updateSector(@Valid @RequestBody Sector sector) throws URISyntaxException {
        log.debug("REST request to update Sector : {}", sector);
        if (sector.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Sector result = sectorRepository.save(sector);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sector.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sectors} : get all the sectors.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sectors in body.
     */
    @GetMapping("/sectors")
    public List<Sector> getAllSectors() {
        log.debug("REST request to get all Sectors");
        return sectorRepository.findAll();
    }

    /**
     * {@code GET  /sectors/:id} : get the "id" sector.
     *
     * @param id the id of the sector to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sector, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sectors/{id}")
    public ResponseEntity<Sector> getSector(@PathVariable Long id) {
        log.debug("REST request to get Sector : {}", id);
        Optional<Sector> sector = sectorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sector);
    }

    /**
     * {@code DELETE  /sectors/:id} : delete the "id" sector.
     *
     * @param id the id of the sector to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sectors/{id}")
    public ResponseEntity<Void> deleteSector(@PathVariable Long id) {
        log.debug("REST request to delete Sector : {}", id);
        sectorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
