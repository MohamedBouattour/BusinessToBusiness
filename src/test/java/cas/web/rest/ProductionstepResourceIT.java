package cas.web.rest;

import cas.Casb2BApp;
import cas.domain.Productionstep;
import cas.repository.ProductionstepRepository;
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
 * Integration tests for the {@link ProductionstepResource} REST controller.
 */
@SpringBootTest(classes = Casb2BApp.class)
public class ProductionstepResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ProductionstepRepository productionstepRepository;

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

    private MockMvc restProductionstepMockMvc;

    private Productionstep productionstep;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductionstepResource productionstepResource = new ProductionstepResource(productionstepRepository);
        this.restProductionstepMockMvc = MockMvcBuilders.standaloneSetup(productionstepResource)
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
    public static Productionstep createEntity(EntityManager em) {
        Productionstep productionstep = new Productionstep()
            .name(DEFAULT_NAME);
        return productionstep;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Productionstep createUpdatedEntity(EntityManager em) {
        Productionstep productionstep = new Productionstep()
            .name(UPDATED_NAME);
        return productionstep;
    }

    @BeforeEach
    public void initTest() {
        productionstep = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductionstep() throws Exception {
        int databaseSizeBeforeCreate = productionstepRepository.findAll().size();

        // Create the Productionstep
        restProductionstepMockMvc.perform(post("/api/productionsteps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionstep)))
            .andExpect(status().isCreated());

        // Validate the Productionstep in the database
        List<Productionstep> productionstepList = productionstepRepository.findAll();
        assertThat(productionstepList).hasSize(databaseSizeBeforeCreate + 1);
        Productionstep testProductionstep = productionstepList.get(productionstepList.size() - 1);
        assertThat(testProductionstep.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createProductionstepWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productionstepRepository.findAll().size();

        // Create the Productionstep with an existing ID
        productionstep.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductionstepMockMvc.perform(post("/api/productionsteps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionstep)))
            .andExpect(status().isBadRequest());

        // Validate the Productionstep in the database
        List<Productionstep> productionstepList = productionstepRepository.findAll();
        assertThat(productionstepList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = productionstepRepository.findAll().size();
        // set the field null
        productionstep.setName(null);

        // Create the Productionstep, which fails.

        restProductionstepMockMvc.perform(post("/api/productionsteps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionstep)))
            .andExpect(status().isBadRequest());

        List<Productionstep> productionstepList = productionstepRepository.findAll();
        assertThat(productionstepList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProductionsteps() throws Exception {
        // Initialize the database
        productionstepRepository.saveAndFlush(productionstep);

        // Get all the productionstepList
        restProductionstepMockMvc.perform(get("/api/productionsteps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productionstep.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getProductionstep() throws Exception {
        // Initialize the database
        productionstepRepository.saveAndFlush(productionstep);

        // Get the productionstep
        restProductionstepMockMvc.perform(get("/api/productionsteps/{id}", productionstep.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productionstep.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProductionstep() throws Exception {
        // Get the productionstep
        restProductionstepMockMvc.perform(get("/api/productionsteps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductionstep() throws Exception {
        // Initialize the database
        productionstepRepository.saveAndFlush(productionstep);

        int databaseSizeBeforeUpdate = productionstepRepository.findAll().size();

        // Update the productionstep
        Productionstep updatedProductionstep = productionstepRepository.findById(productionstep.getId()).get();
        // Disconnect from session so that the updates on updatedProductionstep are not directly saved in db
        em.detach(updatedProductionstep);
        updatedProductionstep
            .name(UPDATED_NAME);

        restProductionstepMockMvc.perform(put("/api/productionsteps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductionstep)))
            .andExpect(status().isOk());

        // Validate the Productionstep in the database
        List<Productionstep> productionstepList = productionstepRepository.findAll();
        assertThat(productionstepList).hasSize(databaseSizeBeforeUpdate);
        Productionstep testProductionstep = productionstepList.get(productionstepList.size() - 1);
        assertThat(testProductionstep.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingProductionstep() throws Exception {
        int databaseSizeBeforeUpdate = productionstepRepository.findAll().size();

        // Create the Productionstep

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductionstepMockMvc.perform(put("/api/productionsteps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productionstep)))
            .andExpect(status().isBadRequest());

        // Validate the Productionstep in the database
        List<Productionstep> productionstepList = productionstepRepository.findAll();
        assertThat(productionstepList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductionstep() throws Exception {
        // Initialize the database
        productionstepRepository.saveAndFlush(productionstep);

        int databaseSizeBeforeDelete = productionstepRepository.findAll().size();

        // Delete the productionstep
        restProductionstepMockMvc.perform(delete("/api/productionsteps/{id}", productionstep.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Productionstep> productionstepList = productionstepRepository.findAll();
        assertThat(productionstepList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Productionstep.class);
        Productionstep productionstep1 = new Productionstep();
        productionstep1.setId(1L);
        Productionstep productionstep2 = new Productionstep();
        productionstep2.setId(productionstep1.getId());
        assertThat(productionstep1).isEqualTo(productionstep2);
        productionstep2.setId(2L);
        assertThat(productionstep1).isNotEqualTo(productionstep2);
        productionstep1.setId(null);
        assertThat(productionstep1).isNotEqualTo(productionstep2);
    }
}
