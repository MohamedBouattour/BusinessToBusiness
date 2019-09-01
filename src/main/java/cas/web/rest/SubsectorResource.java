package cas.web.rest;

import cas.domain.Subsector;
import cas.repository.SubsectorRepository;
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
 * REST controller for managing {@link cas.domain.Subsector}.
 */
@RestController
@RequestMapping("/api")
public class SubsectorResource {

    private final Logger log = LoggerFactory.getLogger(SubsectorResource.class);

    private static final String ENTITY_NAME = "subsector";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubsectorRepository subsectorRepository;

    public SubsectorResource(SubsectorRepository subsectorRepository) {
        this.subsectorRepository = subsectorRepository;
    }

    /**
     * {@code POST  /subsectors} : Create a new subsector.
     *
     * @param subsector the subsector to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subsector, or with status {@code 400 (Bad Request)} if the subsector has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subsectors")
    public ResponseEntity<Subsector> createSubsector(@Valid @RequestBody Subsector subsector) throws URISyntaxException {
        log.debug("REST request to save Subsector : {}", subsector);
        if (subsector.getId() != null) {
            throw new BadRequestAlertException("A new subsector cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Subsector result = subsectorRepository.save(subsector);
        return ResponseEntity.created(new URI("/api/subsectors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /subsectors} : Updates an existing subsector.
     *
     * @param subsector the subsector to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subsector,
     * or with status {@code 400 (Bad Request)} if the subsector is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subsector couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subsectors")
    public ResponseEntity<Subsector> updateSubsector(@Valid @RequestBody Subsector subsector) throws URISyntaxException {
        log.debug("REST request to update Subsector : {}", subsector);
        if (subsector.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Subsector result = subsectorRepository.save(subsector);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subsector.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /subsectors} : get all the subsectors.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subsectors in body.
     */
    @GetMapping("/subsectors")
    public List<Subsector> getAllSubsectors() {
        log.debug("REST request to get all Subsectors");
        return subsectorRepository.findAll();
    }

    /**
     * {@code GET  /subsectors/:id} : get the "id" subsector.
     *
     * @param id the id of the subsector to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subsector, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subsectors/{id}")
    public ResponseEntity<Subsector> getSubsector(@PathVariable Long id) {
        log.debug("REST request to get Subsector : {}", id);
        Optional<Subsector> subsector = subsectorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(subsector);
    }

    /**
     * {@code DELETE  /subsectors/:id} : delete the "id" subsector.
     *
     * @param id the id of the subsector to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subsectors/{id}")
    public ResponseEntity<Void> deleteSubsector(@PathVariable Long id) {
        log.debug("REST request to delete Subsector : {}", id);
        subsectorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
