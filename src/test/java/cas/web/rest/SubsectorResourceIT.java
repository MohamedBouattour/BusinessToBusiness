package cas.web.rest;

import cas.Casb2BApp;
import cas.domain.Subsector;
import cas.repository.SubsectorRepository;
import cas.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static cas.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SubsectorResource} REST controller.
 */
@SpringBootTest(classes = Casb2BApp.class)
public class SubsectorResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SubsectorRepository subsectorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSubsectorMockMvc;

    private Subsector subsector;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubsectorResource subsectorResource = new SubsectorResource(subsectorRepository);
        this.restSubsectorMockMvc = MockMvcBuilders.standaloneSetup(subsectorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subsector createEntity(EntityManager em) {
        Subsector subsector = new Subsector()
            .name(DEFAULT_NAME);
        return subsector;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subsector createUpdatedEntity(EntityManager em) {
        Subsector subsector = new Subsector()
            .name(UPDATED_NAME);
        return subsector;
    }

    @BeforeEach
    public void initTest() {
        subsector = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubsector() throws Exception {
        int databaseSizeBeforeCreate = subsectorRepository.findAll().size();

        // Create the Subsector
        restSubsectorMockMvc.perform(post("/api/subsectors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subsector)))
            .andExpect(status().isCreated());

        // Validate the Subsector in the database
        List<Subsector> subsectorList = subsectorRepository.findAll();
        assertThat(subsectorList).hasSize(databaseSizeBeforeCreate + 1);
        Subsector testSubsector = subsectorList.get(subsectorList.size() - 1);
        assertThat(testSubsector.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSubsectorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subsectorRepository.findAll().size();

        // Create the Subsector with an existing ID
        subsector.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubsectorMockMvc.perform(post("/api/subsectors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subsector)))
            .andExpect(status().isBadRequest());

        // Validate the Subsector in the database
        List<Subsector> subsectorList = subsectorRepository.findAll();
        assertThat(subsectorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = subsectorRepository.findAll().size();
        // set the field null
        subsector.setName(null);

        // Create the Subsector, which fails.

        restSubsectorMockMvc.perform(post("/api/subsectors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subsector)))
            .andExpect(status().isBadRequest());

        List<Subsector> subsectorList = subsectorRepository.findAll();
        assertThat(subsectorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubsectors() throws Exception {
        // Initialize the database
        subsectorRepository.saveAndFlush(subsector);

        // Get all the subsectorList
        restSubsectorMockMvc.perform(get("/api/subsectors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subsector.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getSubsector() throws Exception {
        // Initialize the database
        subsectorRepository.saveAndFlush(subsector);

        // Get the subsector
        restSubsectorMockMvc.perform(get("/api/subsectors/{id}", subsector.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subsector.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSubsector() throws Exception {
        // Get the subsector
        restSubsectorMockMvc.perform(get("/api/subsectors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubsector() throws Exception {
        // Initialize the database
        subsectorRepository.saveAndFlush(subsector);

        int databaseSizeBeforeUpdate = subsectorRepository.findAll().size();

        // Update the subsector
        Subsector updatedSubsector = subsectorRepository.findById(subsector.getId()).get();
        // Disconnect from session so that the updates on updatedSubsector are not directly saved in db
        em.detach(updatedSubsector);
        updatedSubsector
            .name(UPDATED_NAME);

        restSubsectorMockMvc.perform(put("/api/subsectors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubsector)))
            .andExpect(status().isOk());

        // Validate the Subsector in the database
        List<Subsector> subsectorList = subsectorRepository.findAll();
        assertThat(subsectorList).hasSize(databaseSizeBeforeUpdate);
        Subsector testSubsector = subsectorList.get(subsectorList.size() - 1);
        assertThat(testSubsector.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingSubsector() throws Exception {
        int databaseSizeBeforeUpdate = subsectorRepository.findAll().size();

        // Create the Subsector

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubsectorMockMvc.perform(put("/api/subsectors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subsector)))
            .andExpect(status().isBadRequest());

        // Validate the Subsector in the database
        List<Subsector> subsectorList = subsectorRepository.findAll();
        assertThat(subsectorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubsector() throws Exception {
        // Initialize the database
        subsectorRepository.saveAndFlush(subsector);

        int databaseSizeBeforeDelete = subsectorRepository.findAll().size();

        // Delete the subsector
        restSubsectorMockMvc.perform(delete("/api/subsectors/{id}", subsector.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Subsector> subsectorList = subsectorRepository.findAll();
        assertThat(subsectorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Subsector.class);
        Subsector subsector1 = new Subsector();
        subsector1.setId(1L);
        Subsector subsector2 = new Subsector();
        subsector2.setId(subsector1.getId());
        assertThat(subsector1).isEqualTo(subsector2);
        subsector2.setId(2L);
        assertThat(subsector1).isNotEqualTo(subsector2);
        subsector1.setId(null);
        assertThat(subsector1).isNotEqualTo(subsector2);
    }
}
