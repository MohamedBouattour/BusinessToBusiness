package cas.web.rest;

import cas.Casb2BApp;
import cas.domain.Business;
import cas.repository.BusinessRepository;
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
 * Integration tests for the {@link BusinessResource} REST controller.
 */
@SpringBootTest(classes = Casb2BApp.class)
public class BusinessResourceIT {

    private static final String DEFAULT_RAISON_SOCIALE = "AAAAAAAAAA";
    private static final String UPDATED_RAISON_SOCIALE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_MATRICULE_FISCALE = "AAAAAAAAAA";
    private static final String UPDATED_MATRICULE_FISCALE = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_SITEWEB = "AAAAAAAAAA";
    private static final String UPDATED_SITEWEB = "BBBBBBBBBB";

    private static final Long DEFAULT_CP = 1L;
    private static final Long UPDATED_CP = 2L;
    private static final Long SMALLER_CP = 1L - 1L;

    private static final Long DEFAULT_TELECOM = 1L;
    private static final Long UPDATED_TELECOM = 2L;
    private static final Long SMALLER_TELECOM = 1L - 1L;

    private static final Long DEFAULT_OOREDOO = 1L;
    private static final Long UPDATED_OOREDOO = 2L;
    private static final Long SMALLER_OOREDOO = 1L - 1L;

    private static final Long DEFAULT_ORANGE = 1L;
    private static final Long UPDATED_ORANGE = 2L;
    private static final Long SMALLER_ORANGE = 1L - 1L;

    private static final Long DEFAULT_FIXE = 1L;
    private static final Long UPDATED_FIXE = 2L;
    private static final Long SMALLER_FIXE = 1L - 1L;

    private static final Long DEFAULT_FIXE_2 = 1L;
    private static final Long UPDATED_FIXE_2 = 2L;
    private static final Long SMALLER_FIXE_2 = 1L - 1L;

    private static final Long DEFAULT_FAX = 1L;
    private static final Long UPDATED_FAX = 2L;
    private static final Long SMALLER_FAX = 1L - 1L;

    private static final Integer DEFAULT_MOTIVATION = 1;
    private static final Integer UPDATED_MOTIVATION = 2;
    private static final Integer SMALLER_MOTIVATION = 1 - 1;

    private static final Boolean DEFAULT_IS_LOCAL = false;
    private static final Boolean UPDATED_IS_LOCAL = true;

    @Autowired
    private BusinessRepository businessRepository;

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

    private MockMvc restBusinessMockMvc;

    private Business business;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BusinessResource businessResource = new BusinessResource(businessRepository);
        this.restBusinessMockMvc = MockMvcBuilders.standaloneSetup(businessResource)
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
    public static Business createEntity(EntityManager em) {
        Business business = new Business()
            .raisonSociale(DEFAULT_RAISON_SOCIALE)
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .matriculeFiscale(DEFAULT_MATRICULE_FISCALE)
            .adresse(DEFAULT_ADRESSE)
            .email(DEFAULT_EMAIL)
            .siteweb(DEFAULT_SITEWEB)
            .cp(DEFAULT_CP)
            .telecom(DEFAULT_TELECOM)
            .ooredoo(DEFAULT_OOREDOO)
            .orange(DEFAULT_ORANGE)
            .fixe(DEFAULT_FIXE)
            .fixe2(DEFAULT_FIXE_2)
            .fax(DEFAULT_FAX)
            .motivation(DEFAULT_MOTIVATION)
            .isLocal(DEFAULT_IS_LOCAL);
        return business;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Business createUpdatedEntity(EntityManager em) {
        Business business = new Business()
            .raisonSociale(UPDATED_RAISON_SOCIALE)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .matriculeFiscale(UPDATED_MATRICULE_FISCALE)
            .adresse(UPDATED_ADRESSE)
            .email(UPDATED_EMAIL)
            .siteweb(UPDATED_SITEWEB)
            .cp(UPDATED_CP)
            .telecom(UPDATED_TELECOM)
            .ooredoo(UPDATED_OOREDOO)
            .orange(UPDATED_ORANGE)
            .fixe(UPDATED_FIXE)
            .fixe2(UPDATED_FIXE_2)
            .fax(UPDATED_FAX)
            .motivation(UPDATED_MOTIVATION)
            .isLocal(UPDATED_IS_LOCAL);
        return business;
    }

    @BeforeEach
    public void initTest() {
        business = createEntity(em);
    }

    @Test
    @Transactional
    public void createBusiness() throws Exception {
        int databaseSizeBeforeCreate = businessRepository.findAll().size();

        // Create the Business
        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(business)))
            .andExpect(status().isCreated());

        // Validate the Business in the database
        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeCreate + 1);
        Business testBusiness = businessList.get(businessList.size() - 1);
        assertThat(testBusiness.getRaisonSociale()).isEqualTo(DEFAULT_RAISON_SOCIALE);
        assertThat(testBusiness.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testBusiness.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testBusiness.getMatriculeFiscale()).isEqualTo(DEFAULT_MATRICULE_FISCALE);
        assertThat(testBusiness.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testBusiness.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testBusiness.getSiteweb()).isEqualTo(DEFAULT_SITEWEB);
        assertThat(testBusiness.getCp()).isEqualTo(DEFAULT_CP);
        assertThat(testBusiness.getTelecom()).isEqualTo(DEFAULT_TELECOM);
        assertThat(testBusiness.getOoredoo()).isEqualTo(DEFAULT_OOREDOO);
        assertThat(testBusiness.getOrange()).isEqualTo(DEFAULT_ORANGE);
        assertThat(testBusiness.getFixe()).isEqualTo(DEFAULT_FIXE);
        assertThat(testBusiness.getFixe2()).isEqualTo(DEFAULT_FIXE_2);
        assertThat(testBusiness.getFax()).isEqualTo(DEFAULT_FAX);
        assertThat(testBusiness.getMotivation()).isEqualTo(DEFAULT_MOTIVATION);
        assertThat(testBusiness.isIsLocal()).isEqualTo(DEFAULT_IS_LOCAL);
    }

    @Test
    @Transactional
    public void createBusinessWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = businessRepository.findAll().size();

        // Create the Business with an existing ID
        business.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(business)))
            .andExpect(status().isBadRequest());

        // Validate the Business in the database
        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkRaisonSocialeIsRequired() throws Exception {
        int databaseSizeBeforeTest = businessRepository.findAll().size();
        // set the field null
        business.setRaisonSociale(null);

        // Create the Business, which fails.

        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(business)))
            .andExpect(status().isBadRequest());

        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = businessRepository.findAll().size();
        // set the field null
        business.setNom(null);

        // Create the Business, which fails.

        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(business)))
            .andExpect(status().isBadRequest());

        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrenomIsRequired() throws Exception {
        int databaseSizeBeforeTest = businessRepository.findAll().size();
        // set the field null
        business.setPrenom(null);

        // Create the Business, which fails.

        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(business)))
            .andExpect(status().isBadRequest());

        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMatriculeFiscaleIsRequired() throws Exception {
        int databaseSizeBeforeTest = businessRepository.findAll().size();
        // set the field null
        business.setMatriculeFiscale(null);

        // Create the Business, which fails.

        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(business)))
            .andExpect(status().isBadRequest());

        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAdresseIsRequired() throws Exception {
        int databaseSizeBeforeTest = businessRepository.findAll().size();
        // set the field null
        business.setAdresse(null);

        // Create the Business, which fails.

        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(business)))
            .andExpect(status().isBadRequest());

        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = businessRepository.findAll().size();
        // set the field null
        business.setEmail(null);

        // Create the Business, which fails.

        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(business)))
            .andExpect(status().isBadRequest());

        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSitewebIsRequired() throws Exception {
        int databaseSizeBeforeTest = businessRepository.findAll().size();
        // set the field null
        business.setSiteweb(null);

        // Create the Business, which fails.

        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(business)))
            .andExpect(status().isBadRequest());

        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCpIsRequired() throws Exception {
        int databaseSizeBeforeTest = businessRepository.findAll().size();
        // set the field null
        business.setCp(null);

        // Create the Business, which fails.

        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(business)))
            .andExpect(status().isBadRequest());

        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsLocalIsRequired() throws Exception {
        int databaseSizeBeforeTest = businessRepository.findAll().size();
        // set the field null
        business.setIsLocal(null);

        // Create the Business, which fails.

        restBusinessMockMvc.perform(post("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(business)))
            .andExpect(status().isBadRequest());

        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBusinesses() throws Exception {
        // Initialize the database
        businessRepository.saveAndFlush(business);

        // Get all the businessList
        restBusinessMockMvc.perform(get("/api/businesses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(business.getId().intValue())))
            .andExpect(jsonPath("$.[*].raisonSociale").value(hasItem(DEFAULT_RAISON_SOCIALE.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].matriculeFiscale").value(hasItem(DEFAULT_MATRICULE_FISCALE.toString())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].siteweb").value(hasItem(DEFAULT_SITEWEB.toString())))
            .andExpect(jsonPath("$.[*].cp").value(hasItem(DEFAULT_CP.intValue())))
            .andExpect(jsonPath("$.[*].telecom").value(hasItem(DEFAULT_TELECOM.intValue())))
            .andExpect(jsonPath("$.[*].ooredoo").value(hasItem(DEFAULT_OOREDOO.intValue())))
            .andExpect(jsonPath("$.[*].orange").value(hasItem(DEFAULT_ORANGE.intValue())))
            .andExpect(jsonPath("$.[*].fixe").value(hasItem(DEFAULT_FIXE.intValue())))
            .andExpect(jsonPath("$.[*].fixe2").value(hasItem(DEFAULT_FIXE_2.intValue())))
            .andExpect(jsonPath("$.[*].fax").value(hasItem(DEFAULT_FAX.intValue())))
            .andExpect(jsonPath("$.[*].motivation").value(hasItem(DEFAULT_MOTIVATION)))
            .andExpect(jsonPath("$.[*].isLocal").value(hasItem(DEFAULT_IS_LOCAL.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getBusiness() throws Exception {
        // Initialize the database
        businessRepository.saveAndFlush(business);

        // Get the business
        restBusinessMockMvc.perform(get("/api/businesses/{id}", business.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(business.getId().intValue()))
            .andExpect(jsonPath("$.raisonSociale").value(DEFAULT_RAISON_SOCIALE.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.matriculeFiscale").value(DEFAULT_MATRICULE_FISCALE.toString()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.siteweb").value(DEFAULT_SITEWEB.toString()))
            .andExpect(jsonPath("$.cp").value(DEFAULT_CP.intValue()))
            .andExpect(jsonPath("$.telecom").value(DEFAULT_TELECOM.intValue()))
            .andExpect(jsonPath("$.ooredoo").value(DEFAULT_OOREDOO.intValue()))
            .andExpect(jsonPath("$.orange").value(DEFAULT_ORANGE.intValue()))
            .andExpect(jsonPath("$.fixe").value(DEFAULT_FIXE.intValue()))
            .andExpect(jsonPath("$.fixe2").value(DEFAULT_FIXE_2.intValue()))
            .andExpect(jsonPath("$.fax").value(DEFAULT_FAX.intValue()))
            .andExpect(jsonPath("$.motivation").value(DEFAULT_MOTIVATION))
            .andExpect(jsonPath("$.isLocal").value(DEFAULT_IS_LOCAL.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBusiness() throws Exception {
        // Get the business
        restBusinessMockMvc.perform(get("/api/businesses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBusiness() throws Exception {
        // Initialize the database
        businessRepository.saveAndFlush(business);

        int databaseSizeBeforeUpdate = businessRepository.findAll().size();

        // Update the business
        Business updatedBusiness = businessRepository.findById(business.getId()).get();
        // Disconnect from session so that the updates on updatedBusiness are not directly saved in db
        em.detach(updatedBusiness);
        updatedBusiness
            .raisonSociale(UPDATED_RAISON_SOCIALE)
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .matriculeFiscale(UPDATED_MATRICULE_FISCALE)
            .adresse(UPDATED_ADRESSE)
            .email(UPDATED_EMAIL)
            .siteweb(UPDATED_SITEWEB)
            .cp(UPDATED_CP)
            .telecom(UPDATED_TELECOM)
            .ooredoo(UPDATED_OOREDOO)
            .orange(UPDATED_ORANGE)
            .fixe(UPDATED_FIXE)
            .fixe2(UPDATED_FIXE_2)
            .fax(UPDATED_FAX)
            .motivation(UPDATED_MOTIVATION)
            .isLocal(UPDATED_IS_LOCAL);

        restBusinessMockMvc.perform(put("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBusiness)))
            .andExpect(status().isOk());

        // Validate the Business in the database
        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeUpdate);
        Business testBusiness = businessList.get(businessList.size() - 1);
        assertThat(testBusiness.getRaisonSociale()).isEqualTo(UPDATED_RAISON_SOCIALE);
        assertThat(testBusiness.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testBusiness.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testBusiness.getMatriculeFiscale()).isEqualTo(UPDATED_MATRICULE_FISCALE);
        assertThat(testBusiness.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testBusiness.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testBusiness.getSiteweb()).isEqualTo(UPDATED_SITEWEB);
        assertThat(testBusiness.getCp()).isEqualTo(UPDATED_CP);
        assertThat(testBusiness.getTelecom()).isEqualTo(UPDATED_TELECOM);
        assertThat(testBusiness.getOoredoo()).isEqualTo(UPDATED_OOREDOO);
        assertThat(testBusiness.getOrange()).isEqualTo(UPDATED_ORANGE);
        assertThat(testBusiness.getFixe()).isEqualTo(UPDATED_FIXE);
        assertThat(testBusiness.getFixe2()).isEqualTo(UPDATED_FIXE_2);
        assertThat(testBusiness.getFax()).isEqualTo(UPDATED_FAX);
        assertThat(testBusiness.getMotivation()).isEqualTo(UPDATED_MOTIVATION);
        assertThat(testBusiness.isIsLocal()).isEqualTo(UPDATED_IS_LOCAL);
    }

    @Test
    @Transactional
    public void updateNonExistingBusiness() throws Exception {
        int databaseSizeBeforeUpdate = businessRepository.findAll().size();

        // Create the Business

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBusinessMockMvc.perform(put("/api/businesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(business)))
            .andExpect(status().isBadRequest());

        // Validate the Business in the database
        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBusiness() throws Exception {
        // Initialize the database
        businessRepository.saveAndFlush(business);

        int databaseSizeBeforeDelete = businessRepository.findAll().size();

        // Delete the business
        restBusinessMockMvc.perform(delete("/api/businesses/{id}", business.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Business> businessList = businessRepository.findAll();
        assertThat(businessList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Business.class);
        Business business1 = new Business();
        business1.setId(1L);
        Business business2 = new Business();
        business2.setId(business1.getId());
        assertThat(business1).isEqualTo(business2);
        business2.setId(2L);
        assertThat(business1).isNotEqualTo(business2);
        business1.setId(null);
        assertThat(business1).isNotEqualTo(business2);
    }
}
