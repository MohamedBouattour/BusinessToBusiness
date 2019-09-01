package cas.web.rest;

import cas.domain.Productionstep;
import cas.repository.ProductionstepRepository;
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
 * REST controller for managing {@link cas.domain.Productionstep}.
 */
@RestController
@RequestMapping("/api")
public class ProductionstepResource {

    private final Logger log = LoggerFactory.getLogger(ProductionstepResource.class);

    private static final String ENTITY_NAME = "productionstep";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductionstepRepository productionstepRepository;

    public ProductionstepResource(ProductionstepRepository productionstepRepository) {
        this.productionstepRepository = productionstepRepository;
    }

    /**
     * {@code POST  /productionsteps} : Create a new productionstep.
     *
     * @param productionstep the productionstep to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productionstep, or with status {@code 400 (Bad Request)} if the productionstep has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/productionsteps")
    public ResponseEntity<Productionstep> createProductionstep(@Valid @RequestBody Productionstep productionstep) throws URISyntaxException {
        log.debug("REST request to save Productionstep : {}", productionstep);
        if (productionstep.getId() != null) {
            throw new BadRequestAlertException("A new productionstep cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Productionstep result = productionstepRepository.save(productionstep);
        return ResponseEntity.created(new URI("/api/productionsteps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /productionsteps} : Updates an existing productionstep.
     *
     * @param productionstep the productionstep to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productionstep,
     * or with status {@code 400 (Bad Request)} if the productionstep is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productionstep couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/productionsteps")
    public ResponseEntity<Productionstep> updateProductionstep(@Valid @RequestBody Productionstep productionstep) throws URISyntaxException {
        log.debug("REST request to update Productionstep : {}", productionstep);
        if (productionstep.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Productionstep result = productionstepRepository.save(productionstep);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productionstep.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /productionsteps} : get all the productionsteps.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productionsteps in body.
     */
    @GetMapping("/productionsteps")
    public List<Productionstep> getAllProductionsteps() {
        log.debug("REST request to get all Productionsteps");
        return productionstepRepository.findAll();
    }

    /**
     * {@code GET  /productionsteps/:id} : get the "id" productionstep.
     *
     * @param id the id of the productionstep to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productionstep, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/productionsteps/{id}")
    public ResponseEntity<Productionstep> getProductionstep(@PathVariable Long id) {
        log.debug("REST request to get Productionstep : {}", id);
        Optional<Productionstep> productionstep = productionstepRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productionstep);
    }

    /**
     * {@code DELETE  /productionsteps/:id} : delete the "id" productionstep.
     *
     * @param id the id of the productionstep to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/productionsteps/{id}")
    public ResponseEntity<Void> deleteProductionstep(@PathVariable Long id) {
        log.debug("REST request to delete Productionstep : {}", id);
        productionstepRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
